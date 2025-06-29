import React from "react";
import { useLocation } from "react-router";

function Nav() {

  const location = useLocation();

  const getPageName = () => {
    const path = location.pathname;
    const segments = path.split("/").filter((segment) => segment !== "");

    if (segments.length === 0) return "Dashboard";

    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <nav className="bg-white border-b border-gray-200 w-full px-4 h-[10vh] flex items-center  ">
      <h1 className="text-xl font-semibold text-gray-800">{getPageName()}</h1>
    </nav>
  );

}

export default Nav;
