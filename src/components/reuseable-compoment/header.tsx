"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  type?: string;
};

export default function Header() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    // Adjust the logout endpoint based on your Better Auth setup
    await fetch("/api/auth/sign-out", { method: "POST" });
    window.location.href = "/"; // or "/"
  };

  return (
    <header className="w-full h-17 flex items-center px-4 justify-between pr-12 border-b">
      <h1 className="text-lg font-semibold capitalize">
        Welcome {user?.name ?? "Admin"} ({user?.type ?? "Guest"})
      </h1>

      <div className="flex items-center gap-7">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* Optional: add badge for notifications later */}
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3.5 border p-2 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                  alt={user?.name || "user"}
                />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col leading-tight text-left">
                <span className="font-medium capitalize">
                  {user?.name ?? "User"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {user?.email ?? ""}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none capitalize">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}