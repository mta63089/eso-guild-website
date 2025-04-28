"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthButtons from "./auth-buttons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserMenu() {
  const { data: session } = useSession();
  const avatarSrc = session?.user?.image || "/placeholder-avatar.jpg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={avatarSrc} alt="User Avatar" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <AuthButtons />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session && (
          <Link href="/user/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
        )}
        {session?.user?.isAdmin && (
          <Link href="/admin/announcements">
            <DropdownMenuItem className="flex items-center gap-2">
              <PlusCircle className="size-4" />
              Make an Announcement
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
