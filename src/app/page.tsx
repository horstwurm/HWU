import Image from "next/image";
import { BuiltWithAi } from "@/components/BuiltWithAi";
import { Services } from "@/components/Services";
import { GitPanel } from "@/components/GitPanel";
import { formatDate, gitStatsDate, gitStatsFor } from "@/data/gitStats";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";

function hostLabel(url: string) {
  return new URL(url).host;
}

function ProjectCard({ project }: { project: Project }) {
  const {
    name,
    folder,
    description,
    stack,
    ai,
    deployments,
    host,
    repo,
    image,
  } = project;
  const primaryUrl = deployments[0]?.url;
  const git = gitStatsFor(folder);

  const screenshot = image && (
    <Image
      src={image}
      alt={`Homepage of ${name}`}
      width={1280}
      height={800}
      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
      className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
    />
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
      {screenshot && (
        <div className="overflow-hidden border-b border-black/10 dark:border-white/10">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden
            >
              {screenshot}
            </a>
          ) : (
            screenshot
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">{name}</h2>
          {host && (
            <span className="shrink-0 rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium dark:bg-white/10">
              {host}
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-black/50 dark:text-white/50">
          ClaudeProjects/{folder}
        </p>
        <p className="mt-3 flex-1 text-sm leading-6 text-black/70 dark:text-white/70">
          {description}
        </p>
        {ai?.map((f) => (
          <div
            key={f.name}
            className="mt-4 rounded-lg border border-violet-500/25 bg-violet-500/5 p-3 text-sm"
          >
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
              <span aria-hidden>✦</span>
              {f.name}
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">
                {f.model}
              </span>
            </p>
            <p className="mt-1 leading-5 text-black/70 dark:text-white/70">
              {f.description}
            </p>
          </div>
        ))}
        <h3 className="mt-4 text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
          Tech stack
        </h3>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <li
              key={s}
              className={
                s === "Claude API"
                  ? "rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-xs text-violet-700 dark:text-violet-300"
                  : "rounded-md border border-black/10 px-2 py-0.5 text-xs dark:border-white/15"
              }
            >
              {s}
            </li>
          ))}
        </ul>
        {git && <GitPanel stats={git} repo={repo} />}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {deployments.length > 0 ? (
            deployments.map(({ label, url }, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={hostLabel(url)}
                className={
                  i === 0
                    ? "inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 font-medium text-background hover:opacity-85"
                    : "inline-flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                }
              >
                {label ? `Open ${label}` : `Open ${hostLabel(url)}`} ↗
              </a>
            ))
          ) : (
            <span className="rounded-lg border border-dashed border-black/20 px-3 py-1.5 text-black/50 dark:border-white/20 dark:text-white/50">
              Not deployed
            </span>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 underline-offset-4 hover:underline dark:text-white/60"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const deployed = projects.filter((p) => p.deployments.length > 0).length;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <section className="mb-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          width={96}
          height={96}
          priority
          className="rounded-full border border-black/10 dark:border-white/15"
        />
        <div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="font-mono text-sm text-black/50 dark:text-white/50">
            @{profile.handle}
          </p>
          <p className="mt-2 text-black/70 dark:text-white/70">
            {profile.tagline}
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My Claude Projects
        </h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          {projects.length} projects · {deployed} live
        </p>
      </header>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.folder} project={p} />
        ))}
      </section>
      <p className="mt-4 text-xs text-black/50 dark:text-white/50">
        Git figures as of {formatDate(gitStatsDate)}. Refresh with{" "}
        <code className="font-mono">npm run git-stats</code>.
      </p>

      <div className="mt-16">
        <BuiltWithAi />
      </div>

      <div className="mt-16">
        <Services />
      </div>
    </main>
  );
}
