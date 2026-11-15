import { projects } from "@/data/projects";

type Service = {
  name: string;
  href: string;
  purpose: string;
  /** Stack entry that marks a project as using this service; omit for all. */
  stackKey?: string;
};

const services: Service[] = [
  {
    name: "Vercel",
    href: "https://vercel.com",
    purpose: "Hosting and deployments",
  },
  {
    name: "GitHub",
    href: "https://github.com/horstwurm",
    purpose: "Source code and history",
  },
  {
    name: "MongoDB Atlas",
    href: "https://cloud.mongodb.com",
    purpose: "Databases",
    stackKey: "MongoDB Atlas",
  },
  {
    name: "Brevo",
    href: "https://app.brevo.com",
    purpose: "Transactional e-mail (SMTP)",
    stackKey: "Brevo e-mail",
  },
  {
    name: "Claude Developer Platform",
    href: "https://platform.claude.com",
    purpose: "Claude API keys, usage and costs",
    stackKey: "Claude API",
  },
];

function usedBy(s: Service) {
  return projects
    .filter((p) => !s.stackKey || p.stack.includes(s.stackKey))
    .map((p) => p.name);
}

export function Services() {
  return (
    <section aria-labelledby="services-heading">
      <h2
        id="services-heading"
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        Services
      </h2>
      <p className="mt-2 text-black/60 dark:text-white/60">
        The platforms behind the projects.
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const users = usedBy(s);
          return (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-xl border border-black/10 p-5 transition hover:border-black/25 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
              >
                <span className="flex items-center justify-between gap-2 font-semibold">
                  {s.name}
                  <span
                    aria-hidden
                    className="text-black/40 dark:text-white/40"
                  >
                    ↗
                  </span>
                </span>
                <span className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {s.purpose}
                </span>
                <span className="mt-3 text-xs text-black/50 dark:text-white/50">
                  {users.length === projects.length
                    ? "All projects"
                    : users.join(" · ")}
                </span>
                <span className="mt-1 truncate font-mono text-xs text-black/40 dark:text-white/40">
                  {new URL(s.href).host}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
