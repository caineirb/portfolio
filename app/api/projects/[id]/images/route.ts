import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VALID_MEDIA_EXTENSIONS = new Set([
  // Images
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  // Videos
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".m4v",
  // Documents
  ".pdf",
]);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  const projectDir = path.join(process.cwd(), "public/projects", id);

  if (!fs.existsSync(projectDir)) {
    return NextResponse.json({ images: [] });
  }

  try {
    const entries = await fs.promises.readdir(projectDir, {
      withFileTypes: true,
    });

    const imageFiles = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        VALID_MEDIA_EXTENSIONS.has(path.extname(name).toLowerCase())
      );

    // Sort so the file matching the project ID (e.g. [id].gif / [id].png) is always first
    imageFiles.sort((a, b) => {
      const aBase = path.parse(a).name;
      const bBase = path.parse(b).name;
      if (aBase === id) return -1;
      if (bBase === id) return 1;
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    const imageUrls = imageFiles.map((filename) => `/projects/${id}/${filename}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error(`Failed to read images for project ${id}:`, error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
