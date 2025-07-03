import React from "react";
import BookingCardNew from "../../components/BookingCardNew";
import MobileBookingCard from "../../components/MobileBookingCard";

function HomeBook() {
  return (
    <div
      id="homeBook"
      className="bg-[#f4f7fa] flex flex-col justify-center items-center w-full  "
    >
      <div className="w-full justify-center items-center">
        <h1 className="text-lg md:text-2xl lg:text-3xl text-center text-gray-900 font-bold py-10 ">
          Best Packages For You
        </h1>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-[url('/worldMap.png')] bg-no-repeat bg-left w-full  md:py-0  flex justify-center lg:justify-end items-center px-2 md:px-4 lg:px-8 relative">
          <div className="absolute inset-0 w-1/3 hidden lg:block">
            {/* Dot 1 */}
            <div className="absolute top-[350px] left-[275px] w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            {/* Dot 2 */}
            <div className="absolute top-[300px] left-[500px] w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            {/* Dot 3 */}
            <div className="absolute top-[350px] left-[400px] w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            {/* Dot 4 */}
            <div className="absolute top-[225px] left-[150px] w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
            {/* Dot 5 */}
            <div className="absolute top-[225px] left-[375px] w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="flex flex-col justify-center gap-5 w-full md:w-11/12 lg:w-1/2 pb-10">
            <BookingCardNew />
            <BookingCardNew
              discount="15% OFF"
              savings="Save $15"
              price="299"
              driverName="Mohammed"
              rating="4.8"
              fromLocation="Riyadh"
              toLocation="King Saud University"
              departureTime="07:30AM"
              arrivalTime="17:45PM"
            />
            <BookingCardNew
              discount="25% OFF"
              savings="Save $25"
              price="449"
              driverName="Ahmed"
              rating="4.7"
              fromLocation="Olaya"
              toLocation="PNU Campus"
              departureTime="08:15AM"
              arrivalTime="18:00PM"
            />
            <MobileBookingCard />

            <MobileBookingCard
              discount="15% OFF"
              savings="Save $15"
              price="299"
              driverName="Mohammed"
              rating="4.8"
              fromLocation="Riyadh"
              toLocation="King Saud University"
              departureTime="07:30AM"
              arrivalTime="17:45PM"
            />

            <MobileBookingCard
              discount="25% OFF"
              savings="Save $25"
              price="449"
              driverName="Ahmed"
              rating="4.7"
              fromLocation="Olaya"
              toLocation="PNU Campus"
              departureTime="08:15AM"
              arrivalTime="18:00PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBook;
