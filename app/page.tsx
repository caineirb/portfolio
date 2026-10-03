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
    <main className="min-h-full bg-slate-950 px-4 py-5 sm:px-6 sm:py-6 md:px-[10%] md:py-[3vh] text-slate-100 overflow-y-auto selection:bg-green-500 selection:text-slate-950 flex flex-col">
      <div className="w-full mx-auto flex-1 flex flex-col gap-4 md:gap-5 min-h-0">
        {/* =========================================================================
            CATCHY AVATAR & GREETING HEADER (50% of second card: flex-[1] vs flex-[2])
           ========================================================================= */}
        <section className="flex-[1] min-h-[190px] md:min-h-[210px] flex flex-col justify-center relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-slate-950/80 py-3 sm:py-4 md:py-4 lg:py-5 px-6 sm:px-8 md:px-[8%] lg:px-[10%] border border-slate-800/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-green-500/40 group">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 my-auto w-full max-w-4xl mx-auto">
            <AvatarArt size="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52" />

            <div className="space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-green-400 shadow-inner">
                <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
                  👋
                </span>
                <span className="font-semibold tracking-wider uppercase text-[11px]">
                  Hello, World! I&apos;m
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-green-400">
                  {BIO.name}
                </span>
              </h1>

              <p className="text-xs sm:text-sm font-mono text-slate-400 flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-slate-300 font-medium">{BIO.position}</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400">
                  Backend Architecture &amp; Machine Learning
                </span>
              </p>

              {/* Location and Availability under Role text */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
                  <MapPinIcon className="w-3.5 h-3.5 text-green-400" />
                  <span>{BIO.location}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Available for Engineering Roles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1. HERO SECTION CARD (2x size of top card: flex-[2])
           ========================================================================= */}
        <section className="flex-[2] min-h-[440px] md:min-h-[480px] flex flex-col justify-center relative overflow-hidden rounded-3xl bg-slate-900/40 p-6 sm:p-8 md:p-8 lg:p-10 md:px-[6%] lg:px-[8%] border border-slate-800 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-green-500/30">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-center my-auto">
            {/* Left: Bio, Headline, Backend Focus & Quick Actions */}
            <div className="xl:col-span-6 space-y-3.5 md:space-y-4 text-center xl:text-left">
              {/* Status Badge */}
              <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono text-slate-300 shadow-inner backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-bold shrink-0">SYSTEM ONLINE</span>
                <span className="text-slate-600 shrink-0">|</span>
                <span className="text-slate-400 truncate min-w-0">
                  Backend Architecture • ML • Computer Vision
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Architecting{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400">
                    Resilient Backends
                  </span>{" "}
                  &amp; High-Throughput{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400">
                    Vision Pipelines
                  </span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-0.5">
                  Software Engineer, DOST Scholar, and Magna Cum Laude CS graduate specializing in backend architecture—building high-concurrency microservices (FastAPI &amp; NestJS), robust database caching layers (PostgreSQL &amp; MySQL), and integrating low-latency computer vision inference systems (YOLO &amp; ReID).
                </p>
              </div>

              {/* Academic & Professional Badges */}
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <AcademicCapIcon className="w-3.5 h-3.5 text-green-400" />
                  MSU-IIT Magna Cum Laude
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />
                  DOST-SEI Scholar
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <CloudIcon className="w-3.5 h-3.5 text-purple-400" />
                  AWS re/Start Scholar
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="pt-0.5 flex flex-wrap items-center justify-center xl:justify-start gap-2.5">
                <Link
                  href="/projects"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-green-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-green-400 transition-all shadow-md shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.02]"
                >
                  Explore Projects
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/whoami"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-800 text-slate-100 font-medium text-xs sm:text-sm hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600 hover:scale-[1.02]"
                >
                  System Specs &amp; Bio
                </Link>

                <a
                  href={`mailto:${BIO.email}`}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 text-slate-300 font-medium text-xs sm:text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                  title="Send email"
                >
                  <EnvelopeIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BIO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 text-slate-300 font-medium text-xs sm:text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                  title="GitHub Profile"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </a>

                <a
                  href={BIO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 text-slate-300 font-medium text-xs sm:text-sm hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="w-3.5 h-3.5 text-blue-400" />
                </a>
              </div>
            </div>

            {/* Right: Backend Code Description Window (Replacing Image) */}
            <div className="xl:col-span-6 w-full">
              <BackendCodeWindow />
            </div>
          </div>
        </section>

        {/* =========================================================================
            FOOTER / CONTACT CALLOUT
           ========================================================================= */}
        <footer className="shrink-0 pt-2.5 pb-1 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono text-slate-500">
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
