"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

type SessionUser = {
  name?: string;
  email?: string;
  image?: string | null;
  type?: string;
};

export default function Header() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then(res => (res.ok ? res.json() : null))
      .then(session => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <header className="w-full h-17 flex items-center px-4 justify-between pr-12">
      <h1 className="text-lg font-semibold capitalize">
        welcome {user?.name ?? "admin"} ({user?.type ?? "Guest"})
      </h1>

      <div className="flex items-center gap-7">
        <Bell className="h-5 w-5" />

        <div className="flex items-center gap-3.5 border p-2 rounded-sm">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "user"}
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-tight">
            <span className="font-medium capitalize">
              {user?.name ?? "User"}
            </span>
            <span className="text-sm text-muted-foreground">
              {user?.email ?? ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
