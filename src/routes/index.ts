import { NotFound } from "@/components/shared/NotFound";
import DashboardLayout from "@/layout/DashboardLayout";
import Overview from "@/modules/user/Overview";
import { generateRoutes } from "@/utils/generateRoutes";
import { sidebarItems } from "@/utils/sidebarItems";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: DashboardLayout,
    path: "/",
    children: [
      {index: true, Component: Overview},
      ...generateRoutes(sidebarItems),
    ],
  },
  {
    Component: NotFound,
    path: "*",
  }
]);
