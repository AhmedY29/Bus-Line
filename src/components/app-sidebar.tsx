import * as React from "react"
import {
  BookOpen,
  Bot,
  Bus,
  // Command,
  // Frame,
  // LifeBuoy,
  Map,
  // PieChart,
  // Send,
  Settings2,
  // ShieldCheck,
  SquareTerminal,
  Timer,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut, /*Settings*/ MessageCircle } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: SquareTerminal,
      items: [],
    },
    {
      title: "Booking",
      url: "/student/new-booking",
      icon: Bot,
      items: [
        {
          title: "New Booking",
          url: "/student/new-booking",
        },
        {
          title: "Booking History",
          url: "/student/history",
        },
        {
          title: "Booking Confirmation",
          url: "/student/confirmation",
        },
      ],
    },
    {
      title: "Payments",
      url: "/student/payment",
      icon: BookOpen,
      items: [
        {
          title: "Payment Page",
          url: "/student/payment",
        },
        {
          title: "Select Payment Method",
          url: "/student/payment-method",
        },
        {
          title: "Payment Confirmation",
          url: "/student/confirmation",
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
        },
        {
          title: "Rate Driver",
          url: "/student/rating",
        },
        {
          title: "Chat with Driver",
          url: "/student/chat",
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
        },
        {
          title: "Notifications",
          url: "/student/notifications",
        },
        {
          title: "Settings",
          url: "/student/settings",
        },
      ],
    },
  ],
  

}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Bus className="size-6" />
                </div>
                <div className="flex flex-col flex-1 text-left">
            <span className="truncate font-bold text-lg">Bus Line</span>

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
          <Button variant="ghost" className="w-full justify-start relative">
            <MessageCircle className="mr-2 h-4 w-4" />
            Messages
            {/* Badge */}
            <span className="absolute top-1 right-3 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              3
            </span>
          </Button>
          {/* Settings Button */}
          <Button variant="ghost" className="w-full justify-start relative">
            <Settings2 className="mr-2 h-4 w-4" />
            Settings
          </Button>



          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => {
              // Logout logic
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}