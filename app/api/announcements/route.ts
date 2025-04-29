import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  if (!session.user) {
    return NextResponse.json(
      { error: "Session does not contain user information" },
      { status: 500 }
    );
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "User does not have privileges to create announcements" },
      { status: 403 }
    );
  }

  const { title, preview, content, categories, imageUrl } = await req.json();

  if (
    !title ||
    !preview ||
    !content ||
    !Array.isArray(categories) ||
    !imageUrl
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const announcement = await prisma.announcement.create({
      data: {
        title,
        preview,
        content,
        author: session.user.name || "Unknown",
        categories,
        imageUrl,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("Failed to create announcement:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
