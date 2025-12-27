"use client";

import { Settings, HelpCircle } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavUser() {
  return (
    <SidebarFooter>
      <SidebarMenu>

        {/* FAQ */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Settings */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarFooter>
  );
}
