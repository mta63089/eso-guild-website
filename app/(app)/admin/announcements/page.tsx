import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PostForm } from "@/components/post-form";
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
    <>
      <PostForm type="ANNOUNCEMENT" />
    </>
  );
}
