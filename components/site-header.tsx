"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ModeSwitcher } from "./mode-switcher";
import { UserMenu } from "./user-menu";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeNavItem, setActiveNavItem] = React.useState("Dashboard");
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky left-0 right-0 top-0 z-50 bg-muted transition-all duration-300 shadow-2xl",
        isScrolled ? "shadow-md" : ""
      )}
      style={{ opacity: headerOpacity }}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="GuildForge Logo"
                className="size-8 shadow rounded-full"
                width={100}
                height={100}
              />
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary-foreground">
                  {siteConfig.name}
                </span>
              </Link>
            </div>
            <div className="relative hidden md:block shadow-2xs">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                id="top-nav-search"
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[300px]"
              />
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "relative",
                        activeNavItem === item.name && "text-accent"
                      )}
                      onClick={() => setActiveNavItem(item.name)}
                    >
                      {item.name}
                      {activeNavItem === item.name && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeNavItem"
                        />
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ModeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-5" />
                  {/* <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full p-0">
                    3
                  </Badge> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New message from Alice</DropdownMenuItem>
                <DropdownMenuItem>
                  Project &quot;X&quot; completed
                </DropdownMenuItem>
                <DropdownMenuItem>3 new team members joined</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserMenu />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
