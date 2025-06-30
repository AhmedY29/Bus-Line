
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



  )}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <DriverDashboardPage /> },
    ],
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
    path: "/driver",
    element: <Layout />,
    children: [
      { index: true, element: <DriverDashboardPage /> },
      { path: "driverTrips", element: <DriverTrips /> },
      { path: "driversPassenger", element: <Passengers /> },
      { path: "driverReport", element: <Report /> },
     
    ],
  },



  

]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;