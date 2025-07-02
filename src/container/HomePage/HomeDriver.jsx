import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaHandsHelping } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { BsBusFront } from "react-icons/bs";
import { PiPlant } from "react-icons/pi";
import { FaRegMap } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

function HomeDriver() {
  return (
    <div className="bg-[rgb(255,255,255)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Empowering Drivers to Serve Students
          </h1>
          <p className="text-xl text-gray-600">Easy and Fast</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 ">
          {/* Left Side - Features */}
          <div className="lg:w-6/12 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                <FaRegAddressCard className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Easy Registration
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simplified registration process for drivers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Helping Students
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ensuring drivers provide safe and reliable transport for
                  students.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center">
                <HiMiniCalendarDateRange className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Centralized Management
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamlined system for managing driver assignments and
                  schedules.
                </p>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="md:w-3/5 lg:w-4/12  ">
            <div
              className="bg-white rounded-3xl p-2  "
              style={{
                boxShadow: "10px 0px 20px 0px rgba(216,234,246,0.6)",
              }}
            >
              {/* Driver */}
              <div className="flex justify-center  mb-8">
                <img
                  src="DriverBlue.png"
                  alt="Bus Driver"
                  className="h-full  object-contain"
                />
              </div>
              {/* Driver Stats */}{" "}
              <div className=" w-full flex flex-col  justify-center p-4 gap-5 rounded-2xl">
                <span className="text-neutral-900 text-sm md:text-base lg:text-lg">
                  14-29 June | 25 Drivers
                </span>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center bg-neutral-100 rounded-full p-2">
                    <PiPlant className="text-neutral-500 text-lg" />
                  </div>
                  <div className="flex items-center bg-neutral-100 rounded-full p-2">
                    <FaRegMap className="text-neutral-500 text-lg" />
                  </div>
                  <div className="flex items-center bg-neutral-100 rounded-full p-2">
                    <IoPaperPlaneOutline className="text-neutral-500 text-lg" />
                  </div>
                </div>

                <div className="flex items-center">
                  <BsBusFront className="text-neutral-500 text-lg mr-2" />
                  <span className="text-neutral-900 text-sm md:text-base lg:text-lg">
                    24 Trips
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDriver;
