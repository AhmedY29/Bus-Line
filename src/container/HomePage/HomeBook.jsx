import React from "react";
import BookingCardNew from "../../components/BookingCardNew";
import MobileBookingCard from "../../components/MobileBookingCard";

function HomeBook() {
  return (
    <div className="bg-[#f4f7fa] flex justify-center items-center w-full ">
      <div className="bg-[url('/worldMap.png')] bg-no-repeat bg-left w-full h-full py-10 md:py-0 md:h-screen flex justify-center lg:justify-end items-center px-2 md:px-4 lg:px-8">
        <div className="flex flex-col justify-center   gap-5 w-full md:w-11/12 lg:w-1/2">
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
  );
}

export default HomeBook;
