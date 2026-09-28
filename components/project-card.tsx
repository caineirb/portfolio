"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGitlab, FaBitbucket, FaGitAlt } from "react-icons/fa";
import { Project, RepoType, detectRepoType } from "@/data/projects";

function renderRepoIcon(type: RepoType) {
  switch (type) {
    case "github":
      return <FaGithub className="w-3.5 h-3.5" />;
    case "gitlab":
      return <FaGitlab className="w-3.5 h-3.5 text-orange-400" />;
    case "bitbucket":
      return <FaBitbucket className="w-3.5 h-3.5 text-blue-400" />;
    default:
      return <FaGitAlt className="w-3.5 h-3.5 text-green-400" />;
  }
}

function getRepoDefaultLabel(type: RepoType) {
  switch (type) {
    case "github":
      return "GitHub";
    case "gitlab":
      return "GitLab";
    case "bitbucket":
      return "Bitbucket";
    default:
      return "Repository";
  }
}

// Category color accents
const categoryColorMap: Record<string, string> = {
  "Web Dev": "text-blue-400 bg-blue-500/10 border-blue-500/30",
  "ML": "text-purple-400 bg-purple-500/10 border-purple-500/30",
  "Backend": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Algorithms": "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "Systems": "text-teal-400 bg-teal-500/10 border-teal-500/30",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const repoType = project.repoType || detectRepoType(project.repoUrl);

  const candidateImages = [
    project.image || `/projects/${project.id}.png`,
    `/projects/${project.id}.jpg`,
    `/projects/${project.id}.jpeg`,
    "/projects/default-project.png",
    "/projects/default-project.jpg",
    "/projects/default-project.jpeg",
  ];

  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    if (imageIndex < candidateImages.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  const isNdaRestricted = Boolean(
    project.notes &&
      (project.notes.toLowerCase().includes("nda") ||
        project.notes.toLowerCase().includes("confidential") ||
        project.notes.toLowerCase().includes("proprietary"))
  );

  const categoryBadgeClass =
    categoryColorMap[project.category] ||
    "text-green-400 bg-green-500/10 border-green-500/30";

  return (
    <article className="group relative flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-green-500/40 shadow-lg transition-all duration-300">
      <div className="space-y-3">
        {/* Project Image Section */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 group-hover:border-slate-700/80 transition-colors">
          <Image
            src={candidateImages[imageIndex]}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
            priority={false}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Badges on Image Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold backdrop-blur-md border shadow-md ${categoryBadgeClass}`}
            >
              <TagIcon className="w-3 h-3" />
              {project.category}
            </span>

            {/* Featured / NDA status */}
            <div className="flex items-center gap-1">
              {project.featured && (
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-green-500/20 text-green-300 border border-green-500/40 backdrop-blur-md shadow-md">
                  Featured
                </span>
              )}
              {isNdaRestricted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-md">
                  <LockClosedIcon className="w-2.5 h-2.5" />
                  NDA
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Top Meta: Timeline & Role */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-slate-400">
          {project.period && (
            <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/50 text-[11px]">
              <CalendarIcon className="w-3 h-3 text-green-500" />
              {project.period}
            </span>
          )}
          {project.role && (
            <span className="text-slate-400 font-medium text-[11px]">
              {project.role}
            </span>
          )}
        </div>

        {/* Project Title */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-green-400 transition-colors leading-snug">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Notes / NDA Callout Section */}
        {project.notes && (
          <div
            className={`rounded-xl p-3 text-xs border transition-all ${
              isNdaRestricted
                ? "bg-slate-950/70 border-amber-500/20 text-slate-300"
                : "bg-slate-950/50 border-slate-800/80 text-slate-300"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 font-semibold text-[11px] uppercase tracking-wider">
              {isNdaRestricted ? (
                <>
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Confidentiality (NDA)</span>
                </>
              ) : (
                <>
                  <InformationCircleIcon className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Project Notes</span>
                </>
              )}
            </div>
            <p className="text-slate-400 leading-relaxed italic text-[11px]">
              {project.notes}
            </p>
          </div>
        )}

        {/* Technologies Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="pt-0.5">
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-slate-800/70 text-slate-300 hover:text-green-400 hover:border-green-500/30 rounded-md text-[11px] font-medium border border-slate-700/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Actions: Repo and Live Links */}
      <div className="pt-3.5 mt-3.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 font-medium text-xs transition-colors shadow-sm"
            >
              {renderRepoIcon(repoType)}
              <span>{project.repoLabel || getRepoDefaultLabel(repoType)}</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-500 text-xs font-medium cursor-not-allowed">
              <LockClosedIcon className="w-3 h-3 text-slate-500" />
              Private
            </span>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500 text-slate-950 hover:bg-green-400 font-semibold text-xs transition-colors shadow-md shadow-green-500/20"
            >
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              Preview
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
