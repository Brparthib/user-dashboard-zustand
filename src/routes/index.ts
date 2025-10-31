import DashboardLayout from "@/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { sidebarItems } from "@/utils/sidebarItems";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: DashboardLayout,
    path: "/",
    children: [
      ...generateRoutes(sidebarItems)
    ],
  },
]);
