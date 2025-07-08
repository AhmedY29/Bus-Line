import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { FaBus } from "react-icons/fa";
// <<<<<<< HEAD
import { MdStarRate } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import axios from "axios";

const StatsCards = () => {
  const [passengersCount, setPassengersCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [averageRating, setAverageRating] = useState("0.0");

  const token = localStorage.getItem("token");
  const driverId = localStorage.getItem("driverId");
// =======
// import { MdGroups2, MdGroupOff, MdStarRate } from "react-icons/md";
// import { FaUserGroup } from "react-icons/fa6";

// const StatsCards = () => {
//   const [activeTripsCount, setActiveTripsCount] = useState(0);
//   const [averageRating, setAverageRating] = useState('0.0');
//   const token = localStorage.getItem('token');
//   const driverId = localStorage.getItem('driverId');
// >>>>>>> be6d73b (integrate driver files with backend)
  const API = "https://bus-line-backend.onrender.com/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
// <<<<<<< HEAD
        // Fetch Passengers
        const passengerRes = await axios.get(`${API}/bookings/booking-passengers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
        const activeTrips = trips.filter(trip => {
          const startDate = trip.tripDateStart?.split("T")[0];
          return (trip.status === "active" || (trip.status === "pending" && startDate <= today));
        });
        setActiveTripsCount(activeTrips.length);

        // Fetch Rating
// =======
//         const tripRes = await axios.get(`${API}/trips/driver-trips`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const trips = tripRes.data.trips || [];

//         const today = new Date().toISOString().split("T")[0];
//         const updatedTrips = trips.map(trip => {
//           const startDate = trip.tripDateStart?.split("T")[0];
//           if (trip.status === "pending" && startDate <= today) {
//             return { ...trip, status: "active" };
//           }
//           return trip;
//         });

//         const active = updatedTrips.filter(trip => trip.status === 'active');
//         setActiveTripsCount(active.length);
//       } catch (err) {
//         console.error('Failed to fetch trips:', err);
//         setActiveTripsCount(0);
//       }

//       try {
// >>>>>>> be6d73b (integrate driver files with backend)
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
// <<<<<<< HEAD
        console.error("Failed to fetch stats:", err);
// =======
//         console.error('Failed to fetch rating:', err);
//         setAverageRating('0.0');
// >>>>>>> be6d73b (integrate driver files with backend)
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
// <<<<<<< HEAD
        value={passengersCount}
        color="green"
        icon={
          <div className="bg-green-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <FaUserGroup className="w-8 h-8 text-[#19ACA0]" />
          </div>
        }
// =======
//         value="24"
//         color="green"
        
//         icon={<div className=' bg-green-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm'><FaUserGroup className="w-8 items-center h-8 text-[#19ACA0] " /></div> }
// >>>>>>> be6d73b (integrate driver files with backend)
      />

      <StatCard
        title="Total Trip"
        value={activeTripsCount}
        color="yellow"
// <<<<<<< HEAD
        icon={
          <div className="bg-blue-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <FaBus className="w-8 h-8 text-[#0751c7]" />
          </div>
        }
      />

{/* =======
        icon={<div className=' bg-blue-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm'><FaBus className="w-8 items-center h-8 text-[#0751c7] " /></div> }


      />

      {/* <StatCard
        title="Absent Today"
        value="3"
        color="green"
        icon={<MdGroupOff className="text-[#28A1BB] w-10 h-10 bg-sky-200 rounded-full shadow-sm" />}
      /> */} 

{/* >>>>>>> be6d73b (integrate driver files with backend) */}
      <StatCard

        title="Total Rating"
        value={averageRating}
        color="yellow"
// <<<<<<< HEAD
        icon={
          <div className="bg-yellow-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm">
            <MdStarRate className="w-9 h-9 text-[#E4B83C]" />
          </div>
        }
// =======
//         icon={<div className=' bg-yellow-200 w-13 h-13 flex items-center justify-center rounded-full shadow-sm'><MdStarRate className="w-9 items-center h-9 text-[#E4B83C] " /></div> }


// >>>>>>> be6d73b (integrate driver files with backend)
     />
    </div>
  );
};

export default StatsCards;