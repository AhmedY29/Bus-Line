import React from "react";
import { FaUsers } from "react-icons/fa";
import { LuBusFront } from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";

function HomeStudent() {
  return (
    <div className="bg-[rgb(255,255,255)] flex flex-wrap justify-center gap-5 items-center w-full h-full py-5  md:py-15 lg:py-25">
      <p className="w-full text-lg md:text-xl lg:text-3xl text-center text-gray-900 font-bold pb-5">
        Seamless and Comfortable Travel with <br /> Our Bus Booking System
      </p>
      {/* Feature Cards */}
      {/* Card 1 */}
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg w-72 h-52 hover:scale-105 transition-all duration-500 hover:shadow-xl">
        <div className="h-12 w-12 bg-[#0165AD] rounded-br-2xl rounded-tl-2xl flex items-center justify-center">
          <FaUsers className="text-white text-3xl" />
        </div>
        <h1 className="text-gray-900 font-semibold text-base md:text-lg lg:text-xl text-center">
          Quick and Easy Booking
        </h1>
        <p className="text-gray-600 text-xs md:text-sm lg:text-sm text-center">
          With our simple interface, reserve your seat in less than a minute.
        </p>
      </div>
      {/* Card 2 */}
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg w-72 h-52 hover:scale-105 transition-all duration-500 hover:shadow-xl">
        <div className="h-12 w-12 bg-[#0165AD] rounded-br-2xl rounded-tl-2xl flex items-center justify-center">
          <LuBusFront className="text-white text-3xl" />
        </div>
        <h1 className="text-gray-900 font-semibold text-base md:text-lg lg:text-xl text-center">
          Live Bus Tracking
        </h1>
        <p className="text-gray-600 text-xs md:text-sm lg:text-sm text-center">
          Track your bus in real-time to ensure a smooth ride.{" "}
        </p>
      </div>
      {/* Card 3 */}
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg w-72 h-52 hover:scale-105 transition-all duration-500 hover:shadow-xl">
        <div className="h-12 w-12 bg-[#0165AD] rounded-br-2xl rounded-tl-2xl flex items-center justify-center">
          <FaHandHoldingUsd className="text-white text-3xl" />
        </div>
        <h1 className="text-gray-900 font-semibold text-base md:text-lg lg:text-xl text-center">
          Secure and Convenient Payments
        </h1>
        <p className="text-gray-600 text-xs md:text-sm lg:text-sm text-center">
          Multiple safe and easy payment options at your fingertips.
        </p>
      </div>
    </div>
  );
}

export default HomeStudent;
