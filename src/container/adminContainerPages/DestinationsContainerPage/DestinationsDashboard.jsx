import React, { useState, useEffect } from "react";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { FaUserPen } from "react-icons/fa6";

function DestinationsDashboard() {
  const API = "https://bus-line-backend.onrender.com/api";

  // State management
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [editDestination, setEditDestination] = useState(false);
  const [addDestination, setAddDestination] = useState(false);
  const [viewDestination, setViewDestination] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    latitude: "",
    longitude: "",
  });

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API}/destination`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Destinations fetched:", response.data.destinations);
      setDestinations(response.data.destinations || []);
      setError("");
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError("Failed to fetch destinations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Sort options
  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ];

  // Filter and sort destinations
  const filteredData = destinations
    .filter((destination) =>
      destination.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "newest") {
        return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt || a._id) - new Date(b.createdAt || b._id);
      }
      return 0;
    });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle add destination
  const handleAddDestination = () => {
    setFormData({
      title: "",
      latitude: "",
      longitude: "",
    });
    setAddDestination(true);
    setError("");
    setSuccess("");
  };

  // Handle edit destination
  const handleEditDestination = (destination) => {
    setSelectedDestination(destination);
    setFormData({
      title: destination.title || "",
      latitude: destination.latitude ? destination.latitude.toString() : "",
      longitude: destination.longitude ? destination.longitude.toString() : "",
    });
    setEditDestination(true);
    setError("");
    setSuccess("");
  };

  // Handle view destination
  const handleViewDestination = (destination) => {
    setSelectedDestination(destination);
    setViewDestination(true);
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.latitude || isNaN(parseFloat(formData.latitude))) {
      setError("Valid latitude is required");
      return false;
    }
    if (!formData.longitude || isNaN(parseFloat(formData.longitude))) {
      setError("Valid longitude is required");
      return false;
    }
    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);
    if (lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90");
      return false;
    }
    if (lng < -180 || lng > 180) {
      setError("Longitude must be between -180 and 180");
      return false;
    }
    return true;
  };

  // Submit add destination
  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const destinationData = {
        title: formData.title.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };

      const response = await axios.post(`${API}/destination`, destinationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Destination added:", response.data);
      setSuccess("Destination added successfully!");
      setAddDestination(false);
      fetchDestinations();
      setFormData({ title: "", latitude: "", longitude: "" });
    } catch (error) {
      console.error("Error adding destination:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add destination. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Submit edit destination
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const destinationData = {
        title: formData.title.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };

      const response = await axios.patch(
        `${API}/destination/${selectedDestination._id}`,
        destinationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Destination updated:", response.data);
      setSuccess("Destination updated successfully!");
      setEditDestination(false);
      fetchDestinations();
    } catch (error) {
      console.error("Error updating destination:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update destination. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete destination
  const handleDeleteDestination = async (destinationId) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/destination/${destinationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Destination deleted successfully!");
      fetchDestinations();
    } catch (error) {
      console.error("Error deleting destination:", error);
      setError(
        error.response?.data?.message ||
          "Failed to delete destination. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Close modals
  const handleCloseModal = () => {
    setEditDestination(false);
    setAddDestination(false);
    setViewDestination(false);
    setSelectedDestination(null);
    setFormData({ title: "", latitude: "", longitude: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div
      className={`flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full h-[80vh]`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
        <h1 className="text-lg font-bold w-1/3">Destinations</h1>
        <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
          {/* Search Input */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
            <IoSearchOutline className="text-gray-400 text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search destinations..."
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
          <h1 className="text-xs lg:text-base font-semibold  w-2/5  text-left">
            Title
          </h1>
          <h1 className="text-xs lg:text-base font-semibold  w-2/6  text-left">
            Location
          </h1>

          <div className="flex items-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4 h-full w-1/4">
            <h1 className="text-xs lg:text-base font-semibold text-center w-full">
              Actions
            </h1>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
          {filteredData.map((item) => (
            <div
              className="flex items-center p-2 rounded-md  hover:bg-gray-100 "
              key={item._id || item.id}
            >
              <div className="flex flex-col text-xs lg:text-base w-2/5 text-left">
                <h1>{item.title}</h1>
              </div>
              <div className="flex flex-col text-xs lg:text-base w-2/6 text-left">
                <h1>lat: {item.latitude}</h1>
                <h1>long: {item.longitude}</h1>
              </div>

              <div className="flex items-center justify-around gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 lg:pl-4 h-full w-1/4">
                <button
                  className="bg-blue-500 text-white text-xs lg:text-sm rounded-md py-1 px-1 md:px-3 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => handleViewDestination(item)}
                >
                  View
                </button>
                <FaUserPen
                  className="cursor-pointer text-xl xl:text-2xl text-blue-600 transition-colors hover:text-blue-800"
                  onClick={() => handleEditDestination(item)}
                />
                <MdOutlineDelete
                  className="cursor-pointer text-xl xl:text-2xl text-red-600 transition-colors hover:text-red-800"
                  onClick={() => handleDeleteDestination(item._id)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No destinations found</p>
          </div>
        )}
        {/* Add Destination Button */}
        <div className="flex h-fit items-end justify-end">
          <button
            className="bg-blue-500 text-white text-xs lg:text-sm rounded-md py-2 px-4  cursor-pointer hover:bg-blue-600 transition-colors duration-200"
            onClick={handleAddDestination}
          >
            Add Destination
          </button>
        </div>
      </div>

      {/* Edit Destination Modal */}
      {editDestination && selectedDestination && (
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
                Edit Destination: {selectedDestination.title}
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
                    Title
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Destination Title"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Latitude
                    <input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="Latitude"
                      step="any"
                      min="-90"
                      max="90"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Longitude
                    <input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="Longitude"
                      step="any"
                      min="-180"
                      max="180"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
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
                  onClick={handleSubmitEdit}
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

      {/* View Destination Details Modal */}
      {viewDestination && selectedDestination && (
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
                Destination Details: {selectedDestination.title}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4">
                {/* Location Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Location Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Title:</span>{" "}
                      {selectedDestination.title}
                    </div>
                    <div>
                      <span className="font-medium">Latitude:</span>{" "}
                      {selectedDestination.latitude}
                    </div>
                    <div>
                      <span className="font-medium">Longitude:</span>{" "}
                      {selectedDestination.longitude}
                    </div>
                    <div>
                      <span className="font-medium">Coordinates:</span>{" "}
                      {selectedDestination.latitude},{" "}
                      {selectedDestination.longitude}
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    System Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Destination ID:</span>{" "}
                      {selectedDestination._id}
                    </div>
                    <div>
                      <span className="font-medium">Created At:</span>{" "}
                      {new Date(selectedDestination.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>{" "}
                      {new Date(selectedDestination.updatedAt).toLocaleString()}
                    </div>
                    <div className="pt-2">
                      <a
                        href={`https://www.google.com/maps?q=${selectedDestination.latitude},${selectedDestination.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <FaMapMarkerAlt className="text-sm" />
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 w-full">
                <button
                  onClick={() =>
                    handleDeleteDestination(selectedDestination._id)
                  }
                  className="bg-red-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                >
                  Delete Destination
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {addDestination && (
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
                Add New Destination
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
                    Title *
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Destination Title"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Latitude *
                    <input
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="Latitude (-90 to 90)"
                      step="any"
                      min="-90"
                      max="90"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                      required
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Longitude *
                    <input
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="Longitude (-180 to 180)"
                      step="any"
                      min="-180"
                      max="180"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                      required
                    />
                  </label>
                  <div className="text-sm text-gray-600 p-2 bg-blue-50 rounded-md">
                    <p className="font-medium">💡 Tips:</p>
                    <p>• Use Google Maps to find coordinates</p>
                    <p>• Right-click on location → "What's here?"</p>
                  </div>
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
                  onClick={handleSubmitAdd}
                  className="bg-blue-500 text-white rounded-md p-2 w-1/2 cursor-pointer hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Destination"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationsDashboard;
