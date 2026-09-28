import React from "react";

export const metadata = {
  title: "Projects - Caineirb",
  description:
    "Showcase of software engineering systems, personal open-source projects, and academic research by Caine Ivan Bautista.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
