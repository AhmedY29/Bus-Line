import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Login from "../auth/Login";
import Register from "../auth/Register";
function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

 
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
