import { SessionProvider } from "@/components/session-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { META_THEME_COLORS, siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | ESO Guild",
  },
  description: siteConfig.description,
  keywords: [
    "ESO",
    "Elder Scrolls Online",
    "ESO Guild",
    "ESO Guilds",
    "Guild",
    "mta630",
    "demolisheddub",
    "ddubb",
  ],
  metadataBase: new URL(siteConfig.url),
  authors: [
    {
      name: "Michael Albert",
      url: "https://michaelalbert.dev",
    },
  ],
  creator: "mta630",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-svh flex-col bg-background">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
