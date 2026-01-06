// app/(admin)/layout.tsx
import { redirect } from "next/navigation";
import Header from "@/components/reuseable-compoment/header";
import { AppSidebar } from "@/components/reuseable-compoment/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");
  if (session.user.type?.toLowerCase() !== "admin") redirect("/");

  const adminNavItems = [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: "LayoutDashboard",
      isActive: true,
    },
    {
      title: "requests",
      url: "/requests",
      icon: "ShieldCheck",
    },
    {
      title: "clients",
      url: "/clients",
      icon: "Users",
    },
    {
      title: "orders",
      url: "/orders",
      icon: "LayoutList",
    },
    {
      title: "report & analytics",
      url: "/report-analytics",
      icon: "BarChart3",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar items={adminNavItems} />
      <div className="w-full flex flex-col bg-[#FAFAFA]">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}