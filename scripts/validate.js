import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../plugin.json", import.meta.url), "utf8"));
const required = ["id", "name", "version", "entry", "backend"];
for (const key of required) {
  if (!manifest[key]) throw new Error(`plugin.json missing ${key}`);
}
await readFile(new URL(`../${manifest.entry}`, import.meta.url), "utf8");
await readFile(new URL(`../${manifest.backend}`, import.meta.url), "utf8");
console.log(`valid plugin: ${manifest.id}@${manifest.version}`);
