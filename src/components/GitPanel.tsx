import { formatDate, formatLines, type GitStats } from "@/data/gitStats";

export function GitPanel({ stats, repo }: { stats: GitStats; repo?: string }) {
  const share = Math.round((stats.claudeCommits / stats.commits) * 100);
  const sameDay = stats.firstCommit === stats.lastCommit;

  const label =
    "text-[11px] font-medium uppercase tracking-wide text-black/50 dark:text-white/50";

  return (
    <div className="mt-4 rounded-lg border border-black/10 p-3 text-sm dark:border-white/10">
      <div className="flex items-center justify-between gap-2">
        <h3 className={label}>Git</h3>
        <span className="font-mono text-xs text-black/50 dark:text-white/50">
          {stats.branch}
        </span>
      </div>

      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <dt className={label}>Commits</dt>
          <dd className="mt-0.5 font-semibold">
            {stats.commits}
            <span className="font-normal text-black/60 dark:text-white/60">
              {" "}
              · {stats.claudeCommits} with Claude
            </span>
          </dd>
          <dd
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
            role="img"
            aria-label={`${share}% of commits co-authored by Claude`}
          >
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${share}%` }}
            />
          </dd>
        </div>
        <div>
          <dt className={label}>Active days</dt>
          <dd className="mt-0.5 font-semibold">{stats.activeDays}</dd>
        </div>
        <div>
          <dt className={label}>Code</dt>
          <dd className="mt-0.5 font-semibold">
            {formatLines(stats.codeLines)}
            <span className="font-normal text-black/60 dark:text-white/60">
              {" "}
              lines
            </span>
          </dd>
        </div>
        <div>
          <dt className={label}>Tests</dt>
          <dd className="mt-0.5 font-semibold">
            {stats.testFiles}
            <span className="font-normal text-black/60 dark:text-white/60">
              {" "}
              {stats.testFiles === 1 ? "file" : "files"}
            </span>
          </dd>
        </div>
        <div className="col-span-2">
          <dt className={label}>Timeline</dt>
          <dd className="mt-0.5 text-black/80 dark:text-white/80">
            {sameDay
              ? formatDate(stats.firstCommit)
              : `${formatDate(stats.firstCommit)} → ${formatDate(stats.lastCommit)}`}
          </dd>
          {stats.firstClaudeCommit &&
            stats.firstClaudeCommit !== stats.firstCommit && (
              <dd className="text-xs text-violet-700 dark:text-violet-300">
                With Claude since {formatDate(stats.firstClaudeCommit)}
              </dd>
            )}
        </div>
        <div className="col-span-2">
          <dt className={label}>Last commit</dt>
          <dd className="mt-0.5 flex min-w-0 items-baseline gap-2">
            {repo ? (
              <a
                href={`${repo}/commits`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-mono text-xs text-violet-700 underline-offset-2 hover:underline dark:text-violet-300"
                title="Commit history on GitHub"
              >
                {stats.lastHash}
              </a>
            ) : (
              <span className="shrink-0 font-mono text-xs">
                {stats.lastHash}
              </span>
            )}
            <span
              className="truncate text-black/80 dark:text-white/80"
              title={stats.lastSubject}
            >
              {stats.lastSubject}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
