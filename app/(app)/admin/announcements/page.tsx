import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AnnouncementForm } from "@/components/announcement-form";
import { isAdmin } from "@/lib/auth/admin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminAnnouncementsPage() {
  const session = await getServerSession(authOptions);
  const admin = await isAdmin(session);

  if (!session || !admin) {
    redirect("/");
  }

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Announcement</h1>
      <AnnouncementForm />
    </main>
  );
}
