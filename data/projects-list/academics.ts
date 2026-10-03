import type { Project } from "../projects";

export const academicProjects: Project[] = [
  {
    id: "csc173-deep-computer-vision",
    name: "CSC173: Deep Computer Vision for Intelligent Indoor Temperature Management",
    section: "academic",
    category: "Computer Vision",
    availability: "Visible",
    role: ["Researcher", "AI Developer"],
    period: "2025",
    description:
      "Developed a **real-time computer vision framework for occupant monitoring** to support smarter HVAC control and energy-efficient building operation. The system combines **YOLO11n for multi-person detection, ResNet-18 for sitting/standing posture recognition, and ResNet-50 for light/medium/heavy clothing classification**. Trained on a custom indoor dataset, the pipeline demonstrated reliable detection and classification in **crowded scenes with partial occlusion and varying occupant scales**, while maintaining low computational overhead for continuous monitoring. The resulting system provides real-time occupant behavior data that can support **occupant-centric HVAC control and thermal comfort optimization**.",
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Coursework and final project for CSC173 Intelligent Systems.",
    repoUrl: "https://github.com/caineirb/CSC173-DeepCV-Bautista",
    repoType: "github",
    projectUrl: "https://caineirb.github.io/CSC173-DeepCV-Bautista/",
    technologies: ["Python", "Computer Vision", "Deep Learning", "Algorithms", "PyTorch", "YOLO", "ResNet"],
    featured: true,
  },
  {
    id: "csc172-educational-data-mining",
    name: "CSC172: Educational Data Mining: Student Learning Behavior Analysis using Apriori Algorithm for the EDM Cup 2023 Dataset",
    section: "academic",
    category: "Machine Learning",
    availability: "Visible",
    role: ["Algorithm Developer", "Data Analyst", "Researcher"],
    period: "2025",
    description:
      "Analyzed **16.25M student activity logs and 5.14M problem attempts** using the **Apriori algorithm** to uncover associations between problem-solving, help-seeking behaviors, and academic performance. Results showed that students with **high completion rates, fewer wrong attempts, and low help-seeking** were strongly associated with higher unit test scores (**lift = 3.26**), while **help-first strategies without prior attempts** were associated with lower performance. The findings demonstrate how educational data mining can reveal actionable patterns in student learning behavior.",
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Coursework and final project for CSC172 Data Mining and Analysis.",
    repoUrl: "https://github.com/caineirb/CSC172-AssociationMining-Bautista",
    repoType: "github",
    projectUrl: "https://caineirb.github.io/CSC172-AssociationMining-Bautista/",
    technologies: ["Python", "Algorithms", "Data Structures", "Apriori", "Association Rule Mining"],
    featured: true,
  },
  {
    id: "csc153-abstract-machine-simulation",
    name: "CSC153: Abstract Machine Simulation in Python",
    section: "academic",
    category: "Programming Languages",
    availability: "Visible",
    role: ["System Architect", "Programmer"],
    period: "2026",
    description:
      "This project implements an abstract machine with a stack, memory, and support for arithmetic, logical, comparison, and control flow operations. Programs are written in a custom assembly language with semicolon-separated instructions.",
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Coursework for CSC153 Assemblers, Interpreters, and Compilers.",
    repoUrl: "https://github.com/caineirb/Abstract-Machine-CSC153",
    repoType: "github",
    technologies: ["Python", "Custom ASM Language"],
    featured: false,
  },
  {
    id: "diy-person-re-identification",
    name: "DIY Person Re-Identification & Video Tracking System",
    section: "academic",
    category: "Computer Vision",
    availability: "Visible",
    role: ["Embedder Model Architect", "Lead Developer"],
    period: "2025",
    description:
      `This project implements a complete person re-identification (ReID) and video tracking system using deep learning. It combines:
        
        - **ResNet50-based person embedder** for feature extraction
        - **Transformer-based similarity model** for advanced person matching
        - **YOLOv8** for person detection
        - **Interactive video tracking application** with GUI
      
      The system can track specific persons across video frames using state-of-the-art deep learning techniques, making it suitable for surveillance, sports analytics, and crowd monitoring applications.`,
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Coursework and final project for CSC173 Intelligent Systems. Also presented during 8th COIL Education Program w/ Kyushu Sangyo University, Japan.",
    repoUrl: "https://github.com/caineirb/DIY_Embedder_Model",
    repoType: "github",
    technologies: ["Python", "OpenCV", "YOLO", "Deep Learning"],
    featured: true,
  },
  {
    id: "study-schedule-generator",
    name: "Study Schedule Generator using Hybrid PSO-SA Algorithm",
    section: "academic",
    category: "Artificial Intelligence",
    availability: "Visible",
    role: ["Researcher", "Algorithm Developer"],
    period: "2025",
    description:
      `A Python implementation of a Hybrid Particle Swarm Optimization and Simulated Annealing (PSO-SA) algorithm for generating optimized daily study schedules for students. The algorithm balances subject priorities, break times, and total available study hours to produce personalized, efficient study timetables.`,
    notes:
      "Undergraduate Computer Science academic project developed at Mindanao State University - Iligan Institute of Technology (MSU-IIT). Coursework and final project / term paper for CSC 171 Introduction to Artificial Intelligence.",
    repoUrl: "https://github.com/caineirb/Schedule-Generator",
    repoType: "github",
    technologies: ["Python", "OpenCV", "YOLO", "Deep Learning"],
    featured: false,
  },
];
