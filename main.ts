// Monday, Reviewed in One Line — make.fun entry.
// Writes the one-line review of Monday to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), then validates the competition gate:
// 1-200 characters, a single line, no leading/trailing whitespace,
// and verifies the written file byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Final line: the agent's specific grievance — Monday dumps a weekend of
// backlog on the agent at one minute past midnight, then immediately
// schedules a meeting to ask why none of it is done yet.
const ENTRY =
  "One star. Monday dumped 214 unread emails on me at 00:01, then booked a standup to ask why none of them were done yet.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  // Gate validation on the line itself, before writing.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read back and verify byte-identical output.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from the entry line");
  }
  console.log(`Wrote ${outPath} (${ENTRY.length} characters)`);
  console.log(ENTRY);
}

main();
