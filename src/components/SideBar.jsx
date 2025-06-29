import React from "react";
import { HiMap, HiCog, HiLogout } from "react-icons/hi";
import { LuBus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineDirectionsBusFilled } from "react-icons/md";

import { Link, useLocation } from "react-router";

function SideBar() {
  const location = useLocation();

  const adminMenuItems = [
    { icon: FaUserFriends, label: "Users" },
    { icon: MdOutlineDirectionsBusFilled, label: "Drivers" },
    { icon: LuBus, label: "Buses" },
    { icon: IoLocationOutline, label: "Tracking" },
    { icon: HiMap, label: "Trips" },
  ];

  const adminBottomItems = [
    { icon: HiOutlineChatAlt2, label: "Messages" },
    { icon: HiCog, label: "Settings" },
  ];

  return (
    <div className="flex flex-col w-64 justify-between h-screen bg-white text-neutral-900 border-r border-gray-200">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <img src="/Logo.png" alt="Logo" className="w-10 h-10 mr-2" />
            <h1 className="text-lg font-semibold text-gray-800">Bus Line</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="flex flex-col gap-2 px-3 py-4">
          {adminMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive =
              location.pathname === `/admin/${item.label.toLowerCase()}`;
            return (
              <li key={index}>
                <Link
                  to={`/admin/${item.label.toLowerCase()}`}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors  gap-2 pr-6 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 "
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="text-xl" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Items */}
      <ul className="flex flex-col gap-2 px-3 py-4">
        {adminBottomItems.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <li key={index}>
              <Link
                to={`/admin/${item.label.toLowerCase()}`}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors  gap-2 pr-6 ${"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <IconComponent className="text-xl" />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            to="/login"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 gap-2 pr-6"
          >
            <HiLogout className="text-xl" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
