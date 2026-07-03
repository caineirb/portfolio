import "./globals.css";
import Terminal from "@/components/terminal";
import React from "react";

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
