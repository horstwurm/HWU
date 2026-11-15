import { gitTotals } from "@/data/gitStats";
import { projects } from "@/data/projects";

// Commit and code figures come from src/data/git-stats.json (npm run git-stats).
// The texts below are written by hand as of 2026-11-15.
const totals = gitTotals();
const stats = [
  {
    value: String(projects.filter((p) => p.deployments.length > 0).length),
    label: "apps live on Vercel",
  },
  {
    value: `~${Math.round(totals.codeLines / 1000)}k`,
    label: "lines of code",
  },
  {
    value: `${totals.claudeCommits} / ${totals.commits}`,
    label: "commits co-authored by Claude",
  },
  { value: "4 days", label: "from first commit to live (nexus EAM)" },
];

const advantages = [
  {
    title: "Idea to live app in days",
    text: "nexus EAM went from first commit to production in 4 days; nexusAd and TennisCounter each took about two weeks, including admin areas, invoices and statistics.",
  },
  {
    title: "Documentation that keeps up",
    text: "Every project has a CLAUDE.md (about 1,800 lines in total) that is updated with each change, so the next session, or the next person, knows exactly how things work.",
  },
  {
    title: "Solid engineering by default",
    text: "TypeScript throughout, input validation with Zod, linting, and automated tests where it matters (19 test files in nexusAd and TennisCounter).",
  },
  {
    title: "Reuse across projects",
    text: "Patterns that worked once are carried over: TennisCounter is modelled on nexusPPM, and nexusAd builds on TennisCounter's display and sponsor ideas.",
  },
  {
    title: "Focus on the business problem",
    text: "I describe what the users need; Claude does the boilerplate, refactoring and data migrations. Even the overview slide decks are generated from code.",
  },
  {
    title: "AI inside the product, too",
    text: "nexusAd drafts ad content and illustrations; nexusPPM and nexus EAM answer questions about portfolio and IT landscape in a chat. All through the Claude API, with usage limits and role-based access.",
  },
];

const stillMine = [
  "What to build and for whom",
  "Reviewing every change before it ships",
  "Testing with real users and data",
  "Privacy, security and hosting decisions",
];

export function BuiltWithAi() {
  return (
    <section className="mb-12" aria-labelledby="ai-heading">
      <h2
        id="ai-heading"
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        Built with AI
      </h2>
      <p className="mt-2 max-w-3xl leading-7 text-black/70 dark:text-white/70">
        All of these apps were developed together with Claude Code, an AI coding
        agent that reads the codebase, writes and changes code, runs tests and
        commits. I set direction and review the result; Claude does most of the
        typing.
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col-reverse rounded-xl border border-violet-500/20 bg-violet-500/5 p-4"
          >
            <dt className="mt-1 text-sm text-black/60 dark:text-white/60">
              {s.label}
            </dt>
            <dd className="text-2xl font-bold tracking-tight text-violet-700 dark:text-violet-300">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
        Advantages
      </h3>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((a, i) => (
          <li
            key={a.title}
            className="rounded-xl border border-black/10 p-5 dark:border-white/10 dark:bg-white/5"
          >
            <p className="flex items-baseline gap-2 font-semibold">
              <span className="font-mono text-xs text-violet-600 dark:text-violet-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {a.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
              {a.text}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-xl border border-dashed border-black/20 p-5 dark:border-white/20">
        <p className="font-semibold">What stays with me</p>
        <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-black/70 sm:grid-cols-2 dark:text-white/70">
          {stillMine.map((s) => (
            <li key={s} className="flex gap-2">
              <span
                aria-hidden
                className="text-violet-600 dark:text-violet-400"
              >
                →
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
