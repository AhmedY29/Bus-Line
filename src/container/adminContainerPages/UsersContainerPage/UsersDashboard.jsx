import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserFriends } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import AdminCard from "../../../components/AdminCard";
import AdminTable from "../../../components/AdminTable";

function UsersDashboard() {
  const API = "https://bus-line-backend.onrender.com/api";
  const [EditUser, setEditUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state for editing user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Function to fetch users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`${API}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseDrivers = await axios.get(`${API}/admin/drivers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Users fetched:", response.data.users);
      console.log("Drivers fetched:", responseDrivers.data.driver);
      setUsers(response.data.users);
      setDrivers(responseDrivers.data.driver);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "",
    });
    setEditUser(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setEditUser(false);
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
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

  const handleSaveUser = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Check if email already exists for a different user
      const emailExists = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user._id !== selectedUser._id
      );

      if (emailExists) {
        setError("Email already exists for another user");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (!formData.name.trim()) {
        setError("Name is required");
        return;
      }

      if (!formData.role) {
        setError("Role is required");
        return;
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      if (formData.password.trim()) {
        updateData.password = formData.password;
      }
      const response = await axios.put(
        `${API}/admin/user/${selectedUser._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User updated:", response.data);
      setSuccess("User updated successfully!");
      await fetchUsers();
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete user "${user.name}"?`
      );
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(`${API}/admin/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("User deleted:", user.name);

      // Refresh the users list
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  md:px-5 p-2 ">
      {/* Header Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5 lg:gap-10 py-4 w-full ">
        <AdminCard
          icon={FaUserFriends}
          title="Drivers"
          count={drivers.length}
        />
        <AdminCard
          icon={FaUserFriends}
          title="Student"
          count={users.filter((user) => user.role === "student").length}
        />
        <AdminCard
          icon={FaUserFriends}
          title="Parent"
          count={users.filter((user) => user.role === "parent").length}
        />
      </div>
      {/* Users Table */}
      <AdminTable
        title="Users"
        data={users}
        searchPlaceholder="Search users..."
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {/* Edit User Modal popup */}
      {EditUser && (
        <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-4/5 md:w-3/5 max-h-4/5 flex flex-col gap-5 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">
                Edit User: {selectedUser?.name}
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
                    User Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="User Name"
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="flex items-center gap-1">
                      Password{" "}
                      <span className="text-gray-500 text-xs">
                        (leave empty to keep current)
                      </span>
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="New Password"
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
                    <span>Select Role</span>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      disabled={loading}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="driver">Driver</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
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
                  onClick={handleSaveUser}
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
    </div>
  );
}

export default UsersDashboard;
