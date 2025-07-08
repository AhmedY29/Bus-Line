import React from "react";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";

function TripsDashboard() {
  const API = "https://bus-line-backend.onrender.com/api";
  const [EditTrip, setEditTrip] = useState(false);
  const [viewTrip, setViewTrip] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state for editing trip
  const [formData, setFormData] = useState({
    neighborhood: "",
    tripPrice: "",
    arrivalTime: "",
    departureTime: "",
    tripDateStart: "",
    tripDateEnd: "",
    status: "",
  });

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`${API}/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Trips fetched:", response.data.trips);
      setTrips(response.data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to fetch trips. Please try again.");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ];

  const filteredData = trips
    .filter(
      (item) =>
        item.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.driverId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destinationId?.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.neighborhood.localeCompare(b.neighborhood);
      } else if (sortBy === "newest") {
        return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt || a._id) - new Date(b.createdAt || b._id);
      }
      return 0;
    });

  const handleEditTrip = (trip) => {
    setSelectedTrip(trip);
    setFormData({
      neighborhood: trip.neighborhood || "",
      tripPrice: trip.tripPrice ? trip.tripPrice.toString() : "",
      arrivalTime: trip.arrivalTime || "",
      departureTime: trip.departureTime || "",
      tripDateStart: trip.tripDateStart
        ? new Date(trip.tripDateStart).toISOString().split("T")[0]
        : "",
      tripDateEnd: trip.tripDateEnd
        ? new Date(trip.tripDateEnd).toISOString().split("T")[0]
        : "",
      status: trip.status || "",
    });
    setEditTrip(true);
    setError("");
    setSuccess("");
  };

  const handleViewTrip = (trip) => {
    setSelectedTrip(trip);
    setViewTrip(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setEditTrip(false);
    setViewTrip(false);
    setSelectedTrip(null);
    setFormData({
      neighborhood: "",
      tripPrice: "",
      arrivalTime: "",
      departureTime: "",
      tripDateStart: "",
      tripDateEnd: "",
      status: "",
    });
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTrip = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Validate required fields
      if (!formData.neighborhood.trim()) {
        toast.error("Neighborhood is required");
        return;
      }

      if (
        !formData.tripPrice ||
        isNaN(formData.tripPrice) ||
        parseFloat(formData.tripPrice) <= 0
      ) {
        toast.error("Valid trip price is required");
        return;
      }

      if (!formData.arrivalTime.trim()) {
        toast.error("Arrival time is required");
        return;
      }

      if (!formData.departureTime.trim()) {
        toast.error("Departure time is required");
        return;
      }

      if (!formData.status) {
        toast.error("Status is required");
        return;
      }

      const updateData = {
        neighborhood: formData.neighborhood,
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
      };

      await axios.put(`${API}/trips/${selectedTrip._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Trip updated successfully!");
      await fetchTrips();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating trip:", error);
      toast.error(error.response?.data?.message || "Failed to update trip");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (trip) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <IoIosInformationCircleOutline className="inline-block mr-1 text-2xl text-red-500" />
            <h1 className="font-bold">Warning!</h1>
          </div>

          <p className="text-xs md:text-base lg:text-lg text-gray-900">
            Are you sure you want to delete trip to "
            {trip.destinationId?.title || "Unknown"}" in {trip.neighborhood}?
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    throw new Error("No authentication token found");
                  }

                  await axios.delete(`${API}/trips/${trip._id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });

                  console.log("Trip deleted:", trip.neighborhood);
                  toast.success(
                    `Trip to "${
                      trip.destinationId?.title || "destination"
                    }" deleted successfully`
                  );
                  await fetchTrips();
                } catch (error) {
                  console.error("Error deleting trip:", error);
                  toast.error(
                    error.response?.data?.message || "Failed to delete trip"
                  );
                }
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e5e7eb",
          padding: "16px",
          borderRadius: "8px",
          maxWidth: "400px",
        },
      }
    );
  };

  return (
    <div
      className={`flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full h-[80vh]`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
        <h1 className="text-lg font-bold w-1/3">Trips</h1>
        <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
          {/* Search Input */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
            <IoSearchOutline className="text-gray-400 text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:outline-none bg-neutral-100 rounded-md p-1 w-full"
            />
          </div>
          {/* Sort Dropdown */}
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md p-1 w-1/3"
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data List */}
      <div className="flex flex-col h-full w-full overflow-y-auto gap-4 mt-10 md:mt-2 scrollbar-hide">
        <div className="flex items-center p-2">
          <h1 className="text-xs lg:text-base font-semibold w-1/4 text-left">
            Neighborhood
          </h1>
          <h2 className="hidden lg:block text-xs lg:text-base font-semibold w-1/4 text-left">
            Destination
          </h2>
          <h2 className="text-xs lg:text-base font-semibold w-1/4 text-left">
            Driver
          </h2>
          <h2 className="text-xs lg:text-base font-semibold w-1/4 text-left">
            Price
          </h2>
          <div className="flex items-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4 h-full w-1/4">
            <h1 className="text-xs lg:text-base font-semibold text-center w-full">
              Actions
            </h1>
          </div>
        </div>

        {filteredData.map((item) => (
          <div
            className="flex items-center p-2 rounded-md hover:bg-gray-100"
            key={item._id || item.id}
          >
            <div className="flex flex-col text-xs lg:text-base w-1/4 text-left">
              <h1>{item.neighborhood}</h1>
              {/* <p
                className={`text-xs px-2 py-0.5 font-medium rounded-sm w-fit ${
                  item.status === "completed"
                    ? "text-green-700 bg-green-300"
                    : item.status === "pending"
                    ? "text-yellow-500 bg-yellow-200"
                    : item.status === "active"
                    ? "text-blue-500 bg-blue-200"
                    : "text-red-500 bg-red-300"
                }`}
              >
                {item.status}
              </p> */}
            </div>
            <h2 className="hidden lg:block text-xs lg:text-base w-1/4 text-left">
              {item.destinationId?.title || "N/A"}
            </h2>
            <h2 className="text-xs lg:text-base w-1/4 text-left">
              {item.driverId?.name || "No Driver"}
            </h2>
            <h2 className="text-xs lg:text-base w-1/4 text-left">
              ${item.tripPrice}
            </h2>
            <div className="flex items-center justify-around gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 lg:pl-4 h-full w-1/4">
              <button
                className="bg-blue-500 text-white text-xs lg:text-sm rounded-md py-1 px-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleViewTrip(item)}
              >
                View
              </button>
              <FaRegEdit
                className="cursor-pointer text-xl xl:text-2xl text-blue-600 transition-colors hover:text-blue-800"
                onClick={() => handleEditTrip(item)}
              />
              <MdOutlineDelete
                className="cursor-pointer text-xl xl:text-2xl text-red-600 transition-colors hover:text-red-800"
                onClick={() => handleDeleteTrip(item)}
              />
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No trips found</p>
          </div>
        )}
      </div>

      {/* Edit Trip Modal */}
      {EditTrip && selectedTrip && (
        <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-4/5 md:w-3/5 max-h-4/5 flex flex-col gap-5 relative overflow-y-auto scrollbar-hide">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">
                Edit Trip: {selectedTrip.neighborhood}
              </h2>

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-full">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Neighborhood
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Neighborhood"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Trip Start Date
                    <input
                      type="date"
                      name="tripDateStart"
                      value={formData.tripDateStart}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Trip End Date
                    <input
                      type="date"
                      name="tripDateEnd"
                      value={formData.tripDateEnd}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Arrival Time
                    <input
                      type="text"
                      name="arrivalTime"
                      value={formData.arrivalTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 8:00 AM"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Departure Time
                    <input
                      type="text"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 6:00 AM"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Trip Price ($)
                    <input
                      type="number"
                      name="tripPrice"
                      value={formData.tripPrice}
                      onChange={handleInputChange}
                      placeholder="Trip Price"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                      min="0"
                      step="0.01"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Status
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-2/3">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white rounded-md p-2 w-1/2 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTrip}
                  className="bg-blue-500 text-white rounded-md p-2 w-1/2 cursor-pointer hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Trip Details Modal */}
      {viewTrip && selectedTrip && (
        <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-5/6 md:w-4/5 max-h-5/6 flex flex-col gap-5 relative overflow-y-auto scrollbar-hide">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">
                Trip Details: {selectedTrip.neighborhood}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4">
                {/* Trip Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Trip Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Neighborhood:</span>{" "}
                      {selectedTrip.neighborhood}
                    </div>
                    <div>
                      <span className="font-medium">Destination:</span>{" "}
                      {selectedTrip.destinationId?.title || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> $
                      {selectedTrip.tripPrice}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-sm ${
                          selectedTrip.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : selectedTrip.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedTrip.status === "active"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedTrip.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Arrival Time:</span>{" "}
                      {selectedTrip.arrivalTime}
                    </div>
                    <div>
                      <span className="font-medium">Departure Time:</span>{" "}
                      {selectedTrip.departureTime}
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Driver & Vehicle
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Driver Name:</span>{" "}
                      {selectedTrip.driverId?.name || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Driver Email:</span>{" "}
                      {selectedTrip.driverId?.email || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedTrip.driverId?.phoneNumber || "N/A"}
                    </div>
                    {selectedTrip.driverId?.vehicleId && (
                      <>
                        <div>
                          <span className="font-medium">Vehicle:</span>{" "}
                          {selectedTrip.driverId.vehicleId.name}
                        </div>
                        <div>
                          <span className="font-medium">Plate Number:</span>{" "}
                          {selectedTrip.driverId.vehicleId.plateNumber}
                        </div>
                        <div>
                          <span className="font-medium">Capacity:</span>{" "}
                          {selectedTrip.driverId.vehicleId.capacity} passengers
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Date Information */}
                <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Schedule Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Trip Start Date:</span>{" "}
                      {selectedTrip.tripDateStart
                        ? new Date(
                            selectedTrip.tripDateStart
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Trip End Date:</span>{" "}
                      {selectedTrip.tripDateEnd
                        ? new Date(
                            selectedTrip.tripDateEnd
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 w-full">
                <button
                  onClick={() => handleDeleteTrip(selectedTrip)}
                  className="bg-red-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-white",
            color: "text-neutral-900",
          },
        }}
      />
    </div>
  );
}

export default TripsDashboard;
