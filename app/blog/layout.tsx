import React from "react";
import type { Metadata } from "next";
import BlogHeader from "./blog-header";

export const metadata: Metadata = {
  title: "Blog | Caine Ivan Bautista",
  description: "Personal thoughts, notes, and writings by Caine Ivan Bautista.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-slate-950 text-slate-100">
      <BlogHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}
