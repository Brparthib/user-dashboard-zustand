"use client";

import * as React from "react";
import { Link, useLocation } from "react-router";
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
import { useUserStore } from "@/store/userStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ---- Types ----
export interface NavNode {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: NavNode[];
}

interface NavMainProps {
  items: NavNode[];
}

// ---- Hover timing (adjust to taste) ----
const OPEN_DELAY = 100;   // ms before opening on hover
const CLOSE_DELAY = 150;  // ms before closing after leave

// Helper: treat "#" as a pure toggle (no navigation)
const isToggleOnly = (node: NavNode) => node.url === "#";

// ---- Utility: active route check (recursive) ----
function useIsActiveChecker() {
  const location = useLocation();
  const isItemActive = React.useCallback((item: NavNode): boolean => {
    if (item.url !== "#" && location.pathname === item.url) return true;
    if (item.items && item.items.length) {
      return item.items.some((child) => isItemActive(child));
    }
    return false;
  }, [location.pathname]);
  return isItemActive;
}

// ---- Flyout list used only in collapsed mode ----
function FlyoutList({ items }: { items: NavNode[] }) {
  const isItemActive = useIsActiveChecker();

  return (
    <ul className="py-1">
      {items.map((item) => {
        const hasChildren = !!item.items?.length;
        const active = isItemActive(item);
        const Icon = item.icon;

        if (!hasChildren) {
          return (
            <li key={item.title}>
              {isToggleOnly(item) ? (
                // Toggle-only leaf (rare): just render a non-link button
                <button
                  type="button"
                  className={[
                    "flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-sm my-1",
                    "hover:bg-accent hover:text-accent-foreground focus:outline-none",
                    active ? "bg-primary/30 text-black dark:text-primary" : "",
                  ].join(" ")}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{item.title}</span>
                </button>
              ) : (
                <Link
                  to={item.url}
                  className={[
                    "flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-sm my-1",
                    "hover:bg-accent hover:text-accent-foreground focus:outline-none",
                    active ? "bg-primary/30 text-black dark:text-primary" : "",
                  ].join(" ")}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{item.title}</span>
                </Link>
              )}
            </li>
          );
        }

        // Item with children: nested popover opening to the right
        return (
          <li key={item.title} className="relative">
            <HoverPopover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={[
                    "flex w-full items-center gap-2 px-2 py-1.5 rounded-md text-sm my-1",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none",
                    active ? "bg-primary/30 text-black dark:text-primary" : "",
                  ].join(" ")}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate flex-1 text-left">{item.title}</span>
                  <ChevronRight className="ml-2 h-4 w-4 opacity-70" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="right"
                sideOffset={8}
                alignOffset={-4}
                className={[
                  "p-1",
                  "shadow-lg border rounded-md w-auto text-popover-foreground",
                ].join(" ")}
              >
                <FlyoutList items={item.items!} />
              </PopoverContent>
            </HoverPopover>
          </li>
        );
      })}
    </ul>
  );
}

// ---- HoverPopover: controlled Popover that opens on hover with delays ----
function HoverPopover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const openTimer = React.useRef<number | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const onEnter = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    openTimer.current = window.setTimeout(() => setOpen(true), OPEN_DELAY);
  };

  const onLeave = () => {
    if (openTimer.current) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  React.useEffect(() => clearTimers, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </div>
    </Popover>
  );
}

// ---- Open-mode recursive renderer (uses Collapsible exactly like your current UX) ----
function OpenModeSubtree({ items }: { items: NavNode[] }) {
  const isItemActive = useIsActiveChecker();

  return (
    <SidebarMenuSub>
      {items.map((item) => {
        const hasChildren = !!item.items?.length;
        const active = isItemActive(item);
        const Icon = item.icon;

        return (
          <SidebarMenuSubItem key={item.title}>
            {hasChildren ? (
              <Collapsible asChild defaultOpen={active} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {/* If url === "#", render a button so the WHOLE row toggles */}
                    {isToggleOnly(item) ? (
                      <SidebarMenuSubButton className="cursor-pointer" asChild>
                        <button type="button" className="flex items-center w-full">
                          {Icon && <Icon className="size-4 mr-2" />}
                          <span className="truncate flex-1 text-left">{item.title}</span>
                          <ChevronRight className="ml-2 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </button>
                      </SidebarMenuSubButton>
                    ) : (
                      <SidebarMenuSubButton className="cursor-pointer" asChild>
                        <div className="flex items-center w-full">
                          <Link to={item.url} className="flex items-center gap-2 flex-1 min-w-0">
                            {Icon && <Icon className="size-4" />}
                            <span className="truncate">{item.title}</span>
                          </Link>
                          <ChevronRight className="ml-2 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                      </SidebarMenuSubButton>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <OpenModeSubtree items={item.items!} />
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuSubButton
                className={["cursor-pointer", active ? "bg-primary/30 text-black dark:text-primary" : ""].join(" ")}
                asChild
              >
                {isToggleOnly(item) ? (
                  // Leaf with "#": render inert button
                  <button type="button" className="flex items-center gap-2 min-w-0">
                    {Icon && <Icon className="size-4" />}
                    <span className="truncate">{item.title}</span>
                  </button>
                ) : (
                  <Link to={item.url} className="flex items-center gap-2 min-w-0">
                    {Icon && <Icon className="size-4" />}
                    <span className="truncate">{item.title}</span>
                  </Link>
                )}
              </SidebarMenuSubButton>
            )}
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}

export function NavMain({ items }: NavMainProps) {
  const { sidebarOpen } = useUserStore();
  const isItemActive = useIsActiveChecker();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;
          const active = isItemActive(item);
          const Icon = item.icon;

          // Collapsed mode: icons only -> hover flyouts
          if (!sidebarOpen) {
            return (
              <SidebarMenuItem key={item.title}>
                {hasChildren ? (
                  <HoverPopover>
                    <PopoverTrigger asChild>
                      <SidebarMenuButton className="relative">
                        {Icon && <Icon />}
                        <span className="truncate">{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                      </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent
                      side="right"
                      align="start"
                      sideOffset={8}
                      alignOffset={-4}
                      className="p-1 shadow-lg border rounded-md bg-popover text-popover-foreground"
                    >
                      <div className="px-2 py-1.5 text-sm font-medium opacity-70">{item.title}</div>
                      <FlyoutList items={item.items!} />
                    </PopoverContent>
                  </HoverPopover>
                ) : (
                  <SidebarMenuButton asChild className="relative">
                    {isToggleOnly(item) ? (
                      <button type="button" className="flex items-center gap-2">
                        {Icon && <Icon />}
                        <span className="truncate">{item.title}</span>
                      </button>
                    ) : (
                      <Link to={item.url} className="flex items-center gap-2">
                        {Icon && <Icon />}
                        <span className="truncate">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          }

          // Open mode: existing collapsible behavior
          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible asChild defaultOpen={active} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {/* If url === "#", make the WHOLE row a button that toggles */}
                      {isToggleOnly(item) ? (
                        <SidebarMenuButton className="relative" asChild>
                          <button type="button" className="flex w-full items-center">
                            {Icon && <Icon />}
                            <span className="truncate">{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </button>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton className="relative">
                          {Icon && <Icon />}
                          <span className="truncate">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <OpenModeSubtree items={item.items!} />
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild className="relative">
                  {isToggleOnly(item) ? (
                    <button type="button" className="flex items-center gap-2">
                      {Icon && <Icon />}
                      <span className="truncate">{item.title}</span>
                    </button>
                  ) : (
                    <Link to={item.url} className="flex items-center gap-2">
                      {Icon && <Icon />}
                      <span className="truncate">{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
