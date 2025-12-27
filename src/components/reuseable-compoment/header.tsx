"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";


export default function Header() {
  return (
    <header className="w-full h-17 flex items-center px-4 justify-between pr-12">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold capitalize">welcome admin</h1>
      </div>
      <div className="flex items-center gap-7">
        <Bell className="h-5 w-5" />
        <div className="flex items-center gap-3.5 border p-2 rounded-sm">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="font-medium capitalize">user name</span>
            <span className="text-sm text-muted-foreground">
              email@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
