import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const allowedDiscordIDs = ["157690609526636544"];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  if (!session || !allowedDiscordIDs.includes(session.user?.id ?? "")) {
    redirect("/");
  }

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <Card className="text-lg shadow p-4">
        Welcome, {session.user.name}
        <Avatar className="size-12">
          <AvatarImage src={session.user.image} />
        </Avatar>
      </Card>
    </main>
  );
}
