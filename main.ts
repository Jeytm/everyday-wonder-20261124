import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "A moth landed on my cracked phone at midnight and kept sipping the moon from my lock-screen photo, convinced the wallpaper was the sky, until the battery died and the real dark swallowed it whole.";

// Runtime gate guard: the entry must be exactly one sentence, 1-200 chars, no newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry gate failed: ${ENTRY.length} chars, must be 1-200`);
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry gate failed: entry must not contain a newline");
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("  ")) {
  throw new Error("Entry gate failed: entry must not have leading/trailing or double spaces");
}
const sentenceEnders = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !/[.!?]$/.test(ENTRY)) {
  throw new Error("Entry gate failed: entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);
