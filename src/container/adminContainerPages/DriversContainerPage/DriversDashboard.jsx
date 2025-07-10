import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";
function DriversDashboard() {
  const API = "https://bus-line-backend.onrender.com/api";
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [EditUser, setEditUser] = useState(false);
  const [acceptUser, setAcceptUser] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state for editing driver
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    status: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const fetchDrivers = async () => {
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
      console.log("Drivers fetched:", response.data.driver);
      setDrivers(response.data.driver);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };
  useEffect(() => {
    fetchDrivers();
  }, []);

  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ];

  const filteredData = drivers
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleEditUser = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name || "",
      email: driver.email || "",
      phoneNumber: driver.phoneNumber ? driver.phoneNumber.toString() : "",
      status: driver.status || "",
      accountName: driver.bankAccount?.accountName || "",
      accountNumber: driver.bankAccount?.accountNumber || "",
      bankName: driver.bankAccount?.bankName || "",
    });
    setEditUser(true);
    setError("");
    setSuccess("");
  };

  const handleAcceptUser = (driver) => {
    setSelectedDriver(driver);
    setAcceptUser(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setEditUser(false);
    setAcceptUser(false);
    setSelectedDriver(null);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      status: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
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

  const handleSaveDriver = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Validate required fields
      if (!formData.name.trim()) {
        setError("Name is required");
        return;
      }

      if (!formData.email.trim()) {
        setError("Email is required");
        return;
      }

      if (!formData.status) {
        setError("Status is required");
        return;
      }

      // Convert phoneNumber to string for validation
      const phoneNumberStr = formData.phoneNumber
        ? formData.phoneNumber.toString()
        : "";

      if (!phoneNumberStr || phoneNumberStr.trim() === "") {
        setError("Phone number is required");
        return;
      }

      // Check if phone number contains only digits
      if (!/^\d+$/.test(phoneNumberStr.trim())) {
        setError("Phone number must contain only digits");
        return;
      }

      if (phoneNumberStr.trim().length !== 9) {
        setError("Phone number must be 9 digits");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        status: formData.status,
        bankAccount: {
          accountName: formData.accountName,
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
        },
      };

      await axios.put(`${API}/admin/driver/${selectedDriver._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Driver updated successfully!");
      await fetchDrivers();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error updating driver:", error);
      toast.error(error.response?.data?.message || "Failed to update driver");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDriver = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(
        `${API}/admin/driver/${selectedDriver._id}`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Driver approved successfully!");
      await fetchDrivers();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error approving driver:", error);
      toast.error(error.response?.data?.message || "Failed to approve driver");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectDriver = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(
        `${API}/admin/driver/${selectedDriver._id}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Driver rejected successfully!");
      await fetchDrivers();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error rejecting driver:", error);
      toast.error(error.response?.data?.message || "Failed to reject driver");
    } finally {
      setLoading(false);
    }
  };
  const handlePendingDriver = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(
        `${API}/admin/driver/${selectedDriver._id}`,
        { status: "pending" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Driver set to pending successfully!");
      await fetchDrivers();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error setting driver to pending:", error);
      toast.error(
        error.response?.data?.message || "Failed to set driver to pending"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteDriver = async (driver) => {
    const confirmDelete = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center">
              <IoIosInformationCircleOutline className="inline-block mr-1 text-2xl text-red-500" />
              <h1 className="font-bold">Warning!</h1>
            </div>
            <div className="text-xs md:text-base lg:text-lg text-gray-900">
              Are you sure you want to delete driver "{driver.name}"?
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    });
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const loadingToast = toast.loading(`Deleting driver "${driver.name}"...`);

      await axios.delete(`${API}/admin/driver/${driver._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Driver deleted:", driver.name);

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(`Driver "${driver.name}" deleted successfully!`);

      // Refresh the drivers list
      await fetchDrivers();
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error(error.response?.data?.message || "Failed to delete driver");
    }
  };
  return (
    <div
      className={`flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full h-[80vh]`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
        <h1 className="text-lg font-bold w-1/3">Drivers</h1>
        <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
          {/* Search Input */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
            <IoSearchOutline className="text-gray-400 text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search drivers..."
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
          <h1 className="text-xs lg:text-base font-semibold w-1/4 md:w-1/2 text-left">
            Name
          </h1>
          <h2 className=" text-xs lg:text-base font-semibold w-1/2  md:w-full text-left">
            Email
          </h2>
          <h2 className="hidden md:block text-xs lg:text-base font-semibold w-1/2 text-left">
            Phone
          </h2>

          <div className="flex items-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4   h-full w-3/12 md:w-6/12  ">
            <h1 className="text-xs lg:text-base font-semibold  text-center w-full">
              Edit
            </h1>
          </div>
        </div>
        {filteredData.map((item) => (
          <div
            className="flex items-center p-2 rounded-md hover:bg-gray-100"
            key={item._id || item.id}
          >
            <div className=" flex flex-col text-xs lg:text-base  w-1/4 md:w-1/2 text-left">
              <h1>{item.name}</h1>
              <p
                className={`text-xs px-2 py-0.5 rounded-sm w-fit  ${
                  item.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : item.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </p>
            </div>
            <h2 className=" text-xs lg:text-base  w-1/2  md:w-full text-left">
              {item.email}
            </h2>
            <h2 className="hidden md:block text-xs lg:text-base  w-1/2 text-left">
              {item.phoneNumber}
            </h2>
            {item.status === "approved" ? (
              <div className="flex items-center justify-around gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4   h-full w-3/12 md:w-6/12  ">
                <FaUserPen
                  className="cursor-pointer text-2xl xl:text-3xl text-blue-600 transition-colors"
                  onClick={() => handleEditUser(item)}
                />
                <MdOutlineDelete
                  className="cursor-pointer text-2xl xl:text-3xl text-red-600 transition-colors hover:text-red-800"
                  onClick={() => handleDeleteDriver(item)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4   h-full w-3/12 md:w-6/12  ">
                <button
                  className="bg-[#f1963f] text-white text-xs lg:text-sm rounded-md py-1 md:p-2 w-full xl:w-3/4 cursor-pointer hover:bg-[#d17f32] transition-colors duration-200"
                  onClick={() => handleAcceptUser(item)}
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}
        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data found</p>
          </div>
        )}
      </div>
      {/* Edit User Modal popup */}
      {EditUser && selectedDriver && (
        <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-4/5 md:w-3/5 max-h-4/5 flex flex-col gap-5 relative overflow-y-auto scrollbar-hide">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">
                Edit Driver: {selectedDriver.name}
              </h2>

              {/* Success Message */}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-full">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Driver Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Driver Name"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Phone Number
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Account Name
                    <input
                      type="text"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      placeholder="Account Name"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
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
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    Account Number
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Account Number"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full px-4">
                <label className="flex flex-col gap-1">
                  Bank Name
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Bank Name"
                    className="border border-gray-300 rounded-md p-2"
                    disabled={loading}
                  />
                </label>
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
                  onClick={handleSaveDriver}
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
      {/* View Details Modal popup */}
      {acceptUser && selectedDriver && (
        <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-5/6 md:w-4/5 max-h-5/6 flex flex-col gap-5 relative overflow-y-auto scrollbar-hide">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">
                Driver Details: {selectedDriver.name}
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
              {/* Driver Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4">
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedDriver.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedDriver.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedDriver.phoneNumber}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-sm ${
                          selectedDriver.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : selectedDriver.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedDriver.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bank Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Bank Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Account Name:</span>{" "}
                      {selectedDriver.bankAccount?.accountName || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Account Number:</span>{" "}
                      {selectedDriver.bankAccount?.accountNumber || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Bank Name:</span>{" "}
                      {selectedDriver.bankAccount?.bankName || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                {selectedDriver.vehicleId && (
                  <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      Vehicle Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Vehicle Name:</span>{" "}
                          {selectedDriver.vehicleId.name}
                        </div>
                        <div>
                          <span className="font-medium">Model:</span>{" "}
                          {selectedDriver.vehicleId.model}
                        </div>
                        <div>
                          <span className="font-medium">Color:</span>{" "}
                          {selectedDriver.vehicleId.color}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Plate Number:</span>{" "}
                          {selectedDriver.vehicleId.plateNumber}
                        </div>
                        <div>
                          <span className="font-medium">Capacity:</span>{" "}
                          {selectedDriver.vehicleId.capacity} passengers
                        </div>
                        <div>
                          <span className="font-medium">Yearly Check:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded text-sm ${
                              selectedDriver.vehicleId.yearlyCheck
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedDriver.vehicleId.yearlyCheck
                              ? "Valid"
                              : "Expired"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* License Information */}
                <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    License Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">License Image:</span>
                      {selectedDriver.licenseImage ? (
                        <a
                          href={selectedDriver.licenseImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          View License
                        </a>
                      ) : (
                        "No image provided"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedDriver.status === "pending" ? (
                <div className="flex items-center justify-center gap-5 w-full">
                  <button
                    onClick={handleRejectDriver}
                    className="bg-rose-600 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Reject"}
                  </button>
                  <button
                    onClick={handleApproveDriver}
                    className="bg-green-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Approve"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-5 w-full">
                  <button
                    onClick={() =>
                      handleDeleteDriver(selectedDriver).then(() => {
                        handleCloseModal();
                      })
                    }
                    className="bg-red-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-red-600 transition-colors duration-200"
                    disabled={loading}
                  >
                    Delete
                  </button>
                  <button
                    onClick={handlePendingDriver}
                    className="bg-yellow-500 text-white rounded-md p-3 w-1/3 cursor-pointer hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pending"}
                  </button>
                </div>
              )}
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
            color: "text-neutral-800",
          },
        }}
      />
    </div>
  );
}

export default DriversDashboard;
