import Anything4 from "@/modules/user/Anything4";
import MainCategories from "@/modules/user/MainCategories";
import ProductList from "@/modules/user/ProductList";
import Report from "@/modules/user/Report";
import Setting from "@/modules/user/Setting";
import SubCategories from "@/modules/user/SubCategories";
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
                        component: Anything4
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
        component: ProductList,
      },
      {
        title: "Categories",
        url: "#",
        items: [
          {
            title: "Main Categories",
            url: "/dashboard/categories/main",
            component: MainCategories
          },
          {
            title: "Sub Categories",
            url: "/dashboard/categories/sub",
            component: SubCategories
          },
        ],
      },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    component: Report,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    component: Setting,
  },
];
