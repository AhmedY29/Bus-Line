import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IoSearchOutline } from "react-icons/io5";

const TripsList = () => {
  const API = "https://bus-line-backend.onrender.com/api";

  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    neighborhood: "",
    destinationId: "",
    tripPrice: "",
    arrivalTime: "",
    departureTime: "",
    tripDateStart: "",
    tripDateEnd: "",
    status: "pending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);

  useEffect(() => {
    fetchTrips();
    fetchDestinations();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/trips/driver-trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedTrips = response.data.trips.map((trip) => {
        const today = new Date().toISOString().split("T")[0];
        const startDate = trip.tripDateStart?.split("T")[0];
        if (trip.status === "pending" && startDate <= today) {
          return { ...trip, status: "active" };
        }
        return trip;
      });

      setTrips(updatedTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/destination`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(response.data.destinations || []);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingTripId(null);
    setFormData({
      neighborhood: "",
      destinationId: "",
      tripPrice: "",
      arrivalTime: "",
      departureTime: "",
      tripDateStart: "",
      tripDateEnd: "",
      status: "pending",
    });
  };

  const handleEditTrip = (trip) => {
    setIsEditing(true);
    setEditingTripId(trip._id);
    setFormData({
      neighborhood: trip.neighborhood || "",
      destinationId:
        typeof trip.destinationId === "object"
          ? trip.destinationId._id
          : trip.destinationId,
      tripPrice: trip.tripPrice?.toString() || "",
      arrivalTime: trip.arrivalTime || "",
      departureTime: trip.departureTime || "",
      tripDateStart: trip.tripDateStart ? trip.tripDateStart.split("T")[0] : "",
      tripDateEnd: trip.tripDateEnd ? trip.tripDateEnd.split("T")[0] : "",
      status: trip.status || "pending",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const driverId = user?._id;
    if (!token || !driverId) return;

    const updateData = {
      neighborhood: formData.neighborhood,
      destinationId: formData.destinationId,
      tripPrice: parseFloat(formData.tripPrice),
      arrivalTime: formData.arrivalTime,
      departureTime: formData.departureTime,
      tripDateStart: formData.tripDateStart
        ? new Date(formData.tripDateStart).toISOString()
        : undefined,
      tripDateEnd: formData.tripDateEnd
        ? new Date(formData.tripDateEnd).toISOString()
        : undefined,
      status: formData.status,
      driverId,
    };

    try {
      if (isEditing && editingTripId) {
        const result = await Swal.fire({
          title: "Are you sure you want to update this trip?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "Cancel",
        });
        if (!result.isConfirmed) return;

        await axios.patch(`${API}/trips/${editingTripId}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
     

        Swal.fire({
          icon: "success",
          title: "Trip updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await axios.post(`${API}/trips`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Trip added successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      fetchTrips();
      handleCloseModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: isEditing ? "Failed to update trip" : "Failed to add trip",
        text:
          error.response?.data?.message ||
          error.message ||
          "An error occurred",
      });
      console.error("Error submitting trip:", error);
    }
  };

  const handleDelete = async (tripId) => {
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "Are you sure you want to delete this trip?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Trip deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchTrips();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete trip",
        text: error.response?.data?.message || error.message || "An error occurred",
      });
      console.error("Error deleting trip:", error);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const destination = destinations.find(
      (d) =>
        d._id ===
        (typeof trip.destinationId === "object"
          ? trip.destinationId._id
          : trip.destinationId)
    );
    const destinationName = destination?.title?.toLowerCase() || "";
    return destinationName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">My Trips</h1>

        <div className="relative w-82">
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by comment or user ID"
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

        <button
          onClick={() => {
            setIsEditing(false);
            setEditingTripId(null);
            setShowModal(true);
          }}
          className="bg-[#0165AD] hover:bg-[#0165addf] text-white font-bold py-2 px-4 rounded"
        >
          Add Trip +
        </button>
      </div>

      <div className="overflow-x-auto sm:block">
        <table className="w-full table-auto border-collapse">
          <thead className="border-b text-gray-500 text-sm hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-700">
            {filteredTrips.map((trip) => {
              const destinationId =
                typeof trip.destinationId === "object"
                  ? trip.destinationId._id
                  : trip.destinationId;

              const destination = destinations.find((d) => d._id === destinationId);

              return (
                <tr key={trip._id} className="flex flex-col sm:table-row border-b">
                  <td className="px-4 py-2">{destination?.title || "Unknown"}</td>
                  <td className="px-4 py-2">{trip.neighborhood}</td>
                  <td className="px-4 py-2">{trip.departureTime}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        trip.status === "active"
                          ? "bg-green-200 text-green-800"
                          : trip.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditTrip(trip)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Trip" : "New Trip"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex flex-col">
                  Neighborhood
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                    required
                  />
                </label>

                <label className="flex flex-col">
                  Destination
                  <select
                    name="destinationId"
                    value={formData.destinationId}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                    required
                  >
                    <option value="">Select</option>
                    {destinations.map((dest) => (
                      <option key={dest._id} value={dest._id}>
                        {dest.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col mb-4">
                Trip Start Date
                <input
                  type="date"
                  name="tripDateStart"
                  value={formData.tripDateStart}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                  required
                />
              </label>

              <label className="flex flex-col mb-4">
                Trip End Date
                <input
                  type="date"
                  name="tripDateEnd"
                  value={formData.tripDateEnd}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                  required
                />
              </label>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex flex-col">
                  Arrival Time
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                    required
                  />
                </label>

                <label className="flex flex-col">
                  Departure Time
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col mb-4">
                Trip Price
                <input
                  type="number"
                  name="tripPrice"
                  value={formData.tripPrice}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900  dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  
                  required
                  min="0"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Update Trip" : "Add Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsList;
