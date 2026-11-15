import Image from "next/image";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";

function hostLabel(url: string) {
  return new URL(url).host;
}

function ProjectCard({ project }: { project: Project }) {
  const { name, folder, description, stack, url, host, repo } = project;

  return (
    <article className="flex flex-col rounded-xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
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
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-black/10 px-2 py-0.5 text-xs dark:border-white/15"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-4 text-sm">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 font-medium text-background hover:opacity-85"
          >
            Open {hostLabel(url)} ↗
          </a>
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
    </article>
  );
}

export default function Home() {
  const deployed = projects.filter((p) => p.url).length;

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
    </main>
  );
}
