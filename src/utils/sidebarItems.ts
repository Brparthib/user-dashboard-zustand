import UserList from "@/modules/user/UserList";
import type { SidebarItem } from "@/types/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText,
  ShoppingCart 
} from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    items: [
      {
        title: "All Users",
        url: "/dashboard/users",
        items: [
          {
            title: "User List",
            url: "/dashboard/users/list",
            component: UserList,
          },
          {
            title: "Create User",
            url: "/dashboard/users/create",
          },
        ],
      },
      {
        title: "User Management",
        url: "/dashboard/user-management",
        items: [
          {
            title: "Profiles",
            url: "/dashboard/user-management/profiles",
          },
          {
            title: "Settings",
            url: "/dashboard/user-management/settings",
          },
        ],
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingCart,
    items: [
      {
        title: "Product List",
        url: "/dashboard/products",
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
        items: [
          {
            title: "Main Categories",
            url: "/dashboard/categories/main",
          },
          {
            title: "Sub Categories",
            url: "/dashboard/categories/sub",
          },
        ],
      },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];