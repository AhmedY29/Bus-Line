import { Link, Outlet } from "react-router";
import { AppSidebar } from "@/components/student/app-sidebar";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import axios from "axios";

export default function StudentLayout() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io("https://bus-line-backend.onrender.com", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("bus-nearby", (data) => {
      toast.success(data.message || "🚍 الباص اقترب منك!");
    });

    socket.on("new-message", (msg) => {
      toast(
        `💬 رسالة جديدة من ${msg.sender?.name || "المستخدم"}: ${msg.content}`
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications(res.data.notifications);
    } catch (err) {
      console.error("خطأ في جلب الإشعارات", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  return (
    <SidebarProvider>
      {/* Container should take full viewport height and be flex */}
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/student">
                      Student Portal
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Right aligned space for avatar, notifications */}
            <div className="ml-auto flex items-center gap-4">
              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-2">
                    <BellIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Notifications</span>
                    {notifications.some((n) => !n.isRead) && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>🚌 Your trip has started</DropdownMenuItem>
                  <DropdownMenuItem>✅ Booking confirmed</DropdownMenuItem>
                  <DropdownMenuItem>⚠️ Bus delay reported</DropdownMenuItem> */}
                  {notifications
                    .filter((notification) => notification.isRead == false)
                    ?.map((notification) => (
                      <Link key={notification._id} to={"notifications"}>
                        <DropdownMenuItem>
                          {notification.title}
                        </DropdownMenuItem>
                      </Link>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Avatar with Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src="/avatar.jpg" alt="User avatar" />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/student/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/student/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    className="text-red-500"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
