import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_MAP: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

const SUPPORTED_EXTENSIONS = Object.keys(MIME_MAP);

/**
 * Scans the filesystem on the server for the given project's cover image.
 * Looks for exact matches like `[id].[ext]` inside `public/projects/[id]/`,
 * or any valid image in that directory, or `public/projects/[id].[ext]`.
 */
function scanProjectImage(id: string): { filePath: string; mimeType: string } | null {
  const publicDir = path.join(process.cwd(), "public/projects");

  // 1. Check inside subfolder: public/projects/[id]/
  const projectDir = path.join(publicDir, id);
  if (fs.existsSync(projectDir) && fs.statSync(projectDir).isDirectory()) {
    try {
      const files = fs.readdirSync(projectDir);

      // Check for exact base match first: [id].[ext]
      for (const ext of SUPPORTED_EXTENSIONS) {
        const candidate = `${id}${ext}`;
        if (files.includes(candidate)) {
          const filePath = path.join(projectDir, candidate);
          return { filePath, mimeType: MIME_MAP[ext] || "application/octet-stream" };
        }
      }

      // If no exact match, pick the first supported image file in the directory
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (MIME_MAP[ext]) {
          const filePath = path.join(projectDir, file);
          return { filePath, mimeType: MIME_MAP[ext] };
        }
      }
    } catch (err) {
      console.error(`Error reading directory for project ${id}:`, err);
    }
  }

  // 2. Check directly in public/projects/[id].[ext]
  for (const ext of SUPPORTED_EXTENSIONS) {
    const candidatePath = path.join(publicDir, `${id}${ext}`);
    if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
      return { filePath: candidatePath, mimeType: MIME_MAP[ext] || "application/octet-stream" };
    }
  }

  // 3. Fallback to default project image
  const defaultPng = path.join(publicDir, "default-project.png");
  if (fs.existsSync(defaultPng)) {
    return { filePath: defaultPng, mimeType: "image/png" };
  }

  const defaultJpg = path.join(publicDir, "default-project.jpg");
  if (fs.existsSync(defaultJpg)) {
    return { filePath: defaultJpg, mimeType: "image/jpeg" };
  }

  return null;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return new NextResponse("Project ID is required", { status: 400 });
  }

  const result = scanProjectImage(id);

  if (!result) {
    return new NextResponse("Image not found", { status: 404 });
  }

  try {
    const fileBuffer = await fs.promises.readFile(result.filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": result.mimeType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    console.error(`Failed to read image file ${result.filePath}:`, err);
    return new NextResponse("Failed to load image", { status: 500 });
  }
}
