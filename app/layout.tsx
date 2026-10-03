import "./globals.css";
import Terminal from "@/components/terminal";
import React from "react";


export const metadata = {
  title: "Caine Bautista | Backend, ML & Computer Vision Engineer",
  description:
    "Portfolio of Caine Ivan R. Bautista - Software Engineer specializing in scalable backends (FastAPI, NestJS), real-time computer vision (YOLO, ReID), and production machine learning.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col md:flex-row h-screen w-full overflow-hidden">
        <Terminal />
        <div className="flex-1 w-full h-full relative overflow-auto bg-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}
