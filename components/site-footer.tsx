import { siteConfig } from "@/config/site";
import { Stars } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full border border-t bg-background text-foreground mt-16">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center">
            <Stars className="mr-2 size-6 rounded-full text-primary" />
            <span className="text-xl font-semibold">GuildForge</span>
          </Link>
          <p className="max-w-2xl text-center text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <nav className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            href="/about"
            className="text-sm transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/premium"
            className="text-sm transition-colors hover:text-primary"
          >
            Premium
          </Link>
          <Link
            href="/campaigns"
            className="text-sm transition-colors hover:text-primary"
          >
            Campaigns
          </Link>
          <Link
            href="/blog"
            className="text-sm transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/affiliate-program"
            className="text-sm transition-colors hover:text-primary"
          >
            Affiliate Program
          </Link>
          <Link
            href="/faqs"
            className="text-sm transition-colors hover:text-primary"
          >
            FAQs
          </Link>
          <Link
            href="/contact"
            className="text-sm transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Michael Albert. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
