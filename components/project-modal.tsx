"use client";

import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  TagIcon,
  XMarkIcon,
  UserIcon,
  CodeBracketIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGitlab, FaBitbucket, FaGitAlt } from "react-icons/fa";
import {
  Project,
  RepoType,
  detectRepoType,
  getProjectCandidateImages,
  getProjectSlideshowImages,
} from "@/data/projects";
import MarkdownText from "@/components/markdown-text";

function renderRepoIcon(type: RepoType) {
  switch (type) {
    case "github":
      return <FaGithub className="w-4 h-4" />;
    case "gitlab":
      return <FaGitlab className="w-4 h-4 text-orange-400" />;
    case "bitbucket":
      return <FaBitbucket className="w-4 h-4 text-blue-400" />;
    default:
      return <FaGitAlt className="w-4 h-4 text-green-400" />;
  }
}

function getRepoDefaultLabel(type: RepoType) {
  switch (type) {
    case "github":
      return "View on GitHub";
    case "gitlab":
      return "View on GitLab";
    case "bitbucket":
      return "View on Bitbucket";
    default:
      return "View Repository";
  }
}

const categoryColorMap: Record<string, string> = {
  "Web Dev": "text-blue-400 bg-blue-500/10 border-blue-500/30",
  "ML": "text-purple-400 bg-purple-500/10 border-purple-500/30",
  "Deep Learning": "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  "Machine Learning": "text-purple-400 bg-purple-500/10 border-purple-500/30",
  "Backend": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  "Algorithms": "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "Systems": "text-teal-400 bg-teal-500/10 border-teal-500/30",
};

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  primaryImage?: string;
}

// Module-level cache to store auto-discovered folder images during the session
const projectImagesCache = new Map<string, string[]>();

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  primaryImage,
}: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [discoveredImages, setDiscoveredImages] = useState<string[]>(() => {
    return projectImagesCache.get(project.id) || [];
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically discover all images from public/projects/[id]/ folder without needing manual config
  useEffect(() => {
    if (!isOpen || !project.id) return;

    const cached = projectImagesCache.get(project.id);
    if (cached && cached.length > 0) {
      setDiscoveredImages(cached);
      return;
    }

    let isSubscribed = true;
    fetch(`/api/projects/${encodeURIComponent(project.id)}/images`)
      .then((res) => (res.ok ? res.json() : { images: [] }))
      .then((data) => {
        if (
          isSubscribed &&
          Array.isArray(data.images) &&
          data.images.length > 0
        ) {
          projectImagesCache.set(project.id, data.images);
          setDiscoveredImages(data.images);
        }
      })
      .catch((err) => {
        console.warn(`Could not auto-fetch images for ${project.id}:`, err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [isOpen, project.id]);

  const candidateImages = useMemo(
    () => getProjectCandidateImages(project),
    [project]
  );

  const resolvedPrimary =
    primaryImage || candidateImages[candidateIndex] || candidateImages[0];

  const slides = useMemo(() => {
    // 1. If images were automatically fetched from the folder, use them!
    if (discoveredImages && discoveredImages.length > 0) {
      return discoveredImages;
    }
    // 2. Otherwise fall back to manually configured list or primary candidate
    return getProjectSlideshowImages(project, resolvedPrimary);
  }, [discoveredImages, project, resolvedPrimary]);

  // Reset to first slide whenever modal opens or project changes
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setCandidateIndex(0);
    }
  }, [isOpen, project.id]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, slides.length]);

  const activeImage = slides[currentSlide] || resolvedPrimary;
  const isVideo =
    typeof activeImage === "string" &&
    /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(activeImage);
  const isPdf =
    typeof activeImage === "string" &&
    /\.pdf(\?|#|$)/i.test(activeImage);
  const isNdaRestricted = project.availability === "NDA";

  const currentFilename = useMemo(() => {
    if (!activeImage) return "";
    try {
      const cleanUrl = activeImage.split("?")[0].split("#")[0];
      const name = cleanUrl.split("/").filter(Boolean).pop();
      return name ? decodeURIComponent(name) : "";
    } catch {
      return activeImage;
    }
  }, [activeImage]);

  if (!isOpen || !mounted) return null;

  const repoType = project.repoType || detectRepoType(project.repoUrl);

  const handleSlideError = () => {
    if (currentSlide === 0 && candidateIndex < candidateImages.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  const categoryBadgeClass =
    categoryColorMap[project.category] ||
    "text-green-400 bg-green-500/10 border-green-500/30";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
    >
      {/* Backdrop with click-to-close */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card (Wider: max-w-5xl) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-slate-950/90 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Floating Close Button in top right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container with Custom Scrollbar */}
        <div className="overflow-y-auto custom-scrollbar flex-1 overscroll-contain">
          {/* Hero Slideshow Banner Section */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] max-h-96 bg-slate-950 border-b border-slate-800 overflow-hidden select-none group">
            {isVideo ? (
              <video
                key={activeImage}
                src={activeImage}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : isPdf ? (
              <div key={activeImage} className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                <object
                  data={`${activeImage}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  type="application/pdf"
                  className="w-full h-full bg-slate-950"
                >
                  {/* Fallback card if browser cannot render inline PDF */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3 text-rose-400">
                      <DocumentTextIcon className="w-7 h-7" />
                    </div>
                    <h4 className="text-slate-200 font-semibold text-sm mb-1 truncate max-w-md">
                      {currentFilename}
                    </h4>
                    <p className="text-slate-400 text-xs mb-4">
                      PDF Document Preview
                    </p>
                    <a
                      href={activeImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Open Full Document
                    </a>
                  </div>
                </object>
              </div>
            ) : (
              <Image
                key={activeImage}
                src={activeImage}
                alt={`${project.name} preview ${currentSlide + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover transition-all duration-300"
                onError={handleSlideError}
                priority
                unoptimized={true}
              />
            )}

            {/* Gradient Overlay (only for image slides so video/PDF are clear) */}
            {!isVideo && !isPdf && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent pointer-events-none" />
            )}

            {/* Top-Right: Open Full Document button for PDF slides */}
            {isPdf && (
              <a
                href={activeImage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full PDF document in a new tab"
                className="absolute top-4 right-14 sm:right-16 z-30 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold shadow-xl border border-rose-400/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group/btn"
              >
                <DocumentTextIcon className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Open Full Document</span>
                <span className="sm:hidden">Open PDF</span>
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {/* Top-Left: Slide Counter & Current Filename Badge */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-[calc(100%-11rem)] pointer-events-none">
              {slides.length > 1 && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700/70 backdrop-blur-md text-[11px] font-semibold font-mono text-slate-300 shadow-lg flex items-center gap-1 flex-shrink-0">
                  <span className="text-green-400 font-bold">{currentSlide + 1}</span>
                  <span className="text-slate-500">/</span>
                  <span>{slides.length}</span>
                </div>
              )}

              {currentFilename && (
                <div className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-700/70 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-lg truncate flex items-center gap-1.5">
                  {isVideo ? (
                    <VideoCameraIcon className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  ) : isPdf ? (
                    <DocumentTextIcon className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  ) : (
                    <PhotoIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[140px] sm:max-w-xs md:max-w-md">
                    {currentFilename}
                  </span>
                  {isVideo && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Video
                    </span>
                  )}
                  {isPdf && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      PDF
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Previous & Next Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 focus:outline-none"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Dots Indicator */}
            {slides.length > 1 && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-700/70 backdrop-blur-md shadow-xl transition-all ${isVideo ? "bottom-14" : "bottom-4"
                  }`}
              >
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(idx);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${currentSlide === idx
                      ? "w-6 h-2 bg-green-500 shadow-sm shadow-green-500/50"
                      : "w-2 h-2 bg-slate-500/60 hover:bg-slate-300"
                      }`}
                  />
                ))}
              </div>
            )}

            {/* Overlay Badges (only on images, to prevent obscuring video/document controls) */}
            {!isVideo && !isPdf && (
              <div className="absolute bottom-4 left-4 sm:left-6 flex flex-wrap items-center gap-2 pointer-events-none z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold backdrop-blur-md border shadow-md ${categoryBadgeClass}`}
                >
                  <TagIcon className="w-3.5 h-3.5" />
                  {project.category}
                </span>

                {project.featured && (
                  <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/40 backdrop-blur-md shadow-md">
                    Featured
                  </span>
                )}

                {isNdaRestricted && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-md">
                    <LockClosedIcon className="w-3.5 h-3.5" />
                    Confidential (NDA)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Header / Title Row */}
            <div className="space-y-3 pb-2 border-b border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-400">
                {project.period && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 font-medium">
                    <CalendarIcon className="w-4 h-4 text-green-400" />
                    {project.period}
                  </span>
                )}

                {project.role && project.role.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60 font-medium">
                    <UserIcon className="w-4 h-4 text-green-400" />
                    {Array.isArray(project.role)
                      ? project.role.join(" • ")
                      : project.role}
                  </span>
                )}

                <span className="text-xs uppercase tracking-wider text-slate-400 ml-auto bg-slate-800/60 px-3 py-1 rounded-lg border border-slate-700/60">
                  Section:{" "}
                  <span className="text-green-400 font-semibold">
                    {project.section}
                  </span>
                </span>
              </div>

              <h2
                id="modal-project-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 leading-tight"
              >
                {project.name}
              </h2>
            </div>

            {/* 2-Column Responsive Layout on Desktop (8 cols main / 4 cols sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Full Description and Notes (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Full Markdown Description */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CodeBracketIcon className="w-4 h-4 text-green-400" />
                    Project Overview & Achievements
                  </h3>
                  <div className="bg-slate-950/50 rounded-2xl p-5 sm:p-6 border border-slate-800/90 shadow-inner">
                    <MarkdownText
                      content={project.description}
                      className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-3"
                    />
                  </div>
                </div>

                {/* Full Project Notes / NDA Callout */}
                {project.notes && (
                  <div
                    className={`rounded-2xl p-5 sm:p-6 border transition-all ${isNdaRestricted
                      ? "bg-amber-500/5 border-amber-500/30 text-slate-300"
                      : "bg-slate-950/50 border-slate-800 text-slate-300"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-2.5 font-semibold text-xs uppercase tracking-wider">
                      {isNdaRestricted ? (
                        <>
                          <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-400">
                            Confidentiality & Compliance (NDA)
                          </span>
                        </>
                      ) : (
                        <>
                          <InformationCircleIcon className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">
                            Project Context & Notes
                          </span>
                        </>
                      )}
                    </div>
                    <MarkdownText
                      content={project.notes}
                      className="text-xs sm:text-sm text-slate-400 leading-relaxed italic"
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Tech Stack & Project Specs Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Technologies Card */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="bg-slate-950/45 rounded-2xl p-5 border border-slate-800/80 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Technologies & Tools</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {project.technologies.length} tags
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-800/80 text-slate-200 hover:text-green-300 hover:border-green-500/40 rounded-xl text-xs font-medium border border-slate-700/60 shadow-sm transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Specs Card */}
                <div className="bg-slate-950/45 rounded-2xl p-5 border border-slate-800/80 space-y-3 text-xs text-slate-400">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Project Specifications
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                      <span>Category</span>
                      <span className="text-slate-200 font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                      <span>Access Level</span>
                      <span
                        className={`font-semibold ${isNdaRestricted ? "text-amber-400" : "text-green-400"
                          }`}
                      >
                        {project.availability}
                      </span>
                    </div>
                    {project.period && (
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                        <span>Timeline</span>
                        <span className="text-slate-200 font-medium">
                          {project.period}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-1.5">
                      <span>Section</span>
                      <span className="text-slate-200 font-medium capitalize">
                        {project.section}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950/85 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition-colors shadow-sm"
              >
                {renderRepoIcon(repoType)}
                <span>{project.repoLabel || getRepoDefaultLabel(repoType)}</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-medium cursor-not-allowed">
                <LockClosedIcon className="w-4 h-4 text-slate-500" />
                Repository Confidential
              </span>
            )}

            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                <span>Visit Project</span>
              </a>
            )}

            {isPdf && (
              <a
                href={activeImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-rose-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <DocumentTextIcon className="w-4 h-4" />
                <span>Open Full PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
