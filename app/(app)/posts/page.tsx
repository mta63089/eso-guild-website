import { PostList } from "@/components/post-list";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { categories: true },
  });

  return <PostList posts={posts} />;
}
