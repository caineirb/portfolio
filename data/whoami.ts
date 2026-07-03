export type Bio = {
    name: string;
    image: string;
    position: string;
    location: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
    languages: string[];
};

export type Experience = {
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
};

export const BIO: Bio = {
    name: "Caine Ivan R. Bautista",
    image: "/profile.jpg",
    position: "Software Engineer",
    location: "Iligan City, Philippines",
    bio: "I'm a software engineer with experience in developing and maintaining software systems. I'm passionate about building scalable, high-performance, and user-friendly applications. I thrive on turning complex problems into elegant, maintainable code, specializing in modern web technologies.",
    email: "caine.bautista@gmail.com",
    github: "https://github.com/caineirb",
    linkedin: "https://www.linkedin.com/in/caineivanbautista",
    languages: ["English", "Filipino"],
};

export const SKILLS: Record<string, { skills: string[], config: { color: string } }> = {
    "Frontend": {
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        config: {
            color: "blue",
        }
    },
    "Backend": {
        skills: ["Node.js", "Express", "RestAPI", "NestJS", "FastAPI", "Flask"],
        config: {
            color: "green"
        }
    },
    "Database": {
        skills: ["MySQL", "PostgreSQL", "Supabase", "MongoDB", "SQLite"],
        config: {
            color: "purple"
        }
    },
    "Tools & DevOps": {
        skills: ["Docker", "Git", "Github", "CI/CD", "Linux"],
        config: {
            color: "red"
        }
    },
    "Programming Languages": {
        skills: ["Python", "Java", "C++", "C", "JavaScript", "HTML+CSS", "SQL", "TypeScript", "Rust"],
        config: {
            color: "yellow"
        }
    }
};

export const EXPERIENCE: Experience[] = [
    {
        role: "Software Engineer",
        company: "Anura Innovations Inc.",
        location: "Iligan City, Philippines",
        startDate: "Jan 2026",
        endDate: "Present",
        description: [
            "Develop and maintain scalable SaaS applications, including customization of inventory management systems for client-specific requirements.",
            "Implement new features, enhancements, and system integrations to support business workflows and improve usability.",
            "Diagnose and resolve production issues by delivering bug fixes and patches for enterprise-level client systems.",
            "Collaborate with cross-functional teams to ensure reliable deployments, code quality, and continuous system improvement.",
            "Participate in code reviews, technical discussions, and Agile development processes."
        ],
    },
    {
        role: "Software Engineer Intern",
        company: "Anura Innovations Inc.",
        location: "Iligan City, Philippines",
        startDate: "Jun 2025",
        endDate: "Jul 2025",
        description: [
            "Collaborated with a team to develop a full-stack web application using React, Node.js, NestJS, and PostgreSQL.",
            "Built a real-time object detection system using YOLO integrated with live camera streams for automated monitoring.",
            "Processed and optimized video frames to improve detection performance and responsiveness.",
            "Developed responsive UI components and integrated backend APIs for seamless data interaction.",
            "Worked in an Agile environment using Git, participating in code reviews and team collaboration."
        ],
    },
    {
        role: "Computer Science Student",
        company: "Mindanao State University - Iligan Institute of Technology",
        location: "Iligan City, Philippines",
        startDate: new Date("2022-08-22").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }),
        endDate: new Date("2026-07-28").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }),
        description: [
            "Bachelor of Science in Computer Science",
            "Magna Cum Laude",
            "Department of Science and Technology - RA 7687 Scholar",
            "Focuses on theorithecal and foundational knowledge of computing, with a strong emphasis on problem-solving, algorithm design, and data structures. The curriculum provides a solid grounding in mathematics and the principles of programming, preparing students for diverse roles in the tech industry."
        ],
    }
];