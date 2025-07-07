import React, { useState } from "react";
import { HiMap, HiCog, HiLogout, HiMenu, HiX } from "react-icons/hi";
import { LuBus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineDirectionsBusFilled } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";
function DriverSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const adminMenuItems = [
    { icon: FaUserFriends, label: "Dashboard" },
    { icon: MdOutlineDirectionsBusFilled, label: "Trips" },
    { icon: LuBus, label: "Passengers" },
    { icon: IoLocationOutline, label: "Requests" },
    { icon: HiMap, label: "Reports" },
  ];

  const adminBottomItems = [
    { icon: HiOutlineChatAlt2, label: "Messages" },
    { icon: HiCog, label: "Settings" },
  ];

  return (
    <div className="flex flex-col w-full md:w-50 lg:w-60 bg-white text-neutral-900 border-r border-gray-200">
      <div className="flex items-center h-[10vh] px-4 ">
        <div className="flex items-center">
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="text-xl" />
            ) : (
              <HiMenu className="text-xl" />
            )}
          </button>
          <img src="/Logo.png" alt="Logo" className="w-15 h-15 mr-2" />
          <h1 className="text-lg font-semibold text-gray-800">BusLine</h1>
        </div>
      </div>

      <div
        className={`md:flex flex-col  justify-between h-[90vh] ${
          isMobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <ul className={`flex flex-col gap-2 px-3 py-4`}>
          {adminMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive =
              location.pathname === `/driver/${item.label.toLowerCase()}`;
            return (
              <li key={index}>
                <Link
                  to={`/driver/${item.label.toLowerCase()}`}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors  gap-2 pr-6 ${
                    isActive
                      ? "bg-blue-50 text-blue-500] "
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

        {/* Bottom Items */}
        <ul className="flex flex-col gap-2 px-3 py-4">
          {adminBottomItems.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <li key={index}>
                <Link
                  to={`/driver/${item.label.toLowerCase()}`}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors  gap-2 pr-6 ${"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <IconComponent className="text-xl" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 gap-2 pr-6 cursor-pointer"
            onClick={() => {
       toast(
                (t) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                      <IoIosInformationCircleOutline className="inline-block mr-1 text-2xl text-red-500" />
                      <h1 className="font-bold">Warning!</h1>
                    </div>
                    <p className="text-xs md:text-base lg:text-lg text-gray-900">
                      Are you sure you want to logout?
                    </p>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          toast.dismiss(t.id);
                          localStorage.removeItem("user");
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ),
                {
                  duration: 5000,
                }
              );

            }}
          >
            <HiLogout className="text-xl" />
            Logout
          </li>
        </ul>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-white",
            color: "text-neutral-900",
          },
        }}
      />
    </div>
  );
}

export default DriverSidebar;
