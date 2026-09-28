export type ProjectSection = "part-time" | "personal" | "academic";

export type RepoType = "github" | "gitlab" | "bitbucket" | "other";

export interface Project {
  /** Unique identifier for the project (also matches image name in public/projects) */
  id: string;
  /** Name/Title of the project */
  name: string;
  /** Project section grouping: acads, personal, or part-time */
  section: ProjectSection;
  /**
   * Technical domain category (e.g. "Web Dev", "ML", "Algorithms", "Backend", "Systems").
   * Used for filtering projects across sections.
   */
  category: string;
  /** Comprehensive project description */
  description: string;
  /**
   * Optional custom image path override.
   * If omitted, defaults to `/projects/${id}.png` (or .jpg/.jpeg)
   * and falls back to `/projects/default-project.png` (or .jpg/.jpeg).
   */
  image?: string;
  /**
   * Confidentiality notes, NDA limitations, architecture caveats,
   * or details explaining why certain source codes/data are restricted.
   */
  notes?: string;
  /** Direct link to the repository (GitHub, GitLab, Bitbucket, etc.) */
  repoUrl?: string;
  /** Provider type; auto-detected from repoUrl if left undefined */
  repoType?: RepoType;
  /** Custom label for the repository button (e.g. "GitLab", "Client Repo") */
  repoLabel?: string;
  /** Live deployment, demo, or project website URL (if available) */
  projectUrl?: string;
  /** Technology stack tags (e.g. React, NestJS, YOLO, TypeScript) */
  technologies?: string[];
  /** Your role in the project (e.g. "Software Engineer", "Lead Developer") */
  role?: string;
  /** Timeline or date range (e.g. "Jul 2025 - Jul 2026", "2024") */
  period?: string;
  /** Whether to highlight the project with a featured badge */
  featured?: boolean;
}

export interface ProjectSectionConfig {
  id: ProjectSection;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  order: number;
}

export const PROJECT_SECTIONS: Record<ProjectSection, ProjectSectionConfig> = {
  "part-time": {
    id: "part-time",
    title: "Part-Time & Industry Work",
    subtitle: "Enterprise systems, SaaS platforms, and client solutions",
    badge: "Professional Experience",
    description: "Production-grade applications and systems built during software engineering roles and internships.",
    order: 1,
  },
  "personal": {
    id: "personal",
    title: "Personal Projects",
    subtitle: "Tools, experiments, and developer utilities",
    badge: "Independent Projects",
    description: "Open-source software, side projects, and interactive applications built to explore modern technologies.",
    order: 2,
  },
  "academic": {
    id: "academic",
    title: "Academic Projects",
    subtitle: "Computer Science coursework, algorithms, and research",
    badge: "MSU-IIT Academics",
    description: "Theoretical computing, machine learning, and algorithmic applications developed during undergraduate studies.",
    order: 3,
  },
};

/**
 * All projects data.
 * To add a new project, simply append an object conforming to the Project interface.
 * The projects page will dynamically categorize, filter, and display it.
 */
export const PROJECTS: Project[] = [
  // ==========================================
  // PART-TIME & PROFESSIONAL WORK
  // ==========================================
  {
    id: "enterprise-inventory-saas",
    name: "Enterprise Inventory Management SaaS",
    section: "part-time",
    category: "Web Dev",
    role: "Software Engineer",
    period: "Jul 2025 - Jul 2026",
    description:
      "Engineered and maintained a scalable multi-tenant SaaS inventory platform tailored for enterprise clients. Implemented customized stock tracking workflows, automated replenishment notifications, role-based access management, and business analytics dashboards.",
    notes:
      "Enterprise client codebase protected under strict Non-Disclosure Agreement (NDA). Repository links, database schemas, and proprietary company workflows are strictly confidential.",
    repoUrl: "https://gitlab.com",
    repoType: "gitlab",
    repoLabel: "GitLab (Private NDA)",
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker", "Tailwind CSS", "REST API"],
    featured: true,
  },
  {
    id: "yolo-object-detection-system",
    name: "Real-Time Video Object Detection System",
    section: "part-time",
    category: "ML",
    role: "Software Engineer Intern",
    period: "Jun 2025 - Jul 2025",
    description:
      "Developed a real-time object detection and video processing platform integrating YOLO models with live camera feeds. Built high-throughput video frame processing pipelines and responsive UI dashboards for automated facility monitoring and event logging.",
    notes:
      "Developed for internal client security infrastructure under NDA. Custom model weights and live camera feed endpoints are omitted for confidentiality; architecture overview and video demonstration available upon request.",
    repoType: "github",
    technologies: ["React", "Node.js", "NestJS", "PostgreSQL", "YOLO", "Python", "OpenCV"],
    featured: true,
  },

  // ==========================================
  // PERSONAL PROJECTS
  // ==========================================
  {
    id: "interactive-terminal-portfolio",
    name: "Interactive Terminal & GUI Portfolio",
    section: "personal",
    category: "Web Dev",
    role: "Creator & Full-Stack Developer",
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
    role: "Backend Developer",
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

  // ==========================================
  // ACADEMIC PROJECTS (MSU-IIT)
  // ==========================================
  {
    id: "automata-theory-simulator",
    name: "Theoretical Computing & Automata Simulator",
    section: "academic",
    category: "Systems",
    role: "Undergraduate Researcher & Developer",
    period: "2024 - 2025",
    description:
      "Interactive visualizer and simulation suite for formal languages and automata theory. Supports Deterministic & Non-Deterministic Finite Automata (DFA/NFA), Pushdown Automata (PDA), and Turing Machines with real-time state transitions and string validation.",
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Used as an educational aid for theoretical computer science coursework.",
    repoUrl: "https://github.com/caineirb",
    repoType: "github",
    technologies: ["TypeScript", "React", "Python", "Algorithms", "Graph Theory", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "graph-pathfinding-benchmark",
    name: "Graph Traversal & Pathfinding Benchmark",
    section: "academic",
    category: "Algorithms",
    role: "Algorithm Developer",
    period: "2023 - 2024",
    description:
      "Comparative benchmarking and visualization suite evaluating shortest path and minimum spanning tree algorithms (Dijkstra, A* Search, Bellman-Ford, Prim's, Kruskal's) across dense, sparse, and randomized grid topologies.",
    notes:
      "Coursework project for Advanced Data Structures and Algorithms (CS 102). Highlights empirical time complexity comparisons and memory profiling.",
    repoUrl: "https://github.com/caineirb",
    repoType: "github",
    technologies: ["C++", "Python", "Algorithms", "Data Structures", "Performance Profiling"],
    featured: false,
  },
];

/**
 * Utility helper to get all unique categories from projects list
 */
export function getAllCategories(): string[] {
  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));
  return ["All", ...categories];
}

/**
 * Utility helper to filter projects by section
 */
export function getProjectsBySection(section: ProjectSection): Project[] {
  return PROJECTS.filter((project) => project.section === section);
}

/**
 * Utility helper to auto-detect repository provider from URL if not explicitly specified
 */
export function detectRepoType(url?: string): RepoType {
  if (!url) return "other";
  const lower = url.toLowerCase();
  if (lower.includes("github.com")) return "github";
  if (lower.includes("gitlab.com") || lower.includes("gitlab")) return "gitlab";
  if (lower.includes("bitbucket.org") || lower.includes("bitbucket")) return "bitbucket";
  return "other";
}
