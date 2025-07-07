import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { FaBus } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { MdGroupOff } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import axios from "axios";

const StatsCards = () => {
  const [passengers, setPassengers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchMyPassengers = async () => {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/bookings/booking-passengers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data.passengers.length, "ddd");
      setPassengers(res.data.passengers);
    };
    const fetchMyTrips = async () => {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/trips/driver-trips",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrips(res.data.trips);
    };

    fetchMyPassengers();
    fetchMyTrips();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-7 ">
      <StatCard
        title="Total Passenger"
        value={passengers.length}
        color="green"
        icon={
          <MdGroups2 className="text-[#19ACA0] w-10 h-10 bg-green-200 rounded-full shadow-sm" />
        }
      />

      <StatCard
        title="Total Trip"
        value={trips.length}
        color="yellow"
        icon={
          <FaBus className="text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm" />
        }
      />

      <StatCard
        title="Total Rating"
        value={user.rating}
        color="yellow"
        icon={
          <MdStarRate className="text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm" />
        }
      />
    </div>
  );
};

export default StatsCards;
