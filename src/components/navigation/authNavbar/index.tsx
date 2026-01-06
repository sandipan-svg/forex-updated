"use client";

import { SignInForm } from "@/components/reuseable-compoment/signIn-form";
import { SignupForm } from "@/components/reuseable-compoment/signUp-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react"; // optional icons
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  type?: string;
};

export default function AuthNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openLogin = () => {
    setAuthMode("login");
    setIsOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleLogout = async () => {
    await fetch("/api/auth/sign-out", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.refresh(); // or router.push("/") if you want to redirect
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  // Logged In: Avatar with Dropdown
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback>
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push("/profile")} // adjust route as needed
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Not logged in: Login / Register buttons
  return (
    <>
      <div className="flex flex-row gap-3">
        <Button variant="secondary" onClick={openLogin}>
          Login
        </Button>
        <Button variant="default" onClick={openRegister}>
          Register
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>{/* Title optional */}</DialogHeader>

          {authMode === "login" ? (
            <SignInForm onClose={closeModal} />
          ) : (
            <SignupForm onClose={closeModal} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}