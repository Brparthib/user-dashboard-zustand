import type { SidebarItem } from "@/types/sidebar";

const flattenRoutes = (items: SidebarItem[]): { path: string; Component?: React.ComponentType }[] => {
  return items.flatMap((item) => {
    const routes = [];
    
    // Only add route if it has a component (leaf node)
    if (item.component) {
      routes.push({
        path: item.url,
        Component: item.component,
      });
    }
    
    // Recursively process child items
    if (item.items) {
      routes.push(...flattenRoutes(item.items));
    }
    
    return routes;
  });
};

export const generateRoutes = (sidebarItems: SidebarItem[]) => {
  return flattenRoutes(sidebarItems);
};  