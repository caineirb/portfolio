import type { Project } from "../projects";

export const personalProjects: Project[] = [
  {
    id: "interactive-terminal-portfolio",
    name: "Interactive Terminal & GUI Portfolio",
    section: "personal",
    category: "Web Development",
    availability: "Visible",
    role: ["Creator", "Full-Stack Developer"],
    period: "Jul 2026 - Present",
    description:
      "A dual-interface developer portfolio blending an interactive Linux-style draggable/resizable command-line terminal with polished modern web pages. Features dynamic commands, window management, markdown blogging, and responsive layouts.",
    notes:
      "Fully open-source project. Designed to showcase modern web engineering capabilities, TypeScript architecture, and bespoke UI component design.",
    repoUrl: "https://github.com/caineirb/portfolio",
    repoType: "github",
    projectUrl: "https://github.com/caineirb/portfolio",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "MDX", "Heroicons"],
    featured: true,
  },
];
