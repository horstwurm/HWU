export type Project = {
  name: string;
  folder: string;
  description: string;
  stack: string[];
  /** Live deployment URL. null = not deployed (or URL not known yet). */
  url: string | null;
  host?: "Vercel" | "Heroku";
  repo?: string;
};

// Edit this list to add projects or fill in missing URLs.
export const projects: Project[] = [
  {
    name: "nexus EAM",
    folder: "EAM",
    description:
      "Lightweight enterprise architecture management: business capabilities, applications, interfaces and data.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    url: "https://nexus-eam.vercel.app",
    host: "Vercel",
    repo: "https://github.com/horstwurm/nexusEAM",
  },
  {
    name: "nexusAd",
    folder: "nexusAd",
    description:
      "Shows Marketing Partner content on Display Partner screens, with contracts, approval, statistics and Swiss QR bill invoices.",
    stack: ["Next.js", "TypeScript"],
    url: "https://nexus-ad.vercel.app",
    host: "Vercel",
    repo: "https://github.com/horstwurm/nexusAd",
  },
  {
    name: "TennisCounter",
    folder: "Tennis",
    description:
      "Mobile web app for keeping score in tennis matches, with court displays and a club admin area.",
    stack: ["Next.js 16", "React 19", "MongoDB"],
    url: "https://tennis-counter-six.vercel.app",
    host: "Vercel",
    repo: "https://github.com/horstwurm/tennisCounter",
  },
  {
    name: "nexusPPM",
    folder: "myapp",
    description:
      "Project portfolio planning and tracking: costs, investments, skills, capacity planning and portfolio analytics.",
    stack: ["Next.js 14", "MongoDB", "JWT auth"],
    url: "https://nexusppm-demo.vercel.app",
    host: "Vercel",
    repo: "https://github.com/horstwurm/roadmap-management",
  },
];
