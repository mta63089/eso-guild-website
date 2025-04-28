import { promises as fs } from "fs";
import { Session } from "next-auth";
import path from "path";

// Already existing, for real Session objects
export async function isAdmin(session: Session | null): Promise<boolean> {
  if (!session || !session.user?.id) {
    return false;
  }

  return isUserIdAdmin(session.user.id);
}

// New: For checking raw user IDs
export async function isUserIdAdmin(userId: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "data", "admins.json");
    const data = await fs.readFile(filePath, "utf8");
    const allowedDiscordIDs: string[] = JSON.parse(data);

    return allowedDiscordIDs.includes(userId);
  } catch (error) {
    console.error("Failed to read admin list:", error);
    return false;
  }
}
