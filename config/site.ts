export const siteConfig = {
  name: "GuildForge",
  url: "https://eso-guild-website.mta630.com",
  ogImage: "https://eso-guild-website.mta630.com/og.jpg",
  description:
    "An example website created by demolisheddub (mta630) for Elder Scrolls Online guilds.",
  links: {},
  nav: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Team", href: "/team" },
    { name: "Calendar", href: "/calendar" },
    { name: "Documents", href: "/documents" },
    { name: "Single Post", href: "/post" },
  ],
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
