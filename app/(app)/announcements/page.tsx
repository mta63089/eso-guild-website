import { promises as fs } from "fs";
import path from "path";

interface Announcement {
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default async function AnnouncementsPage() {
  let announcements: Announcement[] = [];

  try {
    const filePath = path.join(process.cwd(), "data", "announcements.json");
    const data = await fs.readFile(filePath, "utf8");
    announcements = JSON.parse(data);
  } catch (error) {
    console.error("Failed to load announcements:", error);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Guild Announcements</h1>
      <div className="space-y-8">
        {announcements.length === 0 && (
          <p className="text-muted-foreground">No announcements yet!</p>
        )}
        {announcements.map((announcement, index) => (
          <div key={index} className="p-6 rounded-lg shadow-md bg-card">
            <h2 className="text-2xl font-bold mb-2">{announcement.title}</h2>
            <p className="text-muted-foreground text-sm mb-2">
              Posted by {announcement.author} on{" "}
              {new Date(announcement.createdAt).toLocaleDateString()}
            </p>
            <p className="text-foreground">
              {announcement.content.length > 300
                ? announcement.content.substring(0, 300) + "..."
                : announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
