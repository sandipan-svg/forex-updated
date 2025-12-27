"use client";

import Header from "@/components/reuseable-compoment/header";
import { AppSidebar } from "@/components/reuseable-compoment/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  BarChart3,
  LayoutDashboard,
  LayoutList,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userMenu = {
    navMenu: [
      {
        title: "dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "requests",
        url: "/requests",
        icon: ShieldCheck,
        isActive: true,
      },
      {
        title: "clients",
        url: "/clients",
        icon: Users,
        isActive: true,
      },
      {
        title: "orders",
        url: "/orders",
        icon: LayoutList,
        isActive: true,
      },
      {
        title: "report & analytics",
        url: "/report-analytics",
        icon: BarChart3,
        isActive: false,
      },
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar items={userMenu.navMenu} />
      <div className="w-full flex flex-col bg-[#FAFAFA]">
        <Header />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
