"use client";

import React, { useState, useMemo } from "react";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  SparklesIcon,
  CodeBracketIcon,
  FunnelIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import {
  PROJECTS,
  PROJECT_SECTIONS,
  ProjectSection,
  getAllCategories,
} from "@/data/projects";
import ProjectCard from "@/components/project-card";

const sectionIconMap: Record<ProjectSection, React.ElementType> = {
  "part-time": BriefcaseIcon,
  "personal": SparklesIcon,
  "academic": AcademicCapIcon,
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => getAllCategories(), []);
  const sections = useMemo(
    () => Object.values(PROJECT_SECTIONS).sort((a, b) => a.order - b.order),
    []
  );

  // Calculate matching projects per category for badge counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = PROJECTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [categories]);

  // Total projects matching current category filter
  const totalFilteredCount = useMemo(() => {
    return selectedCategory === "All"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category === selectedCategory).length;
  }, [selectedCategory]);

  return (
    <main className="min-h-full bg-slate-950 px-4 py-8 md:px-8 md:py-12 text-slate-100 overflow-y-auto">
      <div className="w-full space-y-10 md:space-y-12">
        {/* Header Hero Section */}
        <section className="relative overflow-hidden bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl transition-all hover:border-green-500/30">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 tracking-wide uppercase">
                <CodeBracketIcon className="w-4 h-4" />
                Projects Showcase
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-400">
                {totalFilteredCount} of {PROJECTS.length} Projects Displayed
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-emerald-600">
                Featured Projects & Systems
              </h1>
              <p className="text-slate-300 max-w-3xl mt-2 text-sm md:text-base leading-relaxed">
                A showcase of technical projects across part-time industry work, personal open-source software,
                and computer science academic research.
              </p>
            </div>

            {/* Category Filter Pills (Web Dev, ML, Backend, Algorithms, etc.) */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <FunnelIcon className="w-3.5 h-3.5 text-green-400" />
                <span>Filter by Category:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count = categoryCounts[cat] || 0;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all ${isActive
                        ? "bg-green-500 text-slate-950 font-semibold shadow-lg shadow-green-500/20 scale-[1.02]"
                        : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60"
                        }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isActive
                          ? "bg-slate-950 text-green-400"
                          : "bg-slate-900 text-slate-400 border border-slate-700/60"
                          }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Empty State if no projects in category */}
        {totalFilteredCount === 0 && (
          <div className="text-center py-16 px-6 bg-slate-900/30 rounded-3xl border border-slate-800">
            <FolderIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-200">
              No projects found in &ldquo;{selectedCategory}&rdquo;
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              There are currently no projects matching this category filter.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Dynamic Project Sections */}
        <div className="space-y-12 md:space-y-16">
          {sections.map((section) => {
            const sectionProjects = PROJECTS
              .filter((p) => p.section === section.id)
              .filter((p) => selectedCategory === "All" || p.category === selectedCategory);

            const SectionIcon = sectionIconMap[section.id] || CodeBracketIcon;

            if (sectionProjects.length === 0) return null;

            return (
              <section key={section.id} id={section.id} className="space-y-6 scroll-mt-6">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 shadow-sm shadow-green-500/5">
                      <SectionIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-100">
                          {section.title}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                          {sectionProjects.length}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto text-xs font-medium text-green-400/80 bg-green-500/5 border border-green-500/15 px-3 py-1 rounded-full">
                    {section.badge}
                  </span>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sectionProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}