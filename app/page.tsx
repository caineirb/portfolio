import React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  SparklesIcon,
  CloudIcon,
  AcademicCapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BIO } from "@/data/whoami";
import BackendCodeWindow from "@/components/home/backend-code-window";
import AvatarArt from "@/components/home/avatar";

export default function Page() {
  return (
    <main className="min-h-full bg-slate-950 px-4 py-8 md:px-8 md:py-12 text-slate-100 overflow-y-auto selection:bg-green-500 selection:text-slate-950 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between gap-8 md:gap-12">
        <div className="space-y-4 md:space-y-6">
          {/* =========================================================================
              CATCHY AVATAR & GREETING HEADER
             ========================================================================= */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-950/80 p-5 sm:p-6 md:p-7 border border-slate-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-green-500/40 group">
            {/* Subtle Ambient Radial Glows */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <AvatarArt />

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-green-400 shadow-inner">
                    <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
                      👋
                    </span>
                    <span className="font-semibold tracking-wider uppercase text-[11px]">
                      Hello, World! I&apos;m
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-green-400">
                      {BIO.name}
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm font-mono text-slate-400 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-slate-300 font-medium">{BIO.position}</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-slate-400">
                      Backend Architecture &amp; Machine Learning
                    </span>
                  </p>
                </div>
              </div>

              {/* Quick Location & Availability Pill */}
              <div className="hidden lg:flex flex-col items-end gap-2 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
                  <MapPinIcon className="w-3.5 h-3.5 text-green-400" />
                  <span>{BIO.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Available for Engineering Roles</span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              1. HERO SECTION CARD
             ========================================================================= */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-900/40 p-6 md:p-10 border border-slate-800 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-green-500/30">
            {/* Subtle Ambient Radial Glows */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Left: Bio, Headline, Backend Focus & Quick Actions */}
              <div className="xl:col-span-6 space-y-6 text-center xl:text-left">
                {/* Status Badge */}
                <div className="inline-flex max-w-full items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-inner backdrop-blur-md">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-green-400 font-bold shrink-0">SYSTEM ONLINE</span>
                  <span className="text-slate-600 shrink-0">|</span>
                  <span className="text-slate-400 truncate min-w-0">
                    Backend Architecture • ML • Computer Vision
                  </span>
                </div>

                {/* Main Headline */}
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Architecting{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400">
                      Resilient Backends
                    </span>{" "}
                    &amp; High-Throughput{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400">
                      Vision Pipelines
                    </span>
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed pt-2">
                    Software Engineer, DOST Scholar, and Magna Cum Laude CS graduate specializing in backend architecture—building high-concurrency microservices (FastAPI &amp; NestJS), robust database caching layers (PostgreSQL &amp; MySQL), and integrating low-latency computer vision inference systems (YOLO &amp; ReID).
                  </p>
                </div>

                {/* Academic & Professional Badges */}
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <AcademicCapIcon className="w-4 h-4 text-green-400" />
                    MSU-IIT Magna Cum Laude
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <SparklesIcon className="w-4 h-4 text-cyan-400" />
                    DOST-SEI Scholar
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60">
                    <CloudIcon className="w-4 h-4 text-purple-400" />
                    AWS re/Start Scholar
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="pt-1 flex flex-wrap items-center justify-center xl:justify-start gap-3">
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-slate-950 font-bold text-sm hover:bg-green-400 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]"
                  >
                    Explore Projects
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/whoami"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-slate-100 font-medium text-sm hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600 hover:scale-[1.02]"
                  >
                    System Specs &amp; Bio
                  </Link>

                  <a
                    href={`mailto:${BIO.email}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-slate-300 font-medium text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                    title="Send email"
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={BIO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-slate-300 font-medium text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                    title="GitHub Profile"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>

                  <a
                    href={BIO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 text-slate-300 font-medium text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                    title="LinkedIn Profile"
                  >
                    <FaLinkedin className="w-4 h-4 text-blue-400" />
                  </a>
                </div>
              </div>

              {/* Right: Backend Code Description Window (Replacing Image) */}
              <div className="xl:col-span-6 w-full">
                <BackendCodeWindow />
              </div>
            </div>
          </section>
        </div>

        {/* =========================================================================
            FOOTER / CONTACT CALLOUT
           ========================================================================= */}
        <footer className="mt-auto pt-8 pb-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {BIO.name}. Engineered with Next.js, TypeScript, &amp; Tailwind.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={BIO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={BIO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${BIO.email}`}
              className="hover:text-slate-300 transition-colors"
            >
              {BIO.email}
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
