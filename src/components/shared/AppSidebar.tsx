"use client";
import * as React from "react";
import { NavMain } from "@/components/shared/NavMain";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/utils/sidebarItems";
import { useUserStore } from "@/store/userStore";
import { LayoutDashboardIcon } from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: sidebarItems,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarOpen } = useUserStore();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {sidebarOpen ? (
          <h4 className="text-2xl text-center font-medium">User Dashboard</h4>
        ) : (
          <h4 className="text-xl text-center font-medium">UD</h4>
        )}
      </SidebarHeader>
      <SidebarContent className="h-screen overflow-y-auto sidebar-scrollbar">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
