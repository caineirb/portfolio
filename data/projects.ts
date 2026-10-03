export type ProjectSection = "industry" | "personal" | "academic";

export type RepoType = "github" | "gitlab" | "bitbucket" | "other";

export type ProjectAvailability = "NDA" | "Visible";

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
  /** Visibility status: "NDA" for confidential client projects, "Visible" for public */
  availability: ProjectAvailability;
  /** Comprehensive project description */
  description: string;

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
  /**
   * Live deployment, demo, paper, or project website URL (if available).
   * Displayed as an action link in the card and modal.
   */
  projectUrl?: string;
  /** Technology stack tags (e.g. React, NestJS, YOLO, TypeScript) */
  technologies?: string[];
  /** Your roles in the project (e.g. ["Software Engineer", "Lead Developer"]) */
  role?: string[];
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
  "industry": {
    id: "industry",
    title: "Industry Work",
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

import {
  industryProjects,
  personalProjects,
  academicProjects,
} from "./projects-list";

/**
 * All projects data composed from modular lists in `./projects-list/`.
 * To add a new project, edit the corresponding file in `data/projects-list/`
 * (industry.ts, personal.ts, or academics.ts).
 */
export const PROJECTS: Project[] = [
  ...industryProjects,
  ...personalProjects,
  ...academicProjects,
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

/**
 * Helper to get candidate image paths for a project card and primary slide.
 * The backend route `/api/projects/[id]/image` automatically scans the filesystem
 * and serves the correct image and MIME type dynamically.
 */
export function getProjectCandidateImages(project: Project): string[] {
  return [
    `/api/projects/${project.id}/image`,
    "/projects/default-project.png",
  ];
}

/**
 * Helper to resolve fallback gallery images for a project modal slideshow.
 * Defaults to the primary resolved image from the backend.
 */
export function getProjectSlideshowImages(
  project: Project,
  mainResolvedImage?: string
): string[] {
  const primary =
    mainResolvedImage || `/api/projects/${project.id}/image`;
  return [primary];
}

