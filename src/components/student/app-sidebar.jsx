import * as React from "react";
import {
  BookOpen,
  Bot,
  Bus,
  Calendar1Icon,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  ShieldCheck,
  SquareTerminal,
  Timer,
} from "lucide-react";
import { Link } from "react-router";

import { NavMain } from "@/components/student/nav-main";
import { NavProjects } from "@/components/student/nav-projects";
import { NavSecondary } from "@/components/student/nav-secondary";
import { NavUser } from "@/components/student/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, MessageCircle } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/student",
      icon: SquareTerminal,
      items: [],
    },
    {
      title: "Booking",
      icon: Calendar1Icon,
      items: [
        {
          title: "New Booking",
          url: "/student/new-booking",
          icon: Calendar1Icon,
        },
        {
          title: "Booking History",
          url: "/student/bookings",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Trip Tools",
      url: "/student/tracking",
      icon: Map,
      items: [
        {
          title: "Live Tracking",
          url: "/student/tracking",
          icon: Map,
        },
        {
          title: "Rate Driver",
          url: "/student/rate-trip",
          icon: PieChart,
        },
        {
          title: "Chat with Driver",
          url: "/student/chat",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Account",
      url: "/student/profile",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/student/profile",
          icon: ShieldCheck,
        },
        {
          title: "Notifications",
          url: "/student/notifications",
          icon: Send,
        },
        {
          title: "Settings",
          url: "/student/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                  <img src="/Logo.png" alt="Logo" className="w-10 h-10" />
                </div>
                <div className="flex flex-col flex-1 text-left">
                  <span className="truncate font-bold text-lg">BusLine</span>

                  {/* First Slogan */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Timer className="h-3 w-3" />
                    <span>On Time, Every Time</span>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2  py-2">
          {/* Messaging Button with badge */}

          <Link to="/student/chat" className="w-full">
            <Button variant="ghost" className="w-full justify-start relative">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
              {/* Badge */}
              <span className="absolute top-3 right-3 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                3
              </span>
            </Button>
          </Link>

          <Button
            // variant="destructive"
            className="w-full justify-start bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              // Logout logic
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
