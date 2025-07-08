import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { FaBus } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import axios from "axios";

const StatsCards = () => {
  const [passengersCount, setPassengersCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [averageRating, setAverageRating] = useState("0.0");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const API = "https://bus-line-backend.onrender.com/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Passengers
        const passengerRes = await axios.get(
          `${API}/bookings/booking-passengers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const passengerData = Array.isArray(passengerRes.data.passengers)
          ? passengerRes.data.passengers
          : [];
        setPassengersCount(passengerData.length);

        // Fetch Trips
        const tripRes = await axios.get(`${API}/trips/driver-trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const trips = tripRes.data.trips || [];

        const today = new Date().toISOString().split("T")[0];
        const activeTrips = trips.filter((trip) => {
          const startDate = trip.tripDateStart?.split("T")[0];
          return (
            trip.status === "active" ||
            (trip.status === "pending" && startDate <= today)
          );
        });
        setActiveTripsCount(activeTrips.length);

        // Fetch Rating
        const ratingRes = await axios.get(`${API}/rating/driver/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ratings = Array.isArray(ratingRes.data.ratings)
          ? ratingRes.data.ratings
          : Array.isArray(ratingRes.data)
          ? ratingRes.data
          : [];

        if (ratings.length > 0) {
          const total = ratings.reduce((sum, r) => sum + (r.rating || 0), 0);
          const avg = total / ratings.length;
          setAverageRating(avg.toFixed(1));
        } else {
          setAverageRating("0.0");
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    if (token && user._id) {
      fetchStats();
    }
  }, [token, user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-7 ">
      <StatCard
        title="Total Passenger"
        value={passengersCount}
        color="green"
        icon={
          <div className="bg-green-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <FaUserGroup className="w-8 h-8 text-[#19ACA0]" />
          </div>
        }
      />

      <StatCard
        title="Total Trip"
        value={activeTripsCount}
        color="yellow"
        icon={
          <div className="bg-blue-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <FaBus className="w-8 h-8 text-[#0751c7]" />
          </div>
        }
      />

      <StatCard
        title="Total Rating"
        value={averageRating}
        color="yellow"
        icon={
          <div className="bg-yellow-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <MdStarRate className="w-9 h-9 text-[#E4B83C]" />
          </div>
        }
      />
    </div>
  );
};

export default StatsCards;
