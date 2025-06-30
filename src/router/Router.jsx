
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
import StudentChat from "../container/driverContainerPages/StudentChat/StudentChat";
import MultiStepForm from "../container/driverContainerPages/driverSignupContainer/MultiStepForm";

import StudentLayout from "./layouts/StudentLayout";
import studentRoutes from "./studentRoutes";

function Layout({ role }) {
  return (
    
    <div className="  bg-[#F5F7FA]" >
    <div className=" md:fixed  inset-y-0 left-0 z-50 shadow-md ">
{role === 'admin' && <SideBar />}
{role === 'driver' && <DriverSidebar />}
</div>
    

<main className="bg-[#F5F7FA]  overflow-auto h-screen md:ml-60 ">
        <Nav  />
        <Outlet />
      </main>
    </div>
  )}
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

    element: <Layout role="driver" />, 
    children: [
      { index: true, element: <DriverDashboardPage /> },
    ],

    
    element: <Login />,

    element: <Layout />, 
    children: [
      { index: true, element: <DriverDashboardPage /> },
    ],

  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "driver-register", element: <MultiStepForm /> },



  {
    path: "/admin",
    element: <Layout role="admin" />, 
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
    element: <Layout role="driver" />, 
    children: [
      { index: true, element: <DriverDashboardPage /> },
      { path: "dashboard", element: <DriverDashboardPage /> },
      { path: "trips", element: <DriverTrips /> },
      { path: "passengers", element: <Passengers /> },
      { path: "requests", element: <Request /> },
      { path: "reports", element: <Report /> },
      { path: "reports", element: <Profile /> },
      { path: "messages", element: <StudentChat /> },
      { path: "settings", element: <Profile /> },
     
    ],
  },
  {

    path: "/student",
    element: <StudentLayout />,
    children: studentRoutes
  }

  

]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;