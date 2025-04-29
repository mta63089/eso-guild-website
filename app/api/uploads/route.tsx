import { convertImageToWebp } from "@/lib/imageOptimizer";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedBuffer = await convertImageToWebp(buffer);

    const fileName = `uploads/posts/${randomUUID()}-${file.name.replace(
      /\s/g,
      "_"
    )}`;

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
