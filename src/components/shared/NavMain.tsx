import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavMainProps["items"];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const location = useLocation();

  // Check if the current route matches or is a child
  const isItemActive = (item: NavMainProps["items"][0]): boolean => {
    if (location.pathname === item.url) return true;
    if (item.items) {
      return item.items.some((child) => isItemActive(child));
    }
    return false;
  };

  // Recursive rendering function
  const renderItems = (menuItems: NavMainProps["items"]) => {
    return (
      <SidebarMenuSub>
        {menuItems.map((item) => {
          const hasChildren = !!item.items?.length;
          const active = isItemActive(item);

          return (
            <SidebarMenuSubItem key={item.title}>
              {hasChildren ? (
                <Collapsible asChild defaultOpen={active} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuSubButton asChild>
                        <div className="flex items-center justify-between w-full">
                          <a href={item.url} className="flex items-center gap-2">
                            {item.icon && <item.icon className="size-4" />}
                            <span>{item.title}</span>
                          </a>
                          <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                      </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>{renderItems(item.items!)}</CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuSubButton asChild>
                  <a href={item.url}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;
          const active = isItemActive(item);

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible asChild defaultOpen={active} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>{renderItems(item.items!)}</CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
