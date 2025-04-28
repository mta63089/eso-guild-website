"use client";

import { Badge } from "@/components/ui/badge";
import {
  CalendarRange,
  Image as ImageIcon,
  MessageSquare,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function FeatureList() {
  const features = [
    {
      icon: Users,
      title: "Guild Member Management",
      description:
        "Easily organize your guild roster with rank assignments, role management, and recruitment tools.",
    },
    {
      icon: CalendarRange,
      title: "Event Scheduling",
      description:
        "Plan raids, PvP events, and social gatherings with RSVP support and automatic Discord notifications.",
    },
    {
      icon: ImageIcon,
      title: "Media Galleries",
      description:
        "Showcase your guild's achievements and memories with stunning image and video uploads.",
    },
    {
      icon: MessageSquare,
      title: "Community Forums",
      description:
        "Foster communication with dedicated discussion boards for guides, announcements, and guild chatter.",
    },
    {
      icon: Trophy,
      title: "Achievement Tracking",
      description:
        "Highlight your guild's progression in Trials, PvP rankings, and special event milestones.",
    },
    {
      icon: Shield,
      title: "Secure Admin Tools",
      description:
        "Manage your guild site with powerful, secure admin controls designed for leaders and officers.",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-4">
          <Badge className="flex items-center gap-1 px-2.5 py-1.5 text-sm">
            <Shield className="h-auto w-4" />
            GuildForge
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Power Up Your ESO Guild
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Tools crafted for Elder Scrolls Online guilds: organize, connect,
            and conquer Tamriel together.
          </p>
        </div>
        <div className="mt-14 grid gap-2.5 lg:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <div className="hidden h-full rounded-lg lg:block">
            <Image
              src="https://esosslfiles-a.akamaihd.net/cms/2020/10/2526693e74b462fd8740b9e0640f67b6.jpg"
              alt="A guild on the march"
              width={400}
              height={600}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {features.slice(3).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex size-12 items-center justify-center rounded-md bg-muted">
          <Icon className="h-auto w-6 text-primary" />
        </span>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}
