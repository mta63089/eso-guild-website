import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Announcement {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  categories: Array<string>;
}

export default function AnnouncementList({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
            Announcements
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Stay updated with the latest news and events.
          </p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {announcements.map((announcement, index) => (
            <Link key={index} href="#" className="group block">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div
                  className={`order-2 md:order-${index % 2 === 0 ? "1" : "2"}`}
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      {announcement.categories.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="bg-primary/10 px-2 py-1 text-primary"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center text-primary">
                    <span className="font-semibold">Read more</span>
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                <div
                  className={`order-1 md:order-${index % 2 === 0 ? "2" : "1"}`}
                >
                  <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={"/placeholder.png"}
                      alt={`${announcement.title} thumbnail`}
                      width={1280}
                      height={720}
                      className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
