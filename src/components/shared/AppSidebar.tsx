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
    <Sidebar className="border-dotted min-w-16" collapsible="icon" {...props}>
      <SidebarHeader>
        {sidebarOpen ? (
          <h4 className="text-2xl text-center font-medium">User Dashboard</h4>
        ) : (
          <h4 className="text-xl text-center font-medium">UD</h4>
        )}
      </SidebarHeader>
      <SidebarContent className="mt-4 h-screen overflow-y-auto sidebar-scrollbar shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
