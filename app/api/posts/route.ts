import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { title, preview, content, categories, imageUrl } = body.values;

    if (!title || !preview || !content || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        preview,
        content,
        imageUrl,
        type: body.values.type,
        authorId: session.user.id,
        categories: {
          connectOrCreate: categories.map((cat: string) => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("[POST_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
