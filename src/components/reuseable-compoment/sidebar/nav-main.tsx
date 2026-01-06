// components/reuseable-compoment/sidebar/nav-main.tsx
"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Import all possible icons
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  LayoutList,
  BarChart3,
  // Add more icons here if you plan to use them in submenus or future items
} from "lucide-react";

// Map string names → Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  ShieldCheck,
  Users,
  LayoutList,
  BarChart3,
};

type NavItem = {
  title: string;
  url: string;
  icon: string; // ← Changed from LucideIcon to string
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="capitalize">Admin Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const hasSubItems = item.items && item.items.length > 0;
          const isOpen = item.isActive || (hasSubItems && item.items?.some(sub => pathname.startsWith(sub.url)));

          return (
            <Collapsible key={item.title} defaultOpen={isOpen} asChild>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title} className="capitalize">
                  <Link href={item.url}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>

                {hasSubItems && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = pathname.startsWith(subItem.url);

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}