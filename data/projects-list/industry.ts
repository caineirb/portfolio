import type { Project } from "../projects";

export const industryProjects: Project[] = [
  {
    id: "pedros-roving-market-saas",
    name: "Pedro's Roving Market",
    section: "industry",
    category: "Web Development",
    availability: "NDA",
    role: ["Software Engineer", "System Architect"],
    period: "Oct 2025 - Jul 2026",
    description:
      "Engineered and maintained a comprehensive multi-platform delivery platform **(3 client apps, 400+ `React Native/Next.js` screens)** backed by a Supabase PostgreSQL database with **47 migrations**, **197 server-side functions and triggers**, and **78 Row-Level Security policies**. Built real-time order management with live **Supabase Realtime subscriptions** across customer, rider, and store interfaces, an inventory management system with automated **low-stock alerts**, **physical stock counting**, and **variance reporting**, rider dispatch with **availability-aware matching**, **offline-first POS** with **client-side cart persistence** and **server-side sync reconciliation**, and a **staff management system** with audit-trail logging across 13 service modules. The **monorepo** houses a shared type-safe **API layer** (`@pedro/api`) with **13 domain modules** and **Zod-validated types** (`@pedro/types`), enforcing consistent data contracts across all client platforms.",
    notes:
      "Enterprise client codebase protected under strict Non-Disclosure Agreement (NDA). Repository links, database schemas, and proprietary company workflows are strictly confidential.",
    repoType: "github",
    technologies: ["React Native", "Expo", "Next.js", "TypeScript", "Supabase", "PostgreSQL", "React", "Zod", "Tailwind CSS", "EAS Build"],
    featured: true,
  },
  {
    id: "icarus",
    name: "Icarus",
    section: "industry",
    category: "Web Development",
    availability: "NDA",
    role: ["Backend Engineer", "Network Admin", "System Architect"],
    period: "Jun 2025 - Sep 2025",
    description:
      "Architected and built a full-stack **AI-driven video analytics** platform for real-time crime detection and surveillance, connecting a `Next.js 15 / React 19` frontend with a `NestJS 11` backend via `Socket.io WebSockets` across **4 real-time channels** (`camera feed`, `face detection`, `color detection`, `ANPR`). The backend bridges `WebSocket` streams from `DVR/VR cameras` through **Python AI microservices** — `DeepFace (Facenet512)` for face embeddings, `pgvector` for cosine-similarity vector search, and `ONVIF` for camera network discovery — while the frontend renders live video streams, 3D globe visualizations via `React Three Fiber`, and real-time detection overlays. The codebase spans **10 NestJS modules** (`Auth`, `Users`, `Tags`, `Recognition`, `Cameras`, `ANPR`, `ColorDetection`, `FaceDetection`, `FileControl`, `Database`), a `PostgreSQL schema` with vector extensions, **JWT auth** with `bcrypt`, `Docker Compose` multi-container orchestration, and a `Next.js 15` frontend with **10 route pages**, **65+ UI components**, **Tailwind CSS**, **MUI**, and **Socket.io-client**.",
    notes:
      "Enterprise codebase protected under strict Non-Disclosure Agreement (NDA). Repository links, database schemas, and proprietary company workflows are strictly confidential.",
    repoType: "github",
    technologies: [
      "Next.js 15", "React 19", "TypeScript", "NestJS 11",
      "Socket.io", "WebSocket", "PostgreSQL", "pgvector",
      "DeepFace", "Facenet512", "ONVIF", "Docker", "Tailwind CSS",
      "MUI", "React Three Fiber", "Three.js", "Framer Motion", "@dnd-kit"
    ],
    featured: true,
  },

];
