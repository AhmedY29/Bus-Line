import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../components/Nav";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SideBar from "../components/SideBar";
import Users from "../page/adminPages/Users";
import Drivers from "../page/adminPages/Drivers";
import Buses from "../page/adminPages/Buses";
import Tracking from "../page/adminPages/Tracking";
import Trips from "../page/adminPages/Trips";
import DriversChat from "../container/adminContainerPages/DriversContainerPage/DriversChat";
import DriverDashboardPage from "../pages/driverPages/DriverDashboard";
import DriverTrips from "../pages/driverPages/DriverTrips";
import Passengers from "../pages/driverPages/Passengers";
import Report from "../pages/driverPages/Report";
import DriverSidebar from "../container/driverContainerPages/DashboardContainer/DriverSidebar";
import Request from "../pages/driverPages/Request";
import Profile from "../auth/Profile";
import studentRoutes from "./studentRoutes";
import StudentLayout from "../layouts/StudentLayout";
import StudentChat from "../container/driverContainerPages/StudentChat/StudentChat";
import MultiStepForm from "../container/driverContainerPages/driverSignupContainer/MultiStepForm";
import Home from "../page/Home";
import ProtectedRoute from "./ProtectedRoute";
import { FormProvider } from "../context/driverForm";
import Destinations from "../page/adminPages/Destinations";
import StudentConversations from "@/page/studentPages/conversations/StudentConversations";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout({ role }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io("https://bus-line-backend.onrender.com", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on("bus-nearby", (data) => {
      toast.success(data?.message || "🚍 الباص اقترب منك!");
    });

    socket.on("new-message", (msg) => {
      toast(
        `💬 رسالة جديدة من ${msg?.sender?.name || "المستخدم"}: ${msg?.content}`
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

      setNotifications(res.data?.notifications);
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
    <div className="  bg-[#F5F7FA]">
      <div className=" md:fixed  inset-y-0 left-0 z-50 shadow-md ">
        {role === "admin" && <SideBar />}
        {role === "driver" && <DriverSidebar />}
      </div>

      <main className="bg-[#F5F7FA]  overflow-auto h-screen md:ml-60 ">
        <Nav />
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/driver-register",
    element: (
      <FormProvider>
        <MultiStepForm />
      </FormProvider>
    ),
  },

  // Admin Protected Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Layout role="admin" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Users /> },
      { path: "users", element: <Users /> },
      { path: "drivers", element: <Drivers /> },
      { path: "drivers/chat", element: <DriversChat /> },
      { path: "buses", element: <Buses /> },
      { path: "tracking", element: <Tracking /> },
      { path: "trips", element: <Trips /> },
      { path: "destinations", element: <Destinations /> },
    ],
  },

  // Driver Protected Routes
  {
    path: "/driver",
    element: (
      <ProtectedRoute allowedRoles={["driver"]}>
        <Layout role="driver" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DriverDashboardPage /> },
      { path: "dashboard", element: <DriverDashboardPage /> },
      { path: "trips", element: <DriverTrips /> },
      { path: "passengers", element: <Passengers /> },
      { path: "requests", element: <Request /> },
      { path: "reports", element: <Report /> },
      { path: "reports", element: <Profile /> },
      { path: "messages", element: <StudentConversations /> },
      { path: "settings", element: <Profile /> },
    ],
  },

  // Student Protected Routes
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: studentRoutes,
  },

  // Parent Protected Routes (if you have parent routes)
  // {
  //   path: "/parent",
  //   element: (
  //     <ProtectedRoute allowedRoles={["parent"]}>
  //       <ParentLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: parentRoutes,
  // },

  // Public Routes
  {
    path: "/",
    element: <Home />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
