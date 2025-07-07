import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { FaBus } from "react-icons/fa";
import { MdGroups2, MdGroupOff, MdStarRate } from "react-icons/md";

const StatsCards = () => {
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [averageRating, setAverageRating] = useState('0.0');
  const token = localStorage.getItem('token');
  const driverId = localStorage.getItem('driverId');
  const API = "https://bus-line-backend.onrender.com/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tripRes = await axios.get(`${API}/trips/driver-trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const trips = tripRes.data.trips || [];

        const today = new Date().toISOString().split("T")[0];
        const updatedTrips = trips.map(trip => {
          const startDate = trip.tripDateStart?.split("T")[0];
          if (trip.status === "pending" && startDate <= today) {
            return { ...trip, status: "active" };
          }
          return trip;
        });

        const active = updatedTrips.filter(trip => trip.status === 'active');
        setActiveTripsCount(active.length);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
        setActiveTripsCount(0);
      }

      try {
        const ratingRes = await axios.get(`${API}/rating/driver/${driverId}`, {
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
          setAverageRating('0.0');
        }
      } catch (err) {
        console.error('Failed to fetch rating:', err);
        setAverageRating('0.0');
      }
    };

    if (token && driverId) {
      fetchStats();
    }
  }, [token, driverId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-7">
      <StatCard
        title="Total Passenger"
        value="24"
        color="green"
        icon={<MdGroups2 className="text-[#19ACA0] w-10 h-10 bg-green-200 rounded-full shadow-sm" />}
      />

      <StatCard
        title="Total Trip"
        value={activeTripsCount}
        color="yellow"
        icon={<FaBus className="text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm" />}
      />

      <StatCard
        title="Absent Today"
        value="3"
        color="green"
        icon={<MdGroupOff className="text-[#28A1BB] w-10 h-10 bg-sky-200 rounded-full shadow-sm" />}
      />

      <StatCard
        title="Total Rating"
        value={averageRating}
        color="yellow"
        icon={<MdStarRate className="text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm" />}
      />
    </div>
  );
};

export default StatsCards;
