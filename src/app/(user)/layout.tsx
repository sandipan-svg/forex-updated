"use client";

import Header from "@/components/reuseable-compoment/header";
import { AppSidebar } from "@/components/reuseable-compoment/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutDashboardIcon, UserPen } from "lucide-react";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userMenu = {
    navMenu: [
      {
        title:"dashboard",
        url:"/user/dashboard",
        icon:LayoutDashboardIcon,
        isActive: true
      },
      {
        title: "profile",
        url: "/profile",
        icon: UserPen,
        isActive: true,
      },
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar items={userMenu.navMenu} />
        <div className="w-full flex flex-col bg-[#FAFAFA]">
          <Header />
          {/* <SidebarTrigger /> */}
          {children}
        </div>
    </SidebarProvider>
  );
}
