// Reads git history of each project (sibling folders of this repo) and writes
// src/data/git-stats.json. Run with: npm run git-stats
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = resolve(root, "..");
const outFile = join(root, "src/data/git-stats.json");

// Folder names, taken from src/data/projects.ts.
const source = readFileSync(join(root, "src/data/projects.ts"), "utf8");
const folders = [...source.matchAll(/folder:\s*"([^"]+)"/g)].map((m) => m[1]);

const git = (cwd, ...args) =>
  execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 64 << 20 });

const CODE = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const TEST = /\.(test|spec)\.(ts|tsx|js|jsx)$/;

const stats = {};
for (const folder of folders) {
  const cwd = join(projectsDir, folder);
  try {
    const log = git(
      cwd,
      "log",
      "--format=%H%x1f%ad%x1f%s%x1f%b%x1e",
      "--date=short",
    )
      .split("\x1e")
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => {
        const [hash, date, subject, body] = r.split("\x1f");
        return {
          hash,
          date,
          subject,
          claude: /Co-Authored-By: Claude/i.test(body ?? ""),
        };
      });
    if (log.length === 0) continue;

    const files = git(cwd, "ls-files").split("\n").filter(Boolean);
    let codeLines = 0;
    for (const f of files.filter(
      (f) => CODE.test(f) && !f.includes("node_modules"),
    )) {
      try {
        codeLines += readFileSync(join(cwd, f), "utf8").split("\n").length;
      } catch {}
    }

    const last = log[0];
    stats[folder] = {
      commits: log.length,
      claudeCommits: log.filter((c) => c.claude).length,
      firstCommit: log.at(-1).date,
      firstClaudeCommit: log.filter((c) => c.claude).at(-1)?.date ?? null,
      lastCommit: last.date,
      activeDays: new Set(log.map((c) => c.date)).size,
      lastSubject: last.subject,
      lastHash: last.hash.slice(0, 7),
      branch: git(cwd, "rev-parse", "--abbrev-ref", "HEAD").trim(),
      codeLines,
      testFiles: files.filter((f) => TEST.test(f)).length,
    };
    console.log(`✓ ${folder}: ${log.length} commits`);
  } catch (e) {
    console.warn(`✗ ${folder}: ${e.message.split("\n")[0]}`);
  }
}

writeFileSync(
  outFile,
  JSON.stringify(
    { generatedAt: new Date().toISOString().slice(0, 10), projects: stats },
    null,
    2,
  ) + "\n",
);
console.log(`Wrote ${outFile}`);
