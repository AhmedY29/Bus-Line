import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const TripPassenger = () => {
  const [groupedPassengers, setGroupedPassengers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPassengers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Missing token");

      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/bookings/booking-passengers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const passengers = res.data.passengers || [];

      const grouped = {};

      passengers.forEach((p) => {
        const tripId = p.trip?._id || "No Trip";
        const tripName = `${p.trip?.neighborhood || "?"} ➡️ ${p.trip?.destination || "?"}`;

        if (!grouped[tripId]) {
          grouped[tripId] = {
            tripName,
            students: [],
            seenStudentIds: new Set(),
          };
        }

        // ت عدم تكرار الطالب في نفس الرحلة
if (!grouped[tripId].seenStudentIds.has(p._id)) {
          grouped[tripId].students.push(p);
          grouped[tripId].seenStudentIds.add(p._id);
        }
      });

      Object.values(grouped).forEach((group) => {
        delete group.seenStudentIds;
      });

      setGroupedPassengers(grouped);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handleStatusChange = (tripId, studentId, newStatus) => {
    setGroupedPassengers((prev) => {
      const updated = { ...prev };
      updated[tripId].students = updated[tripId].students.map((p) =>
        p._id === studentId ? { ...p, status: newStatus } : p
      );
      return updated;
    });
  };

  const filterStudents = (students) =>
    students.filter((p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) return <p className="p-6">Loading passengers...</p>;

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Trip Passengers</h1>
        <div className="relative w-82">
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search "
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-[#0165AD] hover:bg-blue-800"
            >
              <IoSearchOutline size={20} />
              <span className="sr-only">Search</span>
            </button>
          </div>
      </div>

      {/* Grouped Passengers by Trip */}
      {Object.entries(groupedPassengers).map(([tripId, trip]) => {
        const filtered = filterStudents(trip.students);
        if (filtered.length === 0) return null;

        return (
          <div key={tripId} className="mb-10">
          

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
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
                  {filtered.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 border-b border-gray-200"
                    >
                      <td className="px-4 py-2">{p.name || "N/A"}</td>
                      <td className="px-4 py-2">
                        {p.address?.addressName || "N/A"}
                      </td>
                      <td className="px-4 py-2">{p.email || "N/A"}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(tripId, p._id, "boarded")
                            }
                            className={`px-2 py-1 rounded ${
                              p.status === "boarded"
                                ? "bg-green-200 text-green-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            Boarded
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(tripId, p._id, "absent")
                            }
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

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4">
              {filtered.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <p className="font-semibold">{p.name || "N/A"}</p>
                  <p className="text-sm text-gray-600">
                    📍 {p.address?.addressName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">✉️ {p.email}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        handleStatusChange(tripId, p._id, "boarded")
                      }
                      className={`flex-1 py-1 rounded text-sm ${
                        p.status === "boarded"
                          ? "bg-green-200 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Boarded
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(tripId, p._id, "absent")
                      }
                      className={`flex-1 py-1 rounded text-sm ${
                        p.status === "absent"
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripPassenger;
