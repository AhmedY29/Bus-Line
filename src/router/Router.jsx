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
      { path: "buses", element: <Buses /> },
      { path: "tracking", element: <Tracking /> },
      { path: "trips", element: <Trips /> },
    ],
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
