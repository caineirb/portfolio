"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, HomeIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default function BlogHeader() {
  const pathname = usePathname();
  const isMainBlog = pathname === "/blog" || pathname === "/blog/";

  // Extract post slug if inside a subroute (e.g. /blog/1000-reasons)
  const postSlug = !isMainBlog ? pathname.replace(/^\/blog\/?/, "") : null;
  const formattedPostTitle = postSlug
    ? postSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
    : null;

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 md:px-8">
      <div className="flex items-center justify-between gap-4 font-mono text-xs md:text-sm">
        {/* Left: Return Navigation */}
        <div>
          {isMainBlog ? (
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
            >
              <ArrowLeftIcon className="w-4 h-4 text-green-500" />
              <span>Return to Home</span>
            </Link>
          ) : (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-green-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-green-500/40 shadow-sm group"
            >
              <ArrowLeftIcon className="w-4 h-4 text-green-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to Blog</span>
            </Link>
          )}
        </div>

        {/* Right: Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 overflow-hidden">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-slate-300 transition-colors shrink-0"
            title="Home"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">home</span>
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/blog"
            className={`flex items-center gap-1 transition-colors shrink-0 ${isMainBlog ? "text-green-400 font-semibold" : "hover:text-slate-300"
              }`}
          >
            <BookOpenIcon className="w-3.5 h-3.5" />
            <span>blog</span>
          </Link>
          {postSlug && (
            <>
              <span className="text-slate-600">/</span>
              <span
                className="text-green-400 font-semibold truncate max-w-[140px] sm:max-w-[220px] md:max-w-xs"
                title={formattedPostTitle ?? postSlug}
              >
                {formattedPostTitle ?? postSlug}
              </span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
