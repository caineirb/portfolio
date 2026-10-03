import "./globals.css";
import Terminal from "@/components/terminal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://caineirb.qzz.io"),
  title: "Caine Ivan Bautista Portfolio",
  description:
    "Portfolio of Caine Ivan R. Bautista - Software Engineer specializing in scalable backends (FastAPI, NestJS), real-time computer vision (YOLO, ReID), and production machine learning.",
  openGraph: {
    title: "Caine Ivan Bautista Portfolio",
    description:
      "Portfolio of Caine Ivan R. Bautista - Software Engineer specializing in scalable backends, real-time computer vision, and production ML.",
    url: "https://caineirb.qzz.io",
    siteName: "Caine Ivan Bautista Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Caine Ivan Bautista - Software Engineer Avatar & Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caine Ivan Bautista Portfolio",
    description:
      "Portfolio of Caine Ivan R. Bautista - Software Engineer specializing in scalable backends, real-time computer vision, and production ML.",
    images: ["/og-image.png"],
  },
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
