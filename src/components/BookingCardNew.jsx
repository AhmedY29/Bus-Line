import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router";

function BookingCardNew({
  discount = "20% OFF",
  savings = "Save $10",
  price = "400",
  currency = "SAR",
  driverName = "Ali",
  rating = "4.5",
  fromLocation = "Alhamra",
  toLocation = "Princess Noura",
  departureTime = "08:00AM",
  arrivalTime = "12:00PM",
}) {
  const navigate = useNavigate();

  return (
    <div className="md:flex rounded-xl bg-neutral-50 h-45 hidden hover:scale-105 transition-all duration-500 hover:shadow-lg">
      <div className="flex flex-col items-center justify-evenly w-1/3 bg-neutral-50 rounded-2xl">
        <div className="flex gap-8 items-center justify-center">
          <div className="flex flex-col">
            <p className="text-red-500 font-bold">{discount}</p>
            <p className="text-gray-500 font-semibold text-sm">{savings}</p>
          </div>
          <div className="flex gap-1 items-center ">
            <p className="text-gray-900 font-bold text-2xl">{price}</p>
            <p className="text-gray-500 text-sm">{currency}</p>
          </div>
        </div>
        <button
          className=" text-white w-1/2 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer bg-[#0165AD] hover:bg-[#0165add2] transition-colors"
          onClick={() => navigate("/register")}
        >
          Learn More
        </button>
      </div>
      <div className="flex flex-col w-2/3 bg-white rounded-r-xl p-8 justify-between">
        {/* Driver Info */}
        <div className="flex justify-start items-center border-b-2 border-gray-200 ">
          <span className="text-gray-900 font-medium pr-1.5">{driverName}</span>
          <div className="flex items-center gap-1 pl-1.5 border-l-2 border-gray-200">
            <span className="text-gray-600 text-sm">Rating:</span>
            <span className="text-orange-500 font-medium">{rating}</span>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between px-5">
          <span className="text-gray-900 font-semibold">{fromLocation}</span>
          <FaChevronRight className="text-gray-900" />
          <span className="text-gray-900 font-semibold">{toLocation}</span>
        </div>

        {/* Time with dotted line */}
        <div className="flex items-center justify-between px-5">
          <span className="text-gray-900 font-medium">{departureTime}</span>
          <div className="flex-1 h-px bg-gray-300 mx-5"></div>
          <span className="text-gray-900 font-medium">{arrivalTime}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingCardNew;
