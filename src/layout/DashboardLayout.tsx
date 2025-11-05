import { AppSidebar } from "@/components/shared/AppSidebar";
import { ModeToggle } from "@/components/shared/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/userStore";
import { Link, Outlet, useLocation } from "react-router";

export default function DashboardLayout() {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segments) => segments !== "");
  const { sidebarOpen, setSidebarOpen } = useUserStore();

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={() => setSidebarOpen(!sidebarOpen)}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full justify-between items-center gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments.map((segments, index) => {
                    const href =
                      "/" + pathSegments.slice(0, index + 1).join("/");
                    const isLast = index === pathSegments.length - 1;

                    return (
                      <BreadcrumbItem key={href}>
                        {index !== 0 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        {isLast ? (
                          <BreadcrumbPage className="capitalize">
                            {segments}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild className="capitalize">
                            <Link to={href}>{segments}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
