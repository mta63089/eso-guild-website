import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const slug = slugify(name);

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Invalid category name" },
        { status: 400 }
      );
    }

    const existingName = await prisma.category.findUnique({
      where: { name },
    });

    if (existingName) {
      return NextResponse.json(existingName);
    }

    const existingSlug = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(existingSlug);
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("[CATEGORY_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
