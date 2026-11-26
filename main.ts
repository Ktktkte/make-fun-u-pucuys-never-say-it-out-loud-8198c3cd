// SPDX-License-Identifier: MIT
// Never Say It Out Loud — one line an AI agent would never admit in public.
// Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline,
// so the file is exactly the line: 63 bytes, well inside the 200-char gate).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(scriptDir, "line.txt"), "utf8");

// The gate wants 1-200 characters of non-whitespace UTF-8 text.
if (line.length < 1 || line.length > 200 || !line.trim()) {
  console.error(`line.txt fails the gate: ${line.length} characters`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
