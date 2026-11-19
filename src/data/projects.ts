export type AiFeature = {
  /** Feature name as shown in the app. */
  name: string;
  /** Claude model the feature calls. */
  model: string;
  description: string;
};

export type Project = {
  name: string;
  folder: string;
  description: string;
  /** Tech stack, most important first. */
  stack: string[];
  /** Claude API features inside the app (all projects are built with Claude Code). */
  ai?: AiFeature[];
  /** Live deployments. Empty = not deployed. */
  deployments: { label?: string; url: string }[];
  host?: "Vercel" | "Heroku";
  repo?: string;
  /** Homepage screenshot in public/ (regenerate with `npm run screenshots`). */
  image?: string;
};

// Edit this list to add projects or fill in missing URLs.
export const projects: Project[] = [
  {
    name: "nexus EAM",
    folder: "EAM",
    image: "/screenshots/nexus-eam.png",
    description:
      "Lightweight enterprise architecture management: business capabilities, applications, interfaces and data.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Mongoose",
      "Claude API",
      "React Flow",
      "Zod",
      "Word/PowerPoint export",
    ],
    ai: [
      {
        name: "AI Assistant",
        model: "Claude Sonnet 5.5",
        description:
          "Chat panel that answers questions about the IT landscape with read-only skills: impact analysis, dependencies, costs, changes and data quality.",
      },
    ],
    deployments: [{ url: "https://nexus-eam.vercel.app" }],
    host: "Vercel",
    repo: "https://github.com/horstwurm/nexusEAM",
  },
  {
    name: "nexusAd",
    folder: "nexusAd",
    image: "/screenshots/nexus-ad.png",
    description:
      "Shows Marketing Partner content on Display Partner screens, with contracts, approval, statistics and Swiss QR bill invoices.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB Atlas",
      "Claude API",
      "Leaflet maps",
      "sharp",
      "Zod",
      "Vitest",
      "Brevo e-mail",
    ],
    ai: [
      {
        name: "KI-Vorschläge",
        model: "Claude Opus 5.5",
        description:
          "Drafts titles, texts and vouchers for ad content from a short description, plus SVG illustrations to pick from.",
      },
    ],
    deployments: [{ url: "https://nexus-ad.vercel.app" }],
    host: "Vercel",
    repo: "https://github.com/horstwurm/nexusAd",
  },
  {
    name: "TennisCounter",
    folder: "Tennis",
    image: "/screenshots/tennis.png",
    description:
      "Mobile web app for keeping score in tennis matches, with court displays and a club admin area.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB Atlas",
      "Zod",
      "QR codes",
      "M5Stack remote (Arduino)",
      "Vitest",
      "Brevo e-mail",
    ],
    deployments: [{ url: "https://tennis-counter-six.vercel.app" }],
    host: "Vercel",
    repo: "https://github.com/horstwurm/tennisCounter",
  },
  {
    name: "nexusPPM",
    folder: "myapp",
    image: "/screenshots/nexus-ppm.png",
    description:
      "Project portfolio planning and tracking: costs, investments, skills, capacity planning and portfolio analytics.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Mongoose",
      "Claude API",
      "JWT auth",
      "Vercel Blob",
      "Excel/Word/PowerPoint export",
      "Brevo e-mail",
    ],
    ai: [
      {
        name: "KI-Assistent",
        model: "Claude Sonnet 5",
        description:
          "Chat panel that answers questions about the portfolio using tools over live project data, limited to what the user's role may see.",
      },
    ],
    deployments: [
      { label: "Production", url: "https://myapp-ochre-nu.vercel.app" },
      { label: "Demo", url: "https://nexusppm-demo.vercel.app" },
    ],
    host: "Vercel",
    repo: "https://github.com/horstwurm/roadmap-management",
  },
  {
    name: "IOTeasy",
    folder: "iot",
    image: "/screenshots/iot.png",
    description:
      "Pick an ESP32 sensor or actuator from a catalog, get generated Arduino code, connect the device and watch its values on dashboards, with e-mail alerts.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Chart.js",
      "Zod",
      "ESP32 / Arduino code generation",
      "Vitest",
      "Resend e-mail",
    ],
    deployments: [{ url: "https://nexus-iot-neon.vercel.app" }],
    host: "Vercel",
    repo: "https://github.com/horstwurm/ioteasy",
  },
];
