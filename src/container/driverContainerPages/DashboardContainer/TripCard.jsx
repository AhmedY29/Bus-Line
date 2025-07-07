import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import DriverTrackingMap from "./DriverTrackingMap";
import axios from "axios";
import { Link } from "react-router";
import toast from "react-hot-toast";

const TripCard = () => {
  const [trip, setTrip] = useState({});

  const [token] = useState(localStorage.getItem("token"));
  const [currentLocation] = useState("Al Hamra");
  const [destination] = useState("KSU");
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [tripId, setTripId] = useState("");
  const [trips, setTrips] = useState([]);
  const [pendingBooking, setPendingBooking] = useState([]);

  // const trips = [
  //   "Trip ID #12334",
  //   "Trip ID #12335",
  //   "Trip ID #12336",
  //   "Trip ID #12337",
  // ];

  console.log(trip, "trip");

  useEffect(() => {
    const fetchMyTrip = async () => {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/trips/driver-trips",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data, "tri[s");
      setTrips(res.data.trips);
    };
    const fetchPendingBooking = async () => {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/bookings/booking-pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data, "tri[s");
      setPendingBooking(res.data.bookings);
    };

    fetchMyTrip();
    fetchPendingBooking();
  }, []);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/trips/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrip(res.data.trip);
      } catch (error) {
        toast.error("Error in Selected Trip ");
      }
    };
    fetchTripData();
  }, [tripId]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold">New Request</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-center"> Name</th>
                  <th className="px-4 py-2 text-left">Neighborhood</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {pendingBooking ? (
                  pendingBooking.slice(0, 3).map((pendingBook) => (
                    <tr
                      key={pendingBook._id}
                      className="border-b border-gray-200"
                    >
                      <td className="px-4 py-2">{pendingBook.userId.name}</td>
                      <td className="px-4 py-2">
                        {pendingBook.tripId.neighborhood}
                      </td>
                      <td className="px-4 py-2">
                        <Link to={"requests"}>
                          <button className="bg-[#0165AD] hover:bg-blue-800 text-white cursor-pointer py-1 px-6 rounded text-sm w-full sm:w-auto">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-200">
                    <h1>No Requests yet...</h1>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <p className="block font-medium">Choose Trip</p>
            <span className="text-sm text-gray-500">
              Today |{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="mb-6">
            <select
              id="trip"
              value={trip}
              onChange={(e) => setTripId(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
            >
              <option value="">Choose Trip</option>
              {trips?.map((trip) => (
                <option key={trip._id} value={trip._id}>
                  {trip.neighborhood} ➡️ {trip.destinationId.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-5">
                <h1 className="block font-bold mb-2">From:</h1>
                <h3>{trip?.neighborhood}</h3>
              </div>
              <div className="flex gap-5">
                <h1 className="block font-bold mb-2">To:</h1>
                <h3>{trip?.destinationId?.title}</h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!trip) {
                  toast.error("Please Select Trip!");
                  return;
                }
                setTrackingStarted(!trackingStarted);
              }}
              className={`mt-6 ${
                trackingStarted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-bold py-2 px-4 cursor-pointer rounded w-full`}
            >
              {trackingStarted ? "Stop Tracking" : "Start Tracking"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
        <div className="flex gap-2 ">
          <FaMapMarkerAlt className="h-5" />
          <h2 className="font-bold mb-4">Live Tracking Map</h2>
        </div>

        <div className="border border-gray-300 rounded h-64 md:h-96 overflow-hidden bg-gray-100 relative">
          {trackingStarted ? (
            <DriverTrackingMap
              tripId={trip._id}
              token={token}
              trackingStarted={trackingStarted}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              اضغط Start Tracking لبدء التتبع
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;

// import DriverTrackingMap from "@/components/DriverTrackingMap";
// import React, { useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const TripCard = () => {
//   const [trip, setTrip] = useState({
//     tripId: "68693fdd95f7e4f5f1b54c66",
//   });
//   const [token] = useState(localStorage.getItem("token"));
//   const [currentLocation] = useState("Al Hamra");
//   const [destination] = useState("KSU");
//   const [trackingStarted, setTrackingStarted] = useState(false);

//   const trips = [
//     { id: "68693fdd95f7e4f5f1b54c66", name: "Trip ID #12334" },
//     { id: "68693fdd95f7e4f5f1b54c67", name: "Trip ID #12335" },
//   ];

//   return (
//     <>
//         <div className="flex flex-col md:flex-row gap-6 p-4">
//       <div className="flex flex-col gap-6 w-full md:w-1/2">
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="font-bold">New request</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 text-center"> Destination</th>
//                   <th className="px-4 py-2 text-left">Neighborhood</th>
//                   <th className="px-4 py-2 text-left"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-200">
//                   <td className="px-4 py-2">Alhamra</td>
//                   <td className="px-4 py-2">King Saud U</td>
//                   <td className="px-4 py-2">
//                     <button className="bg-[#0165AD] hover:bg-blue-800 text-white  py-1 px-6 rounded text-sm w-full sm:w-auto">
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-gray-200">
//                   <td className="px-4 py-2">King Saud U</td>
//                   <td className="px-4 py-2">Alhamra</td>
//                   <td className="px-4 py-2">
//                     <button className="bg-[#0165AD] hover:bg-blue-800 text-white py-1 px-6 rounded text-sm w-full sm:w-auto">
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//     <div className="flex flex-col md:flex-row gap-6 p-4">
//       {/* Left */}
//       <div className="flex flex-col gap-6 w-full md:w-1/2">
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <div className="mb-4">
//             <label className="block font-medium">Choose Trip</label>
//             <select
//               value={trip.tripId}
//               onChange={(e) => setTrip({ ...trip, tripId: e.target.value })}
//               className="mt-2 block w-full border border-gray-300 rounded p-2"
//             >
//               {trips.map((t) => (
//                 <option key={t.id} value={t.id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex flex-col gap-4">
//             <div className="flex gap-5">
//               <h1 className="font-bold">From:</h1>
//               <h3>{currentLocation}</h3>
//             </div>
//             <div className="flex gap-5">
//               <h1 className="font-bold">To:</h1>
//               <h3>{destination}</h3>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={() => setTrackingStarted(!trackingStarted)}
//             className={`mt-6 ${
//               trackingStarted
//                 ? "bg-red-600 hover:bg-red-700"
//                 : "bg-green-600 hover:bg-green-700"
//             } text-white font-bold py-2 px-4 rounded w-full`}
//           >
//             {trackingStarted ? "Stop Tracking" : "Start Tracking"}
//           </button>
//         </div>
//       </div>

//       {/* Right */}
//       <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
//         <div className="flex gap-2 mb-4">
//           <FaMapMarkerAlt />
//           <h2 className="font-bold">Live Tracking Map</h2>
//         </div>
// <div className="border border-gray-300 rounded h-64 md:h-96 overflow-hidden bg-gray-100 relative">
//   {trackingStarted ? (
//     <DriverTrackingMap
//       tripId={trip.tripId}
//       token={token}
//       trackingStarted={trackingStarted}
//     />
//   ) : (
//     <div className="flex items-center justify-center h-full text-gray-500">
//       اضغط Start Tracking لبدء التتبع
//     </div>
//   )}
// </div>
//       </div>
//     </div>
//     </div>
//     </div>
//     </>
//   );
// };

// export default TripCard;
