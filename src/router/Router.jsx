import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../componetn/Nav";
import Footer from "../componetn/Footer";
import Home from "../page/Home";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
