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
  {
    id: "paywolf",
    name: "Paywolf: BUFICOM Collection System",
    section: "personal",
    category: "Web Development",
    availability: "Visible",
    role: ["Sole Developer", "Full-Stack Engineer", "Database Architect"],
    period: "2024 - 2025",
    description:
      "Engineered and deployed a full-stack **financial collection and payment tracking system** for the MSU-IIT College of Computer Studies Executive Council Budget and Finance Committee (BUFICOM), serving students across 4 academic programs (`BSCS`, `BSCA`, `BSIT`, `BSIS`). Connected a responsive `React 18 / Vite` Single-Page Application (SPA) with a `Flask / Python 3` REST API backend backed by a normalized `MySQL` relational database across **5 domain blueprints** (`Dashboard`, `StudentRecords`, `PaymentRecords`, `VerifyPayments`, `TransactionHistory`). The frontend leverages `Chart.js` and `react-chartjs-2` for real-time visual collection metrics and progress tracking, `React Router v7` for view management, and client-side canvas/document utilities for automated **PDF receipt generation**. The backend implements a **modular monolith** with **Flask Blueprints**, **Flask-CORS** middleware, and a **pandas & openpyxl batch ingestion pipeline** for parsing and validating student master lists from multi-format Excel (`.xlsx`) and CSV files. The database schema strictly enforces referential integrity through **composite primary and foreign keys**, cascading updates, unique constraints, and `ENUM` status controls across organizations, academic year contributions, student profiles, and multi-mode payment transactions (`Cash`, `GCash`). Designed a **multi-stage verification workflow** transitioning pending representative deposits to verified ledger entries, complete with real-time cashiering, balance tracking, and audit-logged transaction histories.",
    notes:
      "Personal project engineered for the CCS Executive Council Budget and Finance Committee (BUFICOM) at MSU-IIT to eliminate manual paper ledgers and streamline semester contribution collections. Sole developer responsible for end-to-end architecture, frontend SPA design, RESTful API implementation, and relational database schema modeling.",
    repoUrl: "https://github.com/caineirb/paywolf",
    repoType: "github",
    technologies: [
      "React 18",
      "Vite",
      "HTML5",
      "Python 3.10+",
      "Flask",
      "Pipenv",
      "MySQL 8.0+",
      "MariaDB",
      "PDF Receipt Generation",
      "Audit Trail & Ledger",
    ],
    featured: true,
  },
];
