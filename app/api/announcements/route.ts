import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/auth/admin";
import { promises as fs } from "fs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const admin = await isAdmin(session);

  if (!session) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const announcement = {
    title,
    content,
    author: session.user?.name,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(process.cwd(), "data", "announcements.json");

  try {
    const data = await fs.readFile(filePath, "utf8");
    const announcements = JSON.parse(data);
    announcements.unshift(announcement); // newest first
    await fs.writeFile(filePath, JSON.stringify(announcements, null, 2));
  } catch (error) {
    console.error(error);
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify([announcement], null, 2));
  }

  return NextResponse.json({ success: true });
}
