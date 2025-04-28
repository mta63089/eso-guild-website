import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Figma,
  Github,
  Instagram,
  Linkedin,
  Slack,
  Twitch,
  Twitter,
  Youtube,
} from "lucide-react";
import * as React from "react";

interface LinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const links: LinkItem[] = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <Twitter className="size-6" />,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <Facebook className="size-6" />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <Instagram className="size-6" />,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <Linkedin className="size-6" />,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <Github className="size-6" />,
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: <Youtube className="size-6" />,
  },
  {
    href: "https://twitch.tv",
    label: "Twitch",
    icon: <Twitch className="size-6" />,
  },
  {
    href: "https://slack.com",
    label: "Slack",
    icon: <Slack className="size-6" />,
  },
  {
    href: "https://figma.com",
    label: "Figma",
    icon: <Figma className="size-6" />,
  },
];

export function LinkHub() {
  return (
    <section className="container py-16">
      <Card className="mx-auto py-16">
        <CardContent className="p-6">
          <h2 className="mb-10 text-center text-2xl font-bold">
            Connect With Us
          </h2>
          <TooltipProvider>
            <div className="mx-auto grid max-w-2xl grid-cols-5 gap-4 sm:grid-cols-10">
              {links.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </section>
  );
}
