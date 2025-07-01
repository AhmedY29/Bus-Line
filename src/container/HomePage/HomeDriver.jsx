import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";

function HomeDriver() {
  return (
    <div className="bg-[#F5F7FA] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-2/5 bg-[#0165AD] flex items-center justify-center p-6 rounded-br-4xl rounded-tl-4xl">
            <img
              src="Driver.png"
              alt="Bus Driver"
              className="h-32 md:h-60 object-contain filter brightness-0 invert"
            />
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Empowering Drivers to Serve Students
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              We empower bus drivers by providing a platform where they can
              easily register, manage their schedules, and serve students with
              ease.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-green-100">
                  <MdOutlineAttachMoney className="text-lg text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Wealth Management
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-blue-100">
                  <FaHandsHelping className="text-lg text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Student Support
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-yellow-100">
                  <HiMiniCalendarDateRange className="text-lg text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Schedule Management
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-indigo-100">
                  <FaRegAddressCard className="text-lg text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Easy Registration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDriver;
