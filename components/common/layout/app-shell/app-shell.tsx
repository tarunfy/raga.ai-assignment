"use client";

import {
  ChartBarIcon,
  HeartbeatIcon,
  HouseLineIcon,
  MoonIcon,
  SignOutIcon,
  SunDimIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar/avatar";
import { Button } from "@/components/ui/button/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { NotificationAutomation } from "@/features/notifications/components/notification-automation/notification-automation";
import { NotificationBell } from "@/features/notifications/components/notification-bell/notification-bell";
import { useUser } from "@/hooks/use-user";
import { cn, formatDate, getInitials } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

interface NavigationItem {
  href: string;
  icon: typeof HouseLineIcon;
  label: string;
}

const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    icon: HouseLineIcon,
    label: "Dashboard",
  },
  {
    href: "/analytics",
    icon: ChartBarIcon,
    label: "Analytics",
  },
  {
    href: "/patients",
    icon: UsersThreeIcon,
    label: "Patients",
  },
];

/**
 * Returns the shell title for the current protected route.
 *
 * @param pathname - The current application pathname
 */
const getPageTitle = (pathname: string) => {
  if (pathname.startsWith("/patients/")) {
    return "Patient details";
  }

  switch (pathname) {
    case "/analytics":
      return "Analytics";
    case "/patients":
      return "Patients";
    default:
      return "Dashboard";
  }
};

/**
 * Provides the authenticated shell using the shadcn sidebar block primitives.
 *
 * @param children - The protected route content rendered inside the shell
 */
export const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { signOutUser, user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out successfully.");
    } catch {
      toast.error("We could not sign you out. Please try again.");
    }
  };

  return (
    <SidebarProvider>
      <NotificationAutomation />
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-14 items-center justify-center border-sidebar-border border-b">
          <div className="flex w-full items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
            <div className="flex size-8 shrink-0 items-center justify-center border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground">
              <HeartbeatIcon className="size-4" />
            </div>
            <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-heading font-semibold text-sm">
                AegisCare
              </span>
              <span className="truncate text-sidebar-foreground/70 text-xs">
                Healthcare SaaS
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href === "/patients" &&
                  pathname.startsWith("/patients/"));

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-sidebar-border border-t">
          <div className="flex flex-col gap-3 px-2 py-2 group-data-[collapsible=icon]:py-3">
            <div className="border border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-3">
                <Avatar className="size-9 rounded-none after:rounded-none">
                  <AvatarFallback className="rounded-none">
                    {getInitials(user?.email ?? "care.team@aegiscare.app")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium text-sidebar-foreground text-sm">
                    {user?.email ?? "care.team@aegiscare.app"}
                  </p>
                  <p className="text-sidebar-foreground/70 text-xs">
                    Signed in
                  </p>
                </div>
              </div>
            </div>
            <SidebarMenu>
              <SidebarMenuItem className="w-full">
                <SidebarMenuButton
                  className="shrink-0 border"
                  onClick={handleSignOut}
                  tooltip="Logout"
                >
                  <SignOutIcon className="size-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-h-screen">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-heading font-semibold text-lg">
              {pageTitle}
            </h1>
          </div>
          <p className="hidden text-muted-foreground text-sm lg:block">
            {formatDate(new Date().toISOString(), {
              day: "numeric",
              month: "long",
              weekday: "long",
            })}
          </p>
          <NotificationBell />
          <div className="flex items-center border border-border">
            <Button
              aria-label="Switch to light theme"
              className={cn(
                "border-0",
                isMounted && resolvedTheme === "light"
                  ? ""
                  : "bg-transparent shadow-none"
              )}
              onClick={() => setTheme("light")}
              size="icon-sm"
              variant={
                isMounted && resolvedTheme === "light" ? "secondary" : "ghost"
              }
            >
              <SunDimIcon className="size-4" />
            </Button>
            <Button
              aria-label="Switch to dark theme"
              className={cn(
                "border-0 border-border border-l",
                isMounted && resolvedTheme === "dark"
                  ? ""
                  : "bg-transparent shadow-none"
              )}
              onClick={() => setTheme("dark")}
              size="icon-sm"
              variant={
                isMounted && resolvedTheme === "dark" ? "secondary" : "ghost"
              }
            >
              <MoonIcon className="size-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
