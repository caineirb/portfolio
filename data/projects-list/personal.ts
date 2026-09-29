import type { Project } from "../projects";

export const personalProjects: Project[] = [
  {
    id: "interactive-terminal-portfolio",
    name: "Interactive Terminal & GUI Portfolio",
    section: "personal",
    category: "Web Dev",
    availability: "Visible",
    role: ["Creator", "Full-Stack Developer"],
    period: "2025 - Present",
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
  {
    id: "async-task-rest-service",
    name: "Asynchronous REST & Task Engine",
    section: "personal",
    category: "Backend",
    availability: "Visible",
    role: ["Backend Developer"],
    period: "2024 - 2025",
    description:
      "High-throughput asynchronous REST API service architected with FastAPI and PostgreSQL. Implements background job queues, distributed token-based authentication (JWT), caching layers, and containerized Docker environments.",
    notes:
      "Built as an open-source template for microservice architectures adhering to clean architecture and automated CI/CD testing pipelines.",
    repoUrl: "https://github.com/caineirb",
    repoType: "github",
    technologies: ["FastAPI", "Python", "PostgreSQL", "Docker", "Redis", "SQLAlchemy"],
    featured: false,
  },
];
