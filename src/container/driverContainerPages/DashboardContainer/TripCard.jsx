import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import DriverTrackingMap from "./DriverTrackingMap";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const TripCard = () => {
  const [trip, setTrip] = useState({});
  const [tripId, setTripId] = useState("");
  const [trips, setTrips] = useState([]);
  const [pendingBooking, setPendingBooking] = useState([]);
  const [tripPassengers, setTripPassengers] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripRes = await axios.get(
          "https://bus-line-backend.onrender.com/api/trips/driver-trips",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTrips(tripRes.data.trips);

        const pendingRes = await axios.get(
          "https://bus-line-backend.onrender.com/api/bookings/booking-pending",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPendingBooking(pendingRes.data.bookings);
      } catch (err) {
        toast.error("Error in fetch data");
        console.error("Error fetching trips or bookings", err);
      }
    };

    if (token) fetchData();
  }, [token]);

  useEffect(() => {
    const fetchTripData = async () => {
      if (!tripId) return;
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/trips/${tripId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrip(res.data.trip);

        const passengersRes = await axios.get(
          "https://bus-line-backend.onrender.com/api/bookings/booking-passengers",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const allPassengers = passengersRes.data.passengers || [];
        const filtered = allPassengers.filter((p) => p.trip?._id === tripId);
        setTripPassengers(filtered);
      } catch (error) {
        toast.error("Error fetching trip/passenger data");
        console.error(error);
      }
    };

    fetchTripData();
  }, [tripId, token]);

  const handleStatusChange = (studentId, newStatus) => {
    setTripPassengers((prev) =>
      prev.map((p) =>
        p._id === studentId ? { ...p, status: newStatus } : p
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left Column */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        {/* New Request Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold">New Request</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2 text-left">Neighborhood</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {pendingBooking.length > 0 ? (
                  pendingBooking.slice(0, 3).map((pendingBook) => (
                    <tr key={pendingBook._id} className="border-b">
                      <td className="px-4 py-2 text-center">
                        {pendingBook.userId?.name || "Unknown"}
                      </td>
                      <td className="px-4 py-2">
                        {pendingBook.tripId?.neighborhood || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        <Link to="requests">
                          <button className="bg-[#0165AD] hover:bg-blue-800 text-white cursor-pointer py-1 px-6 rounded text-sm w-full sm:w-auto">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No Requests yet...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Choose Trip Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <p className="font-medium">Choose Trip</p>
            <span className="text-sm text-gray-500">
              Today |{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <select
            id="trip"
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-900 focus:outline-none"
          >
            <option value="">Choose Trip</option>
            {trips.map((t) => (
              <option key={t._id} value={t._id}>
                {t.neighborhood} ➡️ {t.destinationId?.title || ""}
              </option>
            ))}
          </select>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-5">
              <h1 className="font-bold">From:</h1>
              <h3>{trip?.neighborhood || "—"}</h3>
            </div>
            <div className="flex gap-5">
              <h1 className="font-bold">To:</h1>
              <h3>{trip?.destinationId?.title || "—"}</h3>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!tripId) {
                  toast.error("Please Select Trip!");
                  return;
                }
                setTrackingStarted(!trackingStarted);
              }}
              className={`mt-6 ${
                trackingStarted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded w-full`}
            >
              {trackingStarted ? "Stop Tracking" : "Start Tracking"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Map */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
        <div className="flex gap-2 mb-4">
          <FaMapMarkerAlt className="h-5 mt-1" />
          <h2 className="font-bold">Live Tracking Map</h2>
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

      {/* Passengers Section */}
      {tripPassengers.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-[#0165AD]">
            Passengers for Trip: {trip.neighborhood} ➡️ {trip.destinationId?.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Student</th>
                  <th className="px-4 py-2 text-left">Neighborhood</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tripPassengers.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{p.name || "N/A"}</td>
                    <td className="px-4 py-2">{p.address?.addressName || "N/A"}</td>
                    <td className="px-4 py-2">{p.email || "N/A"}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(p._id, "boarded")}
                          className={`px-2 py-1 rounded ${
                            p.status === "boarded"
                              ? "bg-green-200 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          Boarded
                        </button>
                        <button
                          onClick={() => handleStatusChange(p._id, "absent")}
                          className={`px-2 py-1 rounded ${
                            p.status === "absent"
                              ? "bg-red-200 text-red-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;