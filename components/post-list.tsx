"use client";

import { Post } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (!posts.length) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center text-muted-foreground">
          No posts have been published yet.
        </div>
      </section>
    );
  }

  const [featured, ...rest] = posts;
  const leftCol = rest.slice(0, 3);
  const rightCol = rest.slice(3);

  return (
    <section className="bg-background py-8 sm:py-16">
      <div className="container mx-auto">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            Guild Posts
          </h2>
          <p className="text-muted-foreground sm:text-xl">
            Explore the latest announcements, guides, and showcases from the
            guild community.
          </p>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FeaturedArticle post={featured} />
          </div>
          <div className="space-y-8 lg:col-span-1 lg:border-l lg:border-r lg:px-8">
            {leftCol.map((post) => (
              <SmallArticle key={post.id} post={post} />
            ))}
          </div>
          <div className="space-y-8 lg:col-span-1">
            {rightCol.map((post) => (
              <SmallArticle key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/posts/${post.id}`}>
        <Image
          className="mb-5 rounded-lg"
          src={post.imageUrl || "/placeholder.png"}
          alt={post.title}
          width={800}
          height={400}
        />
      </Link>
      <h2 className="my-2 text-2xl font-bold tracking-tight text-foreground">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="mb-4 text-muted-foreground">{post.preview}</p>
      <Link
        href={`/posts/${post.id}`}
        className="inline-flex items-center font-medium text-primary hover:underline"
      >
        Read more
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </article>
  );
}

function SmallArticle({ post }: { post: Post }) {
  return (
    <article>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="mb-4 text-muted-foreground">{post.preview}</p>
      <Link
        href={`/posts/${post.id}`}
        className="inline-flex items-center font-medium text-primary hover:underline"
      >
        Read more
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </article>
  );
}
