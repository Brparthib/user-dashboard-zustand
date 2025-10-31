import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarItem[];
  component?: React.ComponentType;
};