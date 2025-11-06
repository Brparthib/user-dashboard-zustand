import UserList from "@/modules/user/UserList";
import type { SidebarItem } from "@/types/sidebar";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ShoppingCart,
} from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
    items: [
      {
        title: "User List",
        url: "/dashboard/users/list",
        component: UserList,
      },
      { 
        title: "Create User",
        url: "#",
        items: [
          {
            title: "Anything",
            url: "#",
            items: [
              {
                title: "Anything2",
                url: "#",
                items: [
                  {
                    title: "Anything3",
                    url: "#",
                    items: [
                      {
                        title: "Anything4",
                        url: "/dashboar/users/anything4",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "User Management",
        url: "#",
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
    url: "#",
    icon: ShoppingCart,
    items: [
      {
        title: "Product List",
        url: "/dashboard/products",
      },
      {
        title: "Categories",
        url: "#",
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
