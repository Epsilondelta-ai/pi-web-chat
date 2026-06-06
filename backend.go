package main

import (
	"bytes"
	"context"
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
	"time"
	"unicode/utf8"
)

const (
	maxFileBytes                     = 256 * 1024
	maxOutputBytes                   = 512 * 1024
	defaultTimeoutMs                 = 30000
	maxSearchResults                 = 30
	maxChatMessages                  = 200
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
	workspaceRoot := arg(2)
	input, err := readInput(os.Stdin)
	if err != nil {
		fail(err)
	}
	if data, ok := input["data"].(map[string]any); ok {
		input = request(data)
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
		return readPiChatState(workspaceRoot)
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

func readPiChatState(workspaceRoot string) (any, error) {
	root, err := resolveRoot(workspaceRoot)
	if err != nil {
		return nil, err
	}
	sessionFile, err := mostRecentPiSessionFile(root)
	if err != nil || sessionFile == "" {
		return map[string]any{"messages": []chatMessage{}, "isStreaming": false}, err
	}
	messages, sessionID, err := readPiSessionMessages(sessionFile)
	if err != nil {
		return nil, err
	}
	info, _ := os.Stat(sessionFile)
	isStreaming := false
	if len(messages) > 0 && time.Since(info.ModTime()) < 3*time.Second {
		last := messages[len(messages)-1]
		isStreaming = last.Role == "assistant" && strings.TrimSpace(last.Text) == ""
	}
	return map[string]any{"activeSessionId": sessionID, "messages": messages, "isStreaming": isStreaming}, nil
}

func mostRecentPiSessionFile(workspaceRoot string) (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}
	safe := "--" + strings.NewReplacer("/", "-", "\\", "-", ":", "-").Replace(strings.TrimLeft(workspaceRoot, string(filepath.Separator))) + "--"
	dir := filepath.Join(home, ".pi", "agent", "sessions", safe)
	entries, err := os.ReadDir(dir)
	if errors.Is(err, os.ErrNotExist) {
		return "", nil
	}
	if err != nil {
		return "", err
	}
	var newest string
	var newestTime time.Time
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".jsonl") {
			continue
		}
		path := filepath.Join(dir, entry.Name())
		info, err := entry.Info()
		if err != nil {
			continue
		}
		if newest == "" || info.ModTime().After(newestTime) {
			newest = path
			newestTime = info.ModTime()
		}
	}
	return newest, nil
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
		text := piMessageText(msg["content"])
		if strings.TrimSpace(text) == "" && mappedRole != "assistant" {
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
		messages = append(messages, chatMessage{ID: id, Role: mappedRole, Text: text, CreatedAt: createdAt, Meta: map[string]any{"piRole": role}})
	}
	if len(messages) > maxChatMessages {
		messages = messages[len(messages)-maxChatMessages:]
	}
	return messages, sessionID, nil
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

func piMessageText(content any) string {
	switch value := content.(type) {
	case string:
		return value
	case []any:
		parts := []string{}
		for _, raw := range value {
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
				name, _ := block["name"].(string)
				if name != "" {
					parts = append(parts, "[tool call: "+name+"]")
				}
			}
		}
		return strings.Join(parts, "\n")
	default:
		return ""
	}
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
	if w.buf.Len() >= maxOutputBytes {
		w.truncated = true
		return len(p), nil
	}
	remaining := maxOutputBytes - w.buf.Len()
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
