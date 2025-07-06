import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

function BusesDashboard() {
  const API = "https://bus-line-backend.onrender.com/api";
  const [searchTerm, setSearchTerm] = useState("");
  const [buses, setBuses] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [EditBus, setEditBus] = useState(false);
  const [viewBus, setViewBus] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state for editing bus
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    color: "",
    plateNumber: "",
    capacity: "",
    yearlyCheck: false,
  });

  const fetchBuses = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`${API}/admin/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Extract buses from drivers who have vehicles
      const busesData = response.data.driver
        .filter((driver) => driver.vehicleId)
        .map((driver) => ({
          ...driver.vehicleId,
          driverId: driver._id,
          driverName: driver.name,
          driverEmail: driver.email,
        }));

      console.log("Buses fetched:", busesData);
      setBuses(busesData);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ];

  const filteredData = buses
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "newest") {
        return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt || a._id) - new Date(b.createdAt || b._id);
      }
      return 0;
    });

  const handleEditBus = (bus) => {
    setSelectedBus(bus);
    setFormData({
      name: bus.name || "",
      model: bus.model || "",
      color: bus.color || "",
      plateNumber: bus.plateNumber || "",
      capacity: bus.capacity ? bus.capacity.toString() : "",
      yearlyCheck: bus.yearlyCheck || false,
    });
    setEditBus(true);
    setError("");
    setSuccess("");
  };

  const handleViewBus = (bus) => {
    setSelectedBus(bus);
    setViewBus(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setEditBus(false);
    setViewBus(false);
    setSelectedBus(null);
    setFormData({
      name: "",
      model: "",
      color: "",
      plateNumber: "",
      capacity: "",
      yearlyCheck: false,
    });
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveBus = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Validate required fields
      if (!formData.name.trim()) {
        setError("Bus name is required");
        return;
      }

      if (!formData.model.trim()) {
        setError("Model is required");
        return;
      }

      if (!formData.color.trim()) {
        setError("Color is required");
        return;
      }

      if (!formData.plateNumber.trim()) {
        setError("Plate number is required");
        return;
      }

      if (
        !formData.capacity ||
        isNaN(formData.capacity) ||
        parseInt(formData.capacity) <= 0
      ) {
        setError("Valid capacity is required");
        return;
      }

      const updateData = {
        name: formData.name,
        model: formData.model,
        color: formData.color,
        plateNumber: formData.plateNumber,
        capacity: parseInt(formData.capacity),
        yearlyCheck: formData.yearlyCheck,
      };

      await axios.put(`${API}/admin/vehicle/${selectedBus._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Bus updated successfully!");
      await fetchBuses();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error updating bus:", error);
      setError(error.response?.data?.message || "Failed to update bus");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBus = async (bus) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete bus "${bus.name}" (${bus.plateNumber})? This action cannot be undone.`
      );
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(`${API}/admin/vehicle/${bus._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Bus deleted:", bus.name);
      await fetchBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert(error.response?.data?.message || "Failed to delete bus");
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full h-[80vh]`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
        <h1 className="text-lg font-bold w-1/3">Buses</h1>
        <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
          {/* Search Input */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
            <IoSearchOutline className="text-gray-400 text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search buses..."
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
            Bus Name
          </h1>
          <h2 className="hidden lg:block text-xs lg:text-base font-semibold w-1/4 text-left">
            Plate Number
          </h2>
          <h2 className=" text-xs lg:text-base font-semibold w-1/4 text-left">
            Driver
          </h2>
          <h2 className=" text-xs lg:text-base font-semibold w-1/4 text-left">
            Capacity
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
              <h1>{item.name}</h1>
              <p className="text-xs text-gray-500">{item.model}</p>
            </div>
            <h2 className="hidden lg:block  text-xs lg:text-base w-1/4 text-left">
              {item.plateNumber}
            </h2>
            <h2 className=" text-xs lg:text-base w-1/4 text-left">
              {item.driverName}
            </h2>
            <h2 className=" text-xs lg:text-base w-1/4 text-left">
              {item.capacity}
            </h2>
            <div className="flex items-center justify-around gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 lg:pl-4 h-full w-1/4">
              <button
                className="bg-blue-500 text-white text-xs lg:text-sm rounded-md py-1 px-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleViewBus(item)}
              >
                View
              </button>
              <FaUserPen
                className="cursor-pointer text-xl xl:text-2xl text-blue-600 transition-colors hover:text-blue-800"
                onClick={() => handleEditBus(item)}
              />
              <MdOutlineDelete
                className="cursor-pointer text-xl xl:text-2xl text-red-600 transition-colors hover:text-red-800"
                onClick={() => handleDeleteBus(item)}
              />
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No buses found</p>
          </div>
        )}
      </div>

      {/* Edit Bus Modal */}
      {EditBus && selectedBus && (
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
                Edit Bus: {selectedBus.name}
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
                    Bus Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Bus Name"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Model
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="Model Year"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Color
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Color"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Plate Number
                    <input
                      type="text"
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={handleInputChange}
                      placeholder="Plate Number"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Capacity
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Passenger Capacity"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                      min="1"
                    />
                  </label>
                  <label className="flex items-center h-full md:pt-5 gap-2">
                    <input
                      type="checkbox"
                      name="yearlyCheck"
                      checked={formData.yearlyCheck}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded "
                    />
                    <span className="text-sm font-medium text-gray-900">
                      Yearly Check Valid
                    </span>
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
                  onClick={handleSaveBus}
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

      {/* View Bus Details Modal */}
      {viewBus && selectedBus && (
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
                Bus Details: {selectedBus.name}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4">
                {/* Vehicle Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Vehicle Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedBus.name}
                    </div>
                    <div>
                      <span className="font-medium">Model:</span>{" "}
                      {selectedBus.model}
                    </div>
                    <div>
                      <span className="font-medium">Color:</span>{" "}
                      {selectedBus.color}
                    </div>
                    <div>
                      <span className="font-medium">Plate Number:</span>{" "}
                      {selectedBus.plateNumber}
                    </div>
                    <div>
                      <span className="font-medium">Capacity:</span>{" "}
                      {selectedBus.capacity} passengers
                    </div>
                    <div>
                      <span className="font-medium">Yearly Check:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-sm ${
                          selectedBus.yearlyCheck
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedBus.yearlyCheck ? "Valid" : "Expired"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Driver Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Assigned Driver
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Driver Name:</span>{" "}
                      {selectedBus.driverName}
                    </div>
                    <div>
                      <span className="font-medium">Driver Email:</span>{" "}
                      {selectedBus.driverEmail}
                    </div>
                    <div>
                      <span className="font-medium">Driver ID:</span>{" "}
                      {selectedBus.driverId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 w-full">
                <button
                  onClick={() => handleDeleteBus(selectedBus)}
                  className="bg-red-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                >
                  Delete Bus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusesDashboard;
