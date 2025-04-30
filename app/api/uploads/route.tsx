import { optimizeImage, OptimizeImageOptions } from "@/lib/imageOptimizer";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const optimizeOptions: OptimizeImageOptions = {
      maxWidth: 1500,
      quality: 80,
      format: "webp",
    };

    const { buffer: optimizedBuffer } = await optimizeImage(
      buffer,
      optimizeOptions
    );

    const originalName = `uploads/posts/${randomUUID()}-${file.name.replace(
      /\s/g,
      "_"
    )}`;

    // Making sure that the extension is updated to what we converted the image to
    const baseName =
      originalName.substring(0, originalName.lastIndexOf(".")) || originalName;
    const newExtension = optimizeOptions.format;
    const fileName = `${baseName}.${newExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: optimizedBuffer,
      ContentType: file.type,
    });

    const uploadResult = await s3.send(command);

    if (
      !uploadResult.$metadata ||
      uploadResult.$metadata.httpStatusCode !== 200
    ) {
      console.error("[UPLOAD_FAILED_METADATA]", uploadResult);
      return NextResponse.json(
        { error: "Failed to upload to S3" },
        { status: 500 }
      );
    }

    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
