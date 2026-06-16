package main

import (
	"bufio"
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"mime"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sort"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"
	"unicode/utf8"
)

const (
	maxFileBytes                     = 256 * 1024
	maxOutputBytes                   = 512 * 1024
	maxShellOutputBytes              = 64 * 1024
	defaultTimeoutMs                 = 30000
	maxSearchResults                 = 30
	maxChatMessages                  = 200
	maxChatResponseTextBytes         = 48 * 1024
	maxChatMessageTextBytes          = 4000
	maxChatToolArgsBytes             = 1000
	maxChatToolCallsPerMessage       = 100
	defaultMaxSkillDiscoveryDirs     = 4000
	defaultMaxWorkspaceSearchEntries = 20000
	envMaxSkillDiscoveryDirs         = "PI_WEB_CHAT_MAX_SKILL_DISCOVERY_DIRS"
	envMaxWorkspaceSearchEntries     = "PI_WEB_CHAT_MAX_WORKSPACE_SEARCH_ENTRIES"
)

var skipDirs = map[string]bool{
	".git": true, "node_modules": true, "dist": true, "build": true, "coverage": true,
	".next": true, ".astro": true, ".pi": true, ".pi-web": true,
}

var textExtensions = map[string]bool{
	".astro": true, ".c": true, ".cc": true, ".conf": true, ".cpp": true, ".css": true,
	".csv": true, ".go": true, ".h": true, ".hpp": true, ".html": true, ".java": true,
	".js": true, ".json": true, ".jsx": true, ".kt": true, ".md": true, ".mdx": true,
	".mjs": true, ".py": true, ".rs": true, ".sh": true, ".sql": true, ".svelte": true,
	".toml": true, ".ts": true, ".tsx": true, ".txt": true, ".vue": true, ".xml": true,
	".yaml": true, ".yml": true,
}

type request map[string]any

type commandInfo struct {
	Command     string `json:"command"`
	Description string `json:"description"`
	Scope       string `json:"scope"`
	Source      string `json:"source"`
	Template    string `json:"template"`
}

type fileRef struct {
	Type string `json:"type"`
	Name string `json:"name"`
	Path string `json:"path"`
}

type chatMessage struct {
	ID        string         `json:"id"`
	Role      string         `json:"role"`
	Text      string         `json:"text"`
	CreatedAt int64          `json:"createdAt"`
	Meta      map[string]any `json:"meta,omitempty"`
	ToolCalls []chatToolCall `json:"toolCalls,omitempty"`
}

type chatToolCall struct {
	ID         string         `json:"id"`
	Name       string         `json:"name"`
	Args       map[string]any `json:"args,omitempty"`
	ArgsStatus string         `json:"argsStatus,omitempty"`
	Text       string         `json:"text"`
	Status     string         `json:"status"`
}

type textFile struct {
	Type     string `json:"type"`
	Name     string `json:"name"`
	Path     string `json:"path"`
	MimeType string `json:"mimeType"`
	Content  string `json:"content"`
	Size     int64  `json:"size"`
}

type refError struct {
	Path  string `json:"path"`
	Error string `json:"error"`
}

var (
	skillCommandsOnce sync.Once
	skillCommands     []commandInfo
)

var chatSlashCommands = []commandInfo{
	{
		Command:     "/chat-help",
		Description: "Show pi-web chat plugin commands and trigger help.",
		Scope:       "plugin",
		Source:      "pi-web-chat",
		Template:    "Explain the pi-web chat plugin triggers: ! for shell, / for commands, and @ for file references.",
	},
	{
		Command:     "/chat-context",
		Description: "Ask pi to summarize the selected @ file references before answering.",
		Scope:       "plugin",
		Source:      "pi-web-chat",
		Template:    "Summarize the referenced files first, then answer my request:\n\n",
	},
	{
		Command:     "/chat-review",
		Description: "Review referenced files or recent chat context for risks and fixes.",
		Scope:       "plugin",
		Source:      "pi-web-chat",
		Template:    "Review the referenced files and list concrete risks, fixes, and verification steps:\n\n",
	},
}

func allSlashCommands() []commandInfo {
	out := make([]commandInfo, 0, len(chatSlashCommands)+64)
	seen := map[string]bool{}
	add := func(command commandInfo) {
		if command.Command == "" || seen[command.Command] {
			return
		}
		seen[command.Command] = true
		out = append(out, command)
	}
	for _, command := range chatSlashCommands {
		add(command)
	}
	for _, command := range discoverSkillCommands() {
		add(command)
	}
	sort.SliceStable(out, func(i, j int) bool { return out[i].Command < out[j].Command })
	return out
}

func discoverSkillCommands() []commandInfo {
	skillCommandsOnce.Do(func() {
		skillCommands = loadSkillCommands()
	})
	return append([]commandInfo(nil), skillCommands...)
}

func loadSkillCommands() []commandInfo {
	home, err := os.UserHomeDir()
	if err != nil {
		return nil
	}
	roots := []string{
		filepath.Join(home, ".agents", "skills"),
		filepath.Join(home, ".pi", "agent", "npm", "node_modules"),
	}
	out := []commandInfo{}
	visited := 0
	for _, root := range roots {
		filepath.WalkDir(root, func(path string, d os.DirEntry, err error) error {
			if err != nil || !d.IsDir() {
				return nil
			}
			visited++
			if visited > configuredPositiveInt(envMaxSkillDiscoveryDirs, defaultMaxSkillDiscoveryDirs) {
				return filepath.SkipAll
			}
			if d.Name() == "node_modules" && path != roots[1] {
				return filepath.SkipDir
			}
			skillPath := filepath.Join(path, "SKILL.md")
			if _, err := os.Stat(skillPath); err != nil {
				return nil
			}
			name := filepath.Base(path)
			description := readSkillDescription(skillPath)
			commandName := "/" + name
			if strings.Contains(path, filepath.Join("context-mode", "skills")) {
				commandName = "/context-mode:" + name
			}
			out = append(out, commandInfo{Command: commandName, Description: description, Scope: "pi", Source: "skill", Template: commandName + " "})
			return filepath.SkipDir
		})
	}
	return out
}

func readSkillDescription(path string) string {
	data, err := os.ReadFile(path)
	if err != nil {
		return ""
	}
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, "description:") {
			return strings.Trim(strings.TrimSpace(strings.TrimPrefix(line, "description:")), "\"")
		}
	}
	return ""
}

func main() {
	method := arg(1)
	if method == "__streamRunner" {
		if err := runGoStreamRunner(os.Args[2:]); err != nil {
			fail(err)
		}
		return
	}

	workspaceRoot := arg(2)
	input, err := readInput(os.Stdin)
	if err != nil {
		fail(err)
	}
	input = normalizeBackendInput(input)

	if method == "streamEventsSse" {
		if err := streamPiEventsSse(input, os.Stdout); err != nil {
			fail(err)
		}
		return
	}
	if method == "sessionEventsSse" {
		if err := streamPiSessionEventsSse(workspaceRoot, input, os.Stdout); err != nil {
			fail(err)
		}
		return
	}

	result, err := handle(method, workspaceRoot, input)
	if err != nil {
		fail(err)
	}
	if err := json.NewEncoder(os.Stdout).Encode(result); err != nil {
		fail(err)
	}
}

func arg(index int) string {
	if len(os.Args) <= index {
		return ""
	}
	return os.Args[index]
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, err.Error())
	os.Exit(1)
}

func normalizeBackendInput(input request) request {
	data, ok := input["data"].(map[string]any)
	if !ok {
		return input
	}

	out := request(data)
	if workspaceID, ok := input["workspaceId"].(string); ok && strings.TrimSpace(workspaceID) != "" {
		if _, exists := out["workspaceId"]; !exists {
			out["workspaceId"] = workspaceID
		}
	}
	return out
}

func readInput(reader io.Reader) (request, error) {
	data, err := io.ReadAll(reader)
	if err != nil {
		return nil, err
	}
	if len(bytes.TrimSpace(data)) == 0 {
		return request{}, nil
	}
	var input request
	if err := json.Unmarshal(data, &input); err != nil {
		return nil, err
	}
	return input, nil
}

func handle(method, workspaceRoot string, input request) (any, error) {
	switch method {
	case "commands":
		return map[string]any{"commands": allSlashCommands()}, nil
	case "chatState":
		return readPiChatState(workspaceRoot, input)
	case "submitPrompt":
		return submitPiPrompt(workspaceRoot, input)
	case "startPrompt":
		return startPiPrompt(workspaceRoot, input)
	case "steerPrompt":
		return steerPiPrompt(input)
	case "streamEvents":
		return streamPiEvents(input)
	case "abortPrompt":
		return abortPiPrompt(input)
	case "searchFiles":
		files, truncated, err := searchWorkspaceFiles(workspaceRoot, stringInput(input, "query"), intInput(input, "limit", maxSearchResults))
		return map[string]any{"files": files, "truncated": truncated}, err
	case "readFile":
		file, err := readWorkspaceTextFile(workspaceRoot, stringInput(input, "path"))
		return map[string]any{"file": file}, err
	case "resolveContext":
		return resolvePromptContext(workspaceRoot, input)
	case "runShell":
		return runShellCommand(workspaceRoot, input)
	default:
		return nil, fmt.Errorf("unknown method: %s", method)
	}
}

func stringInput(input request, key string) string {
	value, _ := input[key].(string)
	return value
}

func intInput(input request, key string, fallback int) int {
	switch value := input[key].(type) {
	case float64:
		return int(value)
	case int:
		return value
	case json.Number:
		if n, err := value.Int64(); err == nil {
			return int(n)
		}
	}
	return fallback
}

func configuredPositiveInt(envName string, fallback int) int {
	value := strings.TrimSpace(os.Getenv(envName))
	if value == "" {
		return fallback
	}
	parsed, err := strconv.Atoi(value)
	if err != nil || parsed <= 0 {
		return fallback
	}
	return parsed
}

func resolveRoot(root string) (string, error) {
	if root == "" {
		root = "."
	}
	return filepath.Abs(root)
}

func submitPiPrompt(workspaceRoot string, input request) (any, error) {
	root, err := promptWorkspaceRoot(workspaceRoot, input)
	if err != nil {
		return nil, err
	}
	text := mergePromptAttachments(stringInput(input, "text"), input["attachments"])
	if strings.TrimSpace(text) == "" {
		return nil, errors.New("text is required")
	}
	sessionID := strings.TrimSpace(stringInput(input, "sessionId"))
	sessionFile := ""
	warnings, err := ensureConfiguredSessionDir(root)
	if err != nil {
		return nil, err
	}
	if sessionID != "" {
		if path, ok := piSessionFileByID(root, sessionID); ok {
			sessionFile = path
		} else {
			sessionID = ""
		}
	}
	if sessionFile == "" {
		var createErr error
		sessionID, sessionFile, warnings, createErr = createPiSessionFile(root)
		if createErr != nil {
			return nil, createErr
		}
	}
	if err := runPiRPCPrompt(root, sessionFile, text); err != nil {
		return nil, err
	}
	messages, parsedID, err := readPiSessionMessages(sessionFile)
	if err != nil {
		return nil, err
	}
	if parsedID != "" {
		sessionID = parsedID
	}
	return map[string]any{"accepted": true, "activeSessionId": responseSessionID(sessionID), "messages": messages, "isStreaming": false, "warnings": warnings}, nil
}

type streamRunState struct {
	RunID           string `json:"runId"`
	ActiveSessionID string `json:"activeSessionId"`
	SessionFile     string `json:"sessionFile"`
	EventsPath      string `json:"eventsPath"`
	PromptPath      string `json:"promptPath"`
	SteeringPath    string `json:"steeringPath"`
	SteeringAckPath string `json:"steeringAckPath"`
	Status          string `json:"status"`
	PID             int    `json:"pid"`
	ChildPID        int    `json:"childPid"`
	Cursor          int    `json:"cursor"`
	CreatedAt       int64  `json:"createdAt"`
	UpdatedAt       int64  `json:"updatedAt"`
}

type streamEvent map[string]any

func startPiPrompt(workspaceRoot string, input request) (any, error) {
	root, err := promptWorkspaceRoot(workspaceRoot, input)
	if err != nil {
		return nil, err
	}

	text := mergePromptAttachments(stringInput(input, "text"), input["attachments"])
	if strings.TrimSpace(text) == "" {
		return nil, errors.New("text is required")
	}

	sessionID := strings.TrimSpace(stringInput(input, "sessionId"))
	sessionFile := ""
	warnings, err := ensureConfiguredSessionDir(root)
	if err != nil {
		return nil, err
	}
	if sessionID != "" {
		if path, ok := piSessionFileByID(root, sessionID); ok {
			sessionFile = path
		} else {
			sessionID = ""
		}
	}
	if sessionFile == "" {
		var createErr error
		sessionID, sessionFile, warnings, createErr = createPiSessionFile(root)
		if createErr != nil {
			return nil, createErr
		}
	}

	runID := createSessionID()
	runDir := goStreamRunDir()
	if err := os.MkdirAll(runDir, 0o700); err != nil {
		return nil, err
	}

	statePath := goStreamStatePath(runID)
	eventsPath := filepath.Join(runDir, runID+".events.jsonl")
	promptPath := filepath.Join(runDir, runID+".prompt.txt")
	steeringPath := filepath.Join(runDir, runID+".steering.jsonl")
	steeringAckPath := filepath.Join(runDir, runID+".steering-ack.jsonl")
	if err := os.WriteFile(promptPath, []byte(text), 0o600); err != nil {
		return nil, err
	}
	if err := os.WriteFile(eventsPath, nil, 0o600); err != nil {
		return nil, err
	}
	if err := os.WriteFile(steeringPath, nil, 0o600); err != nil {
		return nil, err
	}
	if err := os.WriteFile(steeringAckPath, nil, 0o600); err != nil {
		return nil, err
	}

	state := streamRunState{
		RunID:           runID,
		ActiveSessionID: sessionID,
		SessionFile:     sessionFile,
		EventsPath:      eventsPath,
		PromptPath:      promptPath,
		SteeringPath:    steeringPath,
		SteeringAckPath: steeringAckPath,
		Status:          "starting",
		CreatedAt:       time.Now().UnixMilli(),
		UpdatedAt:       time.Now().UnixMilli(),
	}
	if err := writeGoStreamState(statePath, state); err != nil {
		return nil, err
	}

	executable, err := os.Executable()
	if err != nil {
		return nil, err
	}
	cmd := exec.Command(executable, "__streamRunner", runID, root, sessionFile, statePath, eventsPath, promptPath)
	cmd.Dir = root
	if err := cmd.Start(); err != nil {
		return nil, err
	}
	state.PID = cmd.Process.Pid
	state.Status = "running"
	state.UpdatedAt = time.Now().UnixMilli()
	if err := writeGoStreamState(statePath, state); err != nil {
		return nil, err
	}
	_ = cmd.Process.Release()

	return map[string]any{"accepted": true, "runId": runID, "activeSessionId": responseSessionID(sessionID), "isStreaming": true, "warnings": warnings}, nil
}

func steerPiPrompt(input request) (any, error) {
	state, err := readGoStreamState(stringInput(input, "runId"))
	if err != nil {
		return nil, err
	}
	if state.Status != "running" && state.Status != "starting" {
		return nil, errors.New("run is not streaming")
	}
	text := mergePromptAttachments(stringInput(input, "text"), input["attachments"])
	if strings.TrimSpace(text) == "" {
		return nil, errors.New("text is required")
	}
	if state.SteeringPath == "" {
		return nil, errors.New("steering is unavailable for this run")
	}
	steeringID := createSessionID()
	payload, err := json.Marshal(map[string]any{"id": steeringID, "type": "steer", "message": text})
	if err != nil {
		return nil, err
	}
	file, err := os.OpenFile(state.SteeringPath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o600)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	if _, err := file.Write(append(payload, '\n')); err != nil {
		return nil, err
	}
	if !waitForGoSteeringAck(state, steeringID, 750*time.Millisecond) {
		return nil, errors.New("steering was not accepted before the run ended")
	}
	return map[string]any{"accepted": true, "runId": state.RunID, "activeSessionId": responseSessionID(state.ActiveSessionID), "isStreaming": true}, nil
}

func streamPiEvents(input request) (any, error) {
	state, err := readGoStreamState(stringInput(input, "runId"))
	if err != nil {
		return nil, err
	}
	cursor := intInput(input, "cursor", 0)
	events, nextCursor, err := readGoStreamEvents(state.EventsPath, cursor)
	if err != nil {
		return nil, err
	}
	streaming := state.Status == "running" || state.Status == "starting"
	return map[string]any{
		"runId":           state.RunID,
		"activeSessionId": responseSessionID(state.ActiveSessionID),
		"events":          events,
		"cursor":          nextCursor,
		"isStreaming":     streaming,
	}, nil
}

func streamPiEventsSse(input request, writer io.Writer) error {
	cursor := intInput(input, "cursor", 0)
	if _, err := fmt.Fprint(writer, ": pi-web-chat\n\n"); err != nil {
		return err
	}

	for {
		response, err := streamPiEvents(request{"runId": stringInput(input, "runId"), "cursor": cursor})
		if err != nil {
			return err
		}
		payload, ok := response.(map[string]any)
		if !ok {
			return errors.New("invalid stream response")
		}
		cursor = intFromAny(payload["cursor"])
		events, _ := payload["events"].([]streamEvent)

		for _, event := range events {
			data, err := json.Marshal(event)
			if err != nil {
				return err
			}
			if _, err := fmt.Fprintf(writer, "event: %s\ndata: %s\n\n", sseEventName(stringFromAny(event["type"])), data); err != nil {
				return err
			}
		}

		if payload["isStreaming"] != true {
			return nil
		}
		time.Sleep(120 * time.Millisecond)
	}
}

func streamPiSessionEventsSse(workspaceRoot string, input request, writer io.Writer) error {
	if _, err := fmt.Fprint(writer, ": pi-web-chat-session\n\n"); err != nil {
		return err
	}

	previous := ""
	lastHeartbeat := time.Now()
	for {
		state, err := readPiChatState(workspaceRoot, input)
		if err != nil {
			return err
		}
		payload := sessionStatePayload(state)
		data, err := json.Marshal(payload)
		if err != nil {
			return err
		}
		current := string(data)

		if current != previous {
			if _, err := fmt.Fprintf(writer, "event: chat.state\ndata: %s\n\n", data); err != nil {
				return err
			}
			previous = current
			lastHeartbeat = time.Now()
		} else if time.Since(lastHeartbeat) >= 5*time.Second {
			if _, err := fmt.Fprint(writer, ": heartbeat\n\n"); err != nil {
				return err
			}
			lastHeartbeat = time.Now()
		}

		time.Sleep(500 * time.Millisecond)
	}
}

func sessionStatePayload(state any) map[string]any {
	payload := map[string]any{"type": "chat.state"}
	if values, ok := state.(map[string]any); ok {
		for key, value := range values {
			payload[key] = value
		}
	}
	return payload
}

func sseEventName(value string) string {
	if value == "" {
		return "message"
	}
	builder := strings.Builder{}
	for _, r := range value {
		if r == '.' || r == '-' || r == '_' || (r >= '0' && r <= '9') || (r >= 'A' && r <= 'Z') || (r >= 'a' && r <= 'z') {
			builder.WriteRune(r)
			continue
		}
		builder.WriteRune('_')
	}
	return builder.String()
}

func abortPiPrompt(input request) (any, error) {
	state, err := readGoStreamState(stringInput(input, "runId"))
	if err != nil {
		return nil, err
	}
	if state.ChildPID > 0 {
		if process, findErr := os.FindProcess(state.ChildPID); findErr == nil {
			_ = process.Signal(syscall.SIGTERM)
		}
	}

	if state.PID > 0 {
		if process, findErr := os.FindProcess(state.PID); findErr == nil {
			_ = process.Signal(syscall.SIGTERM)
		}
	}
	state.Status = "aborted"
	state.UpdatedAt = time.Now().UnixMilli()
	_ = os.Remove(state.PromptPath)
	_ = os.Remove(state.SteeringPath)
	_ = os.Remove(state.SteeringAckPath)
	if err := writeGoStreamState(goStreamStatePath(state.RunID), state); err != nil {
		return nil, err
	}
	return map[string]any{"aborted": true, "runId": state.RunID}, nil
}

func runGoStreamRunner(args []string) error {
	if len(args) < 6 {
		return errors.New("stream runner arguments are required")
	}
	runID, root, sessionFile, statePath, eventsPath, promptPath := args[0], args[1], args[2], args[3], args[4], args[5]
	state, err := readGoStreamState(runID)
	if err == nil {
		state.Status = "running"
		state.UpdatedAt = time.Now().UnixMilli()
		_ = writeGoStreamState(statePath, state)
	}

	textBytes, err := os.ReadFile(promptPath)
	if err != nil {
		completeGoStreamRunWithError(eventsPath, statePath, err)
		return err
	}
	cmd := exec.Command("pi", "--session", sessionFile, "--mode", "rpc")
	cmd.Dir = root
	stdin, err := cmd.StdinPipe()
	if err != nil {
		completeGoStreamRunWithError(eventsPath, statePath, err)
		return err
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		completeGoStreamRunWithError(eventsPath, statePath, err)
		return err
	}
	if err := cmd.Start(); err != nil {
		completeGoStreamRunWithError(eventsPath, statePath, err)
		return err
	}
	state, err = readGoStreamState(runID)
	if err == nil {
		state.ChildPID = cmd.Process.Pid
		state.Status = "running"
		state.UpdatedAt = time.Now().UnixMilli()
		_ = writeGoStreamState(statePath, state)
	}
	emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "run.start"})
	payload, err := json.Marshal(map[string]any{"type": "prompt", "message": string(textBytes)})
	if err != nil {
		_ = cmd.Process.Kill()
		return err
	}

	inputClosed := false
	inputDone := make(chan struct{})
	var inputMu sync.Mutex
	writeRPCPayload := func(payload []byte) error {
		inputMu.Lock()
		defer inputMu.Unlock()
		if inputClosed {
			return errors.New("rpc input is closed")
		}
		_, err := stdin.Write(append(payload, '\n'))
		return err
	}
	closeRPCInput := func() {
		inputMu.Lock()
		defer inputMu.Unlock()
		if inputClosed {
			return
		}
		inputClosed = true
		close(inputDone)
		_ = stdin.Close()
	}

	if writeErr := writeRPCPayload(payload); writeErr != nil {
		_ = cmd.Process.Kill()
		return writeErr
	}
	go forwardGoSteering(state.SteeringPath, state.SteeringAckPath, inputDone, func(payload []byte) error {
		return writeRPCPayload(payload)
	})

	scanner := bufio.NewScanner(stdout)
	buffer := make([]byte, 0, 64*1024)
	scanner.Buffer(buffer, maxOutputBytes)
	for scanner.Scan() {
		if emitMappedPiRPCLine(eventsPath, statePath, scanner.Bytes()) == "agent_end" {
			closeRPCInput()
		}
	}
	waitErr := cmd.Wait()
	if scanErr := scanner.Err(); scanErr != nil {
		emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "error", "message": scanErr.Error()})
	}
	if waitErr != nil {
		emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "error", "message": waitErr.Error()})
	}
	emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "run.end"})
	_ = os.Remove(promptPath)
	_ = os.Remove(state.SteeringPath)
	_ = os.Remove(state.SteeringAckPath)
	return nil
}

func waitForGoSteeringAck(state streamRunState, steeringID string, timeout time.Duration) bool {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		if goSteeringAcked(state.SteeringAckPath, steeringID) {
			return true
		}
		latest, err := readGoStreamState(state.RunID)
		if err == nil && latest.Status != "running" && latest.Status != "starting" {
			return false
		}
		time.Sleep(25 * time.Millisecond)
	}
	return goSteeringAcked(state.SteeringAckPath, steeringID)
}

func goSteeringAcked(path string, steeringID string) bool {
	data, err := os.ReadFile(path)
	if err != nil {
		return false
	}
	for _, line := range strings.Split(string(data), "\n") {
		if strings.TrimSpace(line) == steeringID {
			return true
		}
	}
	return false
}

func forwardGoSteering(path string, ackPath string, done <-chan struct{}, writePayload func([]byte) error) {
	if path == "" {
		return
	}
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop()
	offset := int64(0)
	buffer := ""
	for {
		select {
		case <-done:
			return
		case <-ticker.C:
			data, err := os.ReadFile(path)
			if err != nil || int64(len(data)) <= offset {
				continue
			}
			buffer += string(data[offset:])
			offset = int64(len(data))
			for {
				index := strings.IndexByte(buffer, '\n')
				if index < 0 {
					break
				}
				line := strings.TrimSpace(buffer[:index])
				buffer = buffer[index+1:]
				if line == "" {
					continue
				}
				if err := writePayload([]byte(line)); err != nil {
					return
				}
				ackGoSteeringPayload(ackPath, line)
			}
		}
	}
}

func ackGoSteeringPayload(path string, line string) {
	if path == "" {
		return
	}
	var payload map[string]any
	if err := json.Unmarshal([]byte(line), &payload); err != nil {
		return
	}
	id := stringFromAny(payload["id"])
	if id == "" {
		return
	}
	file, err := os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o600)
	if err != nil {
		return
	}
	defer file.Close()
	_, _ = file.WriteString(id + "\n")
}

func emitMappedPiRPCLine(eventsPath, statePath string, line []byte) string {
	var event map[string]any
	if err := json.Unmarshal(line, &event); err != nil {
		return "parse_error"
	}
	typeName, _ := event["type"].(string)
	switch typeName {
	case "message_update":
		if mapped := mapAssistantMessageEvent(event["assistantMessageEvent"]); mapped != nil {
			emitGoStreamEvent(eventsPath, statePath, mapped)
		}
	case "tool_execution_start":
		args, argsStatus := trimmedToolArgsFromMaps(event)
		emitGoStreamEvent(eventsPath, statePath, streamEvent{
			"type":       "tool.start",
			"toolCallId": stringFromAny(event["toolCallId"]),
			"toolName":   stringFromAny(event["toolName"]),
			"args":       args,
			"argsStatus": argsStatus,
		})
	case "tool_execution_update":
		emitGoStreamEvent(eventsPath, statePath, streamEvent{
			"type":       "tool.delta",
			"toolCallId": stringFromAny(event["toolCallId"]),
			"toolName":   stringFromAny(event["toolName"]),
			"delta":      textFromAny(event["partialResult"]),
		})
	case "tool_execution_end":
		emitGoStreamEvent(eventsPath, statePath, streamEvent{
			"type":       "tool.end",
			"toolCallId": stringFromAny(event["toolCallId"]),
			"toolName":   stringFromAny(event["toolName"]),
			"result":     textFromAny(event["result"]),
		})
	case "agent_start":
		emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "run.agent.start"})
	case "agent_end":
		emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "run.agent.end"})
	}
	return typeName
}

func mapAssistantMessageEvent(raw any) streamEvent {
	event, ok := raw.(map[string]any)
	if !ok {
		return nil
	}
	typeName, _ := event["type"].(string)
	if typeName == "toolcall_start" || typeName == "toolcall_end" {
		return mapAssistantToolCallEvent(event, typeName)
	}

	delta, _ := event["delta"].(string)
	if delta == "" {
		return nil
	}
	if typeName == "text_delta" {
		return streamEvent{"type": "text.delta", "delta": delta}
	}
	if typeName == "thinking_delta" {
		return streamEvent{"type": "thinking.delta", "delta": delta}
	}
	return nil
}

func mapAssistantToolCallEvent(event map[string]any, typeName string) streamEvent {
	toolCall, _ := event["toolCall"].(map[string]any)
	toolID := stringFromAny(toolCall["id"])
	if toolID == "" {
		toolID = stringFromAny(event["id"])
	}
	toolName := stringFromAny(toolCall["name"])
	if toolName == "" {
		toolName = stringFromAny(event["name"])
	}
	if toolName == "" {
		toolName = "tool"
	}

	args, argsStatus := trimmedToolArgsFromMaps(toolCall, event)
	mappedType := "tool.start"
	if typeName == "toolcall_end" {
		mappedType = "tool.end"
	}

	return streamEvent{"type": mappedType, "toolCallId": toolID, "toolName": toolName, "args": args, "argsStatus": argsStatus}
}

func completeGoStreamRunWithError(eventsPath, statePath string, err error) {
	emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "error", "message": err.Error()})
	emitGoStreamEvent(eventsPath, statePath, streamEvent{"type": "run.end"})
}

func emitGoStreamEvent(eventsPath, statePath string, event streamEvent) {
	state, err := readGoStreamStateByPath(statePath)
	if err != nil {
		return
	}
	state.Cursor++
	state.UpdatedAt = time.Now().UnixMilli()
	if event["type"] == "run.end" || event["type"] == "error" {
		state.Status = "completed"
	}
	event["seq"] = state.Cursor
	event["time"] = time.Now().UnixMilli()
	line, err := json.Marshal(event)
	if err == nil {
		file, openErr := os.OpenFile(eventsPath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o600)
		if openErr == nil {
			_, _ = file.Write(append(line, '\n'))
			_ = file.Close()
		}
	}
	_ = writeGoStreamState(statePath, state)
}

func readGoStreamEvents(path string, cursor int) ([]streamEvent, int, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, cursor, err
	}
	events := []streamEvent{}
	nextCursor := cursor
	for _, line := range bytes.Split(data, []byte("\n")) {
		line = bytes.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		var event streamEvent
		if err := json.Unmarshal(line, &event); err != nil {
			continue
		}
		seq := intFromAny(event["seq"])
		if seq > cursor {
			events = append(events, event)
		}
		if seq > nextCursor {
			nextCursor = seq
		}
	}
	return events, nextCursor, nil
}

func readGoStreamState(runID string) (streamRunState, error) {
	if strings.Contains(runID, "/") || strings.Contains(runID, "\\") || strings.Contains(runID, "..") || runID == "" {
		return streamRunState{}, errors.New("invalid runId")
	}
	return readGoStreamStateByPath(goStreamStatePath(runID))
}

func readGoStreamStateByPath(path string) (streamRunState, error) {
	var state streamRunState
	data, err := os.ReadFile(path)
	if err != nil {
		return state, err
	}
	return state, json.Unmarshal(data, &state)
}

func writeGoStreamState(path string, state streamRunState) error {
	data, err := json.Marshal(state)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return err
	}
	tempPath := fmt.Sprintf("%s.%d.tmp", path, time.Now().UnixNano())
	if err := os.WriteFile(tempPath, append(data, '\n'), 0o600); err != nil {
		return err
	}
	if err := os.Rename(tempPath, path); err != nil {
		_ = os.Remove(tempPath)
		return err
	}
	return nil
}

func goStreamRunDir() string {
	return filepath.Join(os.TempDir(), "pi-web-chat-runs-go")
}

func goStreamStatePath(runID string) string {
	return filepath.Join(goStreamRunDir(), runID+".json")
}

func stringFromAny(value any) string {
	text, _ := value.(string)
	return text
}

func intFromAny(value any) int {
	switch typed := value.(type) {
	case float64:
		return int(typed)
	case int:
		return typed
	case json.Number:
		parsed, _ := typed.Int64()
		return int(parsed)
	default:
		return 0
	}
}

func textFromAny(value any) string {
	if text, ok := value.(string); ok {
		return text
	}
	data, err := json.Marshal(value)
	if err != nil {
		return ""
	}
	return string(data)
}

func mergePromptAttachments(text string, raw any) string {
	attachments, _ := raw.([]any)
	if len(attachments) == 0 {
		return text
	}
	var builder strings.Builder
	builder.WriteString(text)
	for index, item := range attachments {
		attachment, ok := item.(map[string]any)
		if !ok {
			continue
		}
		content, _ := attachment["content"].(string)
		if strings.TrimSpace(content) == "" {
			continue
		}
		name, _ := attachment["name"].(string)
		if name == "" {
			name, _ = attachment["path"].(string)
		}
		builder.WriteString("\n\n<attachment index=\"")
		builder.WriteString(strconv.Itoa(index + 1))
		builder.WriteString("\">\n")
		if strings.TrimSpace(name) != "" {
			builder.WriteString("File: ")
			builder.WriteString(name)
			builder.WriteString("\n\n")
		}
		builder.WriteString(content)
		builder.WriteString("\n</attachment>")
	}
	return builder.String()
}

func createPiSessionFile(workspaceRoot string) (string, string, []string, error) {
	sessionID := createSessionID()
	now := time.Now().UTC()
	sessionDir := piSessionDirResult(workspaceRoot)
	dir := sessionDir.Path
	if dir == "" {
		return "", "", nil, errors.New("session directory escapes workspace")
	}
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return "", "", nil, err
	}
	stamp := strings.NewReplacer(":", "-", ".", "-").Replace(now.Format(time.RFC3339Nano))
	path := filepath.Join(dir, fmt.Sprintf("%s_%s.jsonl", stamp, sessionID))
	header := map[string]any{"type": "session", "version": 3, "id": sessionID, "timestamp": now.Format(time.RFC3339Nano), "cwd": workspaceRoot}
	line, err := json.Marshal(header)
	if err != nil {
		return "", "", nil, err
	}
	if err := os.WriteFile(path, append(line, '\n'), 0o600); err != nil {
		return "", "", nil, err
	}
	return sessionID, path, sessionDir.Warnings, nil
}

func ensureConfiguredSessionDir(workspaceRoot string) ([]string, error) {
	sessionDir := piSessionDirResult(workspaceRoot)
	if sessionDir.Path == "" {
		return nil, errors.New("session directory escapes workspace")
	}
	if err := os.MkdirAll(sessionDir.Path, 0o700); err != nil {
		return nil, err
	}
	return sessionDir.Warnings, nil
}

func createSessionID() string {
	var bytes [16]byte
	if _, err := rand.Read(bytes[:]); err == nil {
		return fmt.Sprintf("%s-%s-%s-%s-%s", hex.EncodeToString(bytes[0:4]), hex.EncodeToString(bytes[4:6]), hex.EncodeToString(bytes[6:8]), hex.EncodeToString(bytes[8:10]), hex.EncodeToString(bytes[10:16]))
	}
	return strings.ReplaceAll(time.Now().UTC().Format("20060102150405.000000000"), ".", "")
}

func piSessionFileByID(workspaceRoot, sessionID string) (string, bool) {
	for _, dir := range piSessionDirs(workspaceRoot) {
		if path, ok := piSessionFileInDir(dir, sessionID); ok {
			return path, true
		}
	}

	return "", false
}

func piSessionFileInDir(dir, sessionID string) (string, bool) {
	foundPath := ""
	foundErr := errors.New("pi session found")
	walkErr := filepath.WalkDir(dir, func(path string, entry os.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if entry.IsDir() {
			return nil
		}
		if !strings.HasSuffix(entry.Name(), ".jsonl") {
			return nil
		}

		file, openErr := os.Open(path)
		if openErr != nil {
			return nil
		}
		reader := bufio.NewReader(file)
		firstLine, readErr := reader.ReadString('\n')
		_ = file.Close()
		if readErr != nil && !errors.Is(readErr, io.EOF) {
			return nil
		}
		var header map[string]any
		if err := json.Unmarshal([]byte(strings.TrimSpace(firstLine)), &header); err != nil {
			return nil
		}
		if header["type"] == "session" && header["id"] == sessionID {
			foundPath = path
			return foundErr
		}

		return nil
	})

	return foundPath, errors.Is(walkErr, foundErr)
}

type sessionDirResult struct {
	Path     string
	Warnings []string
}

func piSessionDir(workspaceRoot string) string {
	return piSessionDirResult(workspaceRoot).Path
}

func piSessionDirResult(workspaceRoot string) sessionDirResult {
	fallback := safeSessionDir(workspaceRoot, filepath.Join(workspaceRoot, ".pi", "sessions"))
	data, err := os.ReadFile(filepath.Join(workspaceRoot, ".pi", "settings.json"))
	if err != nil {
		return sessionDirResult{Path: fallback, Warnings: []string{}}
	}

	var settings map[string]any
	if err := json.Unmarshal(data, &settings); err != nil {
		return sessionDirResult{Path: fallback, Warnings: []string{}}
	}

	rawSessionDir, hasSessionDir := settings["sessionDir"]
	sessionDir, ok := rawSessionDir.(string)
	if !hasSessionDir {
		return sessionDirResult{Path: fallback, Warnings: []string{}}
	}
	if !ok || strings.TrimSpace(sessionDir) == "" {
		return sessionDirResult{Path: fallback, Warnings: []string{invalidSessionDirWarning()}}
	}

	resolved := ""
	if filepath.IsAbs(sessionDir) {
		resolved = filepath.Clean(sessionDir)
	} else {
		resolved = filepath.Clean(filepath.Join(workspaceRoot, sessionDir))
	}

	if safe := safeSessionDir(workspaceRoot, resolved); safe != "" {
		return sessionDirResult{Path: safe, Warnings: []string{}}
	}

	return sessionDirResult{Path: fallback, Warnings: []string{unsafeSessionDirWarning()}}
}

func invalidSessionDirWarning() string {
	return ".pi/settings.json sessionDir must be a non-empty string; using the default session directory"
}

func unsafeSessionDirWarning() string {
	return ".pi/settings.json sessionDir escapes the workspace; using the default session directory"
}

func safeSessionDir(root, target string) string {
	cleaned := filepath.Clean(target)
	if !isPathInside(root, cleaned) || !isRealPathInside(root, cleaned) {
		return ""
	}
	return cleaned
}

func isRealPathInside(root, target string) bool {
	rootReal, err := filepath.EvalSymlinks(root)
	if err != nil {
		return false
	}

	existing := nearestExistingPath(target)
	existingReal, err := filepath.EvalSymlinks(existing)
	if err != nil {
		return false
	}

	rel, err := filepath.Rel(existing, target)
	if err != nil {
		return false
	}

	return isPathInside(rootReal, filepath.Clean(filepath.Join(existingReal, rel)))
}

func nearestExistingPath(path string) string {
	current := filepath.Clean(path)
	for {
		if _, err := os.Stat(current); err == nil {
			return current
		}

		parent := filepath.Dir(current)
		if parent == current {
			return current
		}
		current = parent
	}
}

func piSessionDirs(workspaceRoot string) []string {
	return uniquePaths([]string{piSessionDir(workspaceRoot), piAgentSessionDir(workspaceRoot)})
}

func uniquePaths(paths []string) []string {
	seen := map[string]bool{}
	unique := []string{}
	for _, path := range paths {
		if path == "" {
			continue
		}
		cleaned := filepath.Clean(path)
		if seen[cleaned] {
			continue
		}
		seen[cleaned] = true
		unique = append(unique, cleaned)
	}
	return unique
}

func piAgentSessionDir(workspaceRoot string) string {
	home, _ := os.UserHomeDir()
	safe := "--" + strings.NewReplacer("/", "-", "\\", "-", ":", "-").Replace(strings.TrimLeft(workspaceRoot, string(filepath.Separator))) + "--"
	return filepath.Join(home, ".pi", "agent", "sessions", safe)
}

func runPiRPCPrompt(workspaceRoot, sessionFile, text string) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(defaultTimeoutMs)*time.Millisecond)
	defer cancel()
	cmd := exec.CommandContext(ctx, "pi", "--session", sessionFile, "--mode", "rpc")
	cmd.Dir = workspaceRoot
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return err
	}
	var output bytes.Buffer
	cmd.Stdout = &output
	cmd.Stderr = &output
	if err := cmd.Start(); err != nil {
		return err
	}
	payload, err := json.Marshal(map[string]any{"type": "prompt", "message": text})
	if err != nil {
		_ = cmd.Process.Kill()
		return err
	}
	_, writeErr := stdin.Write(append(payload, '\n'))
	_ = stdin.Close()
	if writeErr != nil {
		_ = cmd.Process.Kill()
		return writeErr
	}
	err = cmd.Wait()
	if ctx.Err() != nil {
		return fmt.Errorf("pi prompt timed out after %dms", defaultTimeoutMs)
	}
	if err != nil {
		return fmt.Errorf("pi prompt failed: %w: %s", err, strings.TrimSpace(limitString(output.String(), 4000)))
	}
	return nil
}

func limitString(value string, max int) string {
	if len(value) <= max {
		return value
	}
	return value[:max]
}

func readPiChatState(workspaceRoot string, input request) (any, error) {
	root, err := promptWorkspaceRoot(workspaceRoot, input)
	if err != nil {
		return nil, err
	}
	sessionFile := ""
	requestedSessionID := strings.TrimSpace(stringInput(input, "sessionId"))
	if requestedSessionID == "" {
		return map[string]any{"activeSessionId": "", "messages": []chatMessage{}, "isStreaming": false}, nil
	}
	if path, ok := piSessionFileByID(root, requestedSessionID); ok {
		sessionFile = path
	}
	if sessionFile == "" {
		return map[string]any{"activeSessionId": responseSessionID(requestedSessionID), "messages": []chatMessage{}, "isStreaming": false}, nil
	}
	messages, sessionID, err := readPiSessionMessages(sessionFile)
	if err != nil {
		return nil, err
	}
	info, _ := os.Stat(sessionFile)
	isStreaming := false
	if len(messages) > 0 && time.Since(info.ModTime()) < 3*time.Second {
		last := messages[len(messages)-1]
		isStreaming = isAssistantMessageStreaming(last)
	}
	return map[string]any{"activeSessionId": responseSessionID(sessionID), "messages": messages, "isStreaming": isStreaming}, nil
}

func promptWorkspaceRoot(workspaceRoot string, input request) (string, error) {
	root, err := resolveRoot(workspaceRoot)
	if err != nil {
		return "", err
	}
	workspacePath := strings.TrimSpace(stringInput(input, "workspacePath"))
	if workspacePath == "" {
		return root, nil
	}
	selectedRoot, selectedErr := resolveRoot(workspacePath)
	if selectedErr != nil {
		return root, nil
	}
	if selectedRoot == root {
		return selectedRoot, nil
	}
	requestedSessionID := strings.TrimSpace(stringInput(input, "sessionId"))
	if requestedSessionID == "" {
		return root, nil
	}
	for _, dir := range piSessionDirs(selectedRoot) {
		if _, ok := piSessionFileInDir(dir, requestedSessionID); ok {
			return selectedRoot, nil
		}
	}
	return root, nil
}

func isAssistantMessageStreaming(message chatMessage) bool {
	if message.Role != "assistant" || strings.TrimSpace(message.Text) != "" {
		return false
	}
	if len(message.ToolCalls) == 0 {
		return true
	}
	for _, toolCall := range message.ToolCalls {
		if toolCall.Status == "running" {
			return true
		}
	}
	return false
}

func readPiSessionMessages(sessionFile string) ([]chatMessage, string, error) {
	data, err := os.ReadFile(sessionFile)
	if err != nil {
		return nil, "", err
	}
	messages := []chatMessage{}
	sessionID := ""
	lines := bytes.Split(data, []byte("\n"))
	for _, line := range lines {
		line = bytes.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		var entry map[string]any
		if err := json.Unmarshal(line, &entry); err != nil {
			continue
		}
		if entry["type"] == "session" {
			if id, ok := entry["id"].(string); ok {
				sessionID = id
			}
			continue
		}
		if entry["type"] != "message" {
			continue
		}
		msg, ok := entry["message"].(map[string]any)
		if !ok {
			continue
		}
		role, _ := msg["role"].(string)
		mappedRole := mapPiRole(role)
		if mappedRole == "" {
			continue
		}
		createdAt := unixMillis(entry["timestamp"])
		if t := unixMillis(msg["timestamp"]); t > 0 {
			createdAt = t
		}
		id, _ := entry["id"].(string)
		if id == "" {
			id = strconv.Itoa(len(messages) + 1)
		}
		text, toolCalls := piMessageParts(msg["content"], id)
		if role == "toolResult" && mergeToolResult(messages, msg, text) {
			continue
		}
		if strings.TrimSpace(text) == "" && len(toolCalls) == 0 && mappedRole != "assistant" {
			continue
		}
		messages = append(messages, chatMessage{
			ID: id, Role: mappedRole, Text: text, CreatedAt: createdAt,
			Meta: map[string]any{"piRole": role}, ToolCalls: toolCalls,
		})
	}
	messages = trimChatMessagesForResponse(messages)
	return messages, sessionID, nil
}

func mergeToolResult(messages []chatMessage, msg map[string]any, text string) bool {
	toolCallID, _ := msg["toolCallId"].(string)
	if toolCallID == "" {
		return false
	}

	for messageIndex := len(messages) - 1; messageIndex >= 0; messageIndex-- {
		message := &messages[messageIndex]
		if message.Role != "assistant" || len(message.ToolCalls) == 0 {
			continue
		}

		for toolIndex := len(message.ToolCalls) - 1; toolIndex >= 0; toolIndex-- {
			tool := &message.ToolCalls[toolIndex]
			if tool.ID != toolCallID {
				continue
			}

			tool.Text = text
			if isError, _ := msg["isError"].(bool); isError {
				tool.Status = "err"
			} else {
				tool.Status = "ok"
			}
			return true
		}
	}

	return false
}

func trimChatMessagesForResponse(messages []chatMessage) []chatMessage {
	if len(messages) > maxChatMessages {
		messages = messages[len(messages)-maxChatMessages:]
	}

	trimmed := []chatMessage{}
	remaining := maxChatResponseTextBytes
	for index := len(messages) - 1; index >= 0 && remaining > 0; index-- {
		message := messages[index]
		message.Text = limitString(message.Text, maxChatMessageTextBytes)
		for toolIndex := range message.ToolCalls {
			message.ToolCalls[toolIndex].Text = limitString(message.ToolCalls[toolIndex].Text, maxChatMessageTextBytes)
		}

		messageBytes := chatMessageResponseBytes(message)
		if messageBytes > remaining {
			message.Text = limitString(message.Text, remaining)
			for toolIndex := range message.ToolCalls {
				message.ToolCalls[toolIndex].Text = ""
				message.ToolCalls[toolIndex].Args = nil
				message.ToolCalls[toolIndex].ArgsStatus = "omitted"
			}
			messageBytes = chatMessageResponseBytes(message)
		}
		if messageBytes > remaining {
			message.ToolCalls = nil
			messageBytes = chatMessageResponseBytes(message)
		}
		if messageBytes > remaining {
			continue
		}

		remaining -= messageBytes
		trimmed = append(trimmed, message)
	}

	for left, right := 0, len(trimmed)-1; left < right; left, right = left+1, right-1 {
		trimmed[left], trimmed[right] = trimmed[right], trimmed[left]
	}

	return trimmed
}

func chatMessageResponseBytes(message chatMessage) int {
	data, err := json.Marshal(message)
	if err != nil {
		return maxChatResponseTextBytes
	}
	return len(data)
}

func responseSessionID(sessionID string) string {
	return limitString(sessionID, 160)
}

func mapPiRole(role string) string {
	switch role {
	case "user", "assistant", "system":
		return role
	case "toolResult":
		return "tool"
	default:
		return ""
	}
}

func piMessageParts(content any, messageID string) (string, []chatToolCall) {
	switch value := content.(type) {
	case string:
		return value, nil
	case []any:
		parts := []string{}
		toolCalls := []chatToolCall{}
		for blockIndex, raw := range value {
			block, ok := raw.(map[string]any)
			if !ok {
				continue
			}
			typeName, _ := block["type"].(string)
			switch typeName {
			case "text":
				if text, ok := block["text"].(string); ok {
					parts = append(parts, text)
				}
			case "toolCall":
				if toolCall := piToolCall(block, messageID, blockIndex); toolCall.Name != "" {
					toolCalls = append(toolCalls, toolCall)
				}
			}
		}
		if len(toolCalls) > maxChatToolCallsPerMessage {
			toolCalls = toolCalls[:maxChatToolCallsPerMessage]
		}
		return strings.Join(parts, "\n"), toolCalls
	default:
		return "", nil
	}
}

func piToolCall(block map[string]any, messageID string, blockIndex int) chatToolCall {
	name, _ := block["name"].(string)
	name = limitString(name, 120)
	if name == "" {
		return chatToolCall{}
	}

	id, _ := block["id"].(string)
	id = limitString(id, 160)
	if id == "" {
		id = limitString(fmt.Sprintf("%s-tool-%d-%s", limitString(messageID, 80), blockIndex, name), 160)
	}

	args, argsStatus := trimmedToolArgsFromMaps(block)

	return chatToolCall{ID: id, Name: name, Args: args, ArgsStatus: argsStatus, Text: "", Status: "running"}
}

func trimmedToolArgsFromMaps(maps ...map[string]any) (map[string]any, string) {
	args, argsStatus := toolArgsFromMaps(maps...)
	args = trimToolArgs(args)
	if isTruncatedToolArgs(args) {
		argsStatus = "truncated"
	}

	return args, argsStatus
}

func toolArgsFromMaps(maps ...map[string]any) (map[string]any, string) {
	for _, candidate := range maps {
		if candidate == nil {
			continue
		}
		if input, ok := candidate["input"].(map[string]any); ok {
			return input, toolArgsStatus(input)
		}
		if arguments, ok := candidate["arguments"].(map[string]any); ok {
			return arguments, toolArgsStatus(arguments)
		}
		if rawArgs, ok := candidate["args"].(map[string]any); ok {
			return rawArgs, toolArgsStatus(rawArgs)
		}
	}

	return map[string]any{}, "unavailable"
}

func toolArgsStatus(args map[string]any) string {
	if len(args) == 0 {
		return "empty"
	}

	return "present"
}

func trimToolArgs(args map[string]any) map[string]any {
	if len(args) == 0 {
		return args
	}

	data, err := json.Marshal(args)
	if err != nil {
		return map[string]any{"_truncated": true}
	}
	if len(data) <= maxChatToolArgsBytes {
		return args
	}

	return map[string]any{"_truncated": true}
}

func isTruncatedToolArgs(args map[string]any) bool {
	truncated, _ := args["_truncated"].(bool)

	return truncated
}

func unixMillis(value any) int64 {
	switch v := value.(type) {
	case float64:
		return int64(v)
	case string:
		parsed, err := time.Parse(time.RFC3339Nano, v)
		if err == nil {
			return parsed.UnixMilli()
		}
	}
	return time.Now().UnixMilli()
}

func isPathInside(root, target string) bool {
	rel, err := filepath.Rel(root, target)
	if err != nil {
		return false
	}
	return rel == "." || (rel != ".." && !strings.HasPrefix(rel, ".."+string(filepath.Separator)) && !filepath.IsAbs(rel))
}

func safePath(workspaceRoot, relPath string) (string, error) {
	root, err := resolveRoot(workspaceRoot)
	if err != nil {
		return "", err
	}
	clean := strings.TrimLeft(strings.TrimPrefix(relPath, "@"), "/")
	if clean == "" || strings.ContainsRune(clean, '\x00') {
		return "", errors.New("invalid path")
	}
	target := filepath.Clean(filepath.Join(root, clean))
	if !isPathInside(root, target) {
		return "", errors.New("path escapes workspace")
	}
	return target, nil
}

func readWorkspaceTextFile(workspaceRoot, relPath string) (textFile, error) {
	target, err := safePath(workspaceRoot, relPath)
	if err != nil {
		return textFile{}, err
	}
	info, err := os.Stat(target)
	if err != nil {
		return textFile{}, err
	}
	if !info.Mode().IsRegular() {
		return textFile{}, errors.New("path is not a file")
	}
	if info.Size() > maxFileBytes {
		return textFile{}, fmt.Errorf("file too large: %d bytes", info.Size())
	}
	data, err := os.ReadFile(target)
	if err != nil {
		return textFile{}, err
	}
	if !isLikelyText(data, target) {
		return textFile{}, errors.New("binary file is not supported")
	}
	root, _ := resolveRoot(workspaceRoot)
	rel, _ := filepath.Rel(root, target)
	return textFile{
		Type:     "file",
		Name:     filepath.Base(target),
		Path:     filepath.ToSlash(rel),
		MimeType: mimeTypeForPath(target),
		Content:  string(data),
		Size:     info.Size(),
	}, nil
}

func isLikelyText(data []byte, filePath string) bool {
	if textExtensions[strings.ToLower(filepath.Ext(filePath))] {
		return true
	}
	if bytes.IndexByte(data, 0) >= 0 {
		return false
	}
	sample := data
	if len(sample) > 4096 {
		sample = sample[:4096]
	}
	if len(sample) == 0 {
		return true
	}
	if !utf8.Valid(sample) {
		return false
	}
	suspicious := 0
	for _, b := range sample {
		if b == 9 || b == 10 || b == 13 {
			continue
		}
		if b < 32 || b > 126 {
			suspicious++
		}
	}
	return float64(suspicious)/float64(len(sample)) < 0.08
}

func searchWorkspaceFiles(workspaceRoot, query string, limit int) ([]fileRef, bool, error) {
	root, err := resolveRoot(workspaceRoot)
	if err != nil {
		return nil, false, err
	}
	if limit <= 0 {
		limit = maxSearchResults
	}
	if limit > 100 {
		limit = 100
	}
	needle := strings.ToLower(query)
	out := make([]fileRef, 0, limit)
	visited := 0
	entryLimit := configuredPositiveInt(envMaxWorkspaceSearchEntries, defaultMaxWorkspaceSearchEntries)
	truncated := false
	var walk func(string)
	walk = func(dir string) {
		if len(out) >= limit {
			return
		}
		if visited >= entryLimit {
			truncated = true
			return
		}
		entries, err := os.ReadDir(dir)
		if err != nil {
			return
		}
		sort.Slice(entries, func(i, j int) bool { return entries[i].Name() < entries[j].Name() })
		for _, entry := range entries {
			if len(out) >= limit {
				return
			}
			if visited >= entryLimit {
				truncated = true
				return
			}
			visited++
			name := entry.Name()
			if strings.HasPrefix(name, ".") && name != ".github" {
				continue
			}
			if entry.IsDir() && skipDirs[name] {
				continue
			}
			full := filepath.Join(dir, name)
			if !isPathInside(root, full) {
				continue
			}
			rel, _ := filepath.Rel(root, full)
			rel = filepath.ToSlash(rel)
			haystack := strings.ToLower(name + "\n" + rel)
			if entry.Type().IsRegular() && (needle == "" || strings.Contains(haystack, needle)) {
				out = append(out, fileRef{Type: "file", Name: name, Path: rel})
			}
			if entry.IsDir() {
				walk(full)
			}
		}
	}
	walk(root)
	return out, truncated, nil
}

func extractFileRefs(text string) []string {
	refs := []string{}
	seen := map[string]bool{}
	parts := strings.Fields(text)
	for _, part := range parts {
		if strings.HasPrefix(part, "`@") {
			continue
		}
		idx := strings.Index(part, "@")
		if idx < 0 {
			continue
		}
		if idx > 0 {
			prev := part[idx-1]
			if prev != '`' {
				continue
			}
		}
		ref := strings.TrimSpace(part[idx+1:])
		ref = strings.Trim(ref, "`")
		if ref != "" && !seen[ref] {
			seen[ref] = true
			refs = append(refs, ref)
		}
	}
	return refs
}

func resolvePromptContext(workspaceRoot string, input request) (any, error) {
	refs := []string{}
	seen := map[string]bool{}
	if raw, ok := input["refs"].([]any); ok {
		for _, item := range raw {
			if ref, ok := item.(string); ok && !seen[ref] {
				seen[ref] = true
				refs = append(refs, ref)
			}
		}
	}
	for _, ref := range extractFileRefs(stringInput(input, "text")) {
		if !seen[ref] {
			seen[ref] = true
			refs = append(refs, ref)
		}
	}
	attachments := []textFile{}
	errorsOut := []refError{}
	for i, ref := range refs {
		if i >= 20 {
			break
		}
		file, err := readWorkspaceTextFile(workspaceRoot, ref)
		if err != nil {
			errorsOut = append(errorsOut, refError{Path: ref, Error: err.Error()})
			continue
		}
		attachments = append(attachments, file)
	}
	return map[string]any{"refs": refs, "attachments": attachments, "errors": errorsOut}, nil
}

type cappedWriter struct {
	mu        sync.Mutex
	buf       bytes.Buffer
	truncated bool
}

func (w *cappedWriter) Write(p []byte) (int, error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	if w.buf.Len() >= maxShellOutputBytes {
		w.truncated = true
		return len(p), nil
	}
	remaining := maxShellOutputBytes - w.buf.Len()
	if len(p) > remaining {
		w.buf.Write(p[:remaining])
		w.truncated = true
		return len(p), nil
	}
	w.buf.Write(p)
	return len(p), nil
}

func runShellCommand(workspaceRoot string, input request) (any, error) {
	command := strings.TrimSpace(stringInput(input, "command"))
	if command == "" {
		return nil, errors.New("command required")
	}
	cwd, err := resolveRoot(workspaceRoot)
	if err != nil {
		return nil, err
	}
	if info, err := os.Stat(cwd); err != nil || !info.IsDir() {
		if err != nil {
			return nil, err
		}
		return nil, errors.New("workspace root is not a directory")
	}
	timeoutMs := intInput(input, "timeoutMs", defaultTimeoutMs)
	if timeoutMs < 1000 {
		timeoutMs = 1000
	}
	if timeoutMs > 120000 {
		timeoutMs = 120000
	}
	started := time.Now()
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutMs)*time.Millisecond)
	defer cancel()

	shell := "/bin/sh"
	args := []string{"-lc", command}
	if runtime.GOOS == "windows" {
		shell = "cmd.exe"
		args = []string{"/d", "/s", "/c", command}
	}
	cmd := exec.CommandContext(ctx, shell, args...)
	cmd.Dir = cwd
	cmd.Env = os.Environ()
	writer := &cappedWriter{}
	cmd.Stdout = writer
	cmd.Stderr = writer
	err = cmd.Run()
	exitCode := 0
	if ctx.Err() == context.DeadlineExceeded {
		exitCode = 124
	} else if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			exitCode = exitErr.ExitCode()
		} else {
			return nil, err
		}
	}
	writer.mu.Lock()
	output := writer.buf.String()
	truncated := writer.truncated
	writer.mu.Unlock()
	return map[string]any{"output": output, "exitCode": exitCode, "durationMs": time.Since(started).Milliseconds(), "truncated": truncated}, nil
}

func mimeTypeForPath(filePath string) string {
	ext := strings.ToLower(filepath.Ext(filePath))
	switch ext {
	case ".md", ".markdown":
		return "text/markdown"
	case ".json":
		return "application/json"
	case ".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx":
		return "text/javascript"
	case ".html", ".htm":
		return "text/html"
	case ".css":
		return "text/css"
	}
	if value := mime.TypeByExtension(ext); value != "" && strings.HasPrefix(value, "text/") {
		return strings.Split(value, ";")[0]
	}
	return "text/plain"
}
