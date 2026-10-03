import { NextResponse } from "next/server";
import { getAvatarSvg } from "@/components/home/avatar";

export async function GET() {
  const svg = getAvatarSvg();
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
