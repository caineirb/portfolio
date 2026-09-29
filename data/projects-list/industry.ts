import type { Project } from "../projects";

export const industryProjects: Project[] = [
  {
    id: "enterprise-inventory-saas",
    name: "Enterprise Inventory Management SaaS",
    section: "industry",
    category: "Web Dev",
    availability: "NDA",
    role: ["Software Engineer"],
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
    section: "industry",
    category: "Machine Learning",
    availability: "NDA",
    role: ["Software Engineer Intern"],
    period: "Jun 2025 - Jul 2025",
    description:
      "Developed a real-time object detection and video processing platform integrating YOLO models with live camera feeds. Built high-throughput video frame processing pipelines and responsive UI dashboards for automated facility monitoring and event logging.",
    notes:
      "Developed for internal client security infrastructure under NDA. Custom model weights and live camera feed endpoints are omitted for confidentiality; architecture overview and video demonstration available upon request.",
    repoType: "github",
    technologies: ["React", "Node.js", "NestJS", "PostgreSQL", "YOLO", "Python", "OpenCV"],
    featured: true,
  },
];
