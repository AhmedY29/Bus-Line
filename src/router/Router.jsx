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
import StudentLayout from "@/layouts/StudentLayout";
import studentRoutes from "./studentRoutes";

function Layout() {
  return (
    <>
      <div className="flex md:flex-row flex-col ">
        <SideBar />
        <div className="w-full">
          <Nav />
          <Outlet />
        </div>
      </div>
    </>
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
    path: "/admin",
    element: <Layout />,
    children: [
      { index: true, element: <Users /> },
      { path: "users", element: <Users /> },
      { path: "drivers", element: <Drivers /> },
      { path: "drivers/chat", element: <DriversChat /> },
      { path: "buses", element: <Buses /> },
      { path: "tracking", element: <Tracking /> },
      { path: "trips", element: <Trips /> },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: studentRoutes
  }
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
