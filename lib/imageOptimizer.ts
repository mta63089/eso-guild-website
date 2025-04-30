// lib/imageOptimizer.ts
import sharp from "sharp";

export interface OptimizeImageOptions {
  maxWidth?: number; // Resize if width exceeds this
  quality?: number; // Quality (1-100)
  format?: "webp" | "avif"; // Future proofing
}

interface OptimizedImage {
  buffer: Buffer;
  info: {
    width: number;
    height: number;
    size: number; // bytes
    format: string;
    mimeType: string;
  };
}

/**
 * Optimize an image by resizing and converting to a modern format.
 * @param inputBuffer Raw image buffer (e.g., from file upload)
 * @param options Optimization options
 * @returns Optimized image buffer and info
 */
export async function optimizeImage(
  inputBuffer: Buffer,
  options?: OptimizeImageOptions
): Promise<OptimizedImage> {
  const { maxWidth = 1920, quality = 80, format = "webp" } = options || {};

  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  if (!metadata.format || !metadata.width || !metadata.height) {
    throw new Error("Invalid image metadata. Cannot optimize.");
  }

  const shouldResize = metadata.width > maxWidth;

  let transformer = image;

  // Resize if necessary
  if (shouldResize) {
    transformer = transformer.resize({
      width: maxWidth,
      withoutEnlargement: true, // Only shrink large images, never upscale
    });
  }

  // Format conversion
  if (format === "webp") {
    transformer = transformer.webp({ quality });
  } else if (format === "avif") {
    transformer = transformer.avif({ quality });
  } else {
    throw new Error(`Unsupported target format: ${format}`);
  }

  const outputBuffer = await transformer.toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    info: {
      width: outputMetadata.width || metadata.width,
      height: outputMetadata.height || metadata.height,
      size: outputBuffer.length,
      format: format,
      mimeType: format === "webp" ? "image/webp" : "image/avif",
    },
  };
}
