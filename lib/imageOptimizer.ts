import sharp from "sharp";

/**
 * Optimize and convert an image to webp format
 * @param buffer Raw image buffer (e.g., from file upload)
 * @returns WebP formatted image buffer
 */
export async function convertImageToWebp(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .webp({
      quality: 80,
    })
    .toBuffer();
}
