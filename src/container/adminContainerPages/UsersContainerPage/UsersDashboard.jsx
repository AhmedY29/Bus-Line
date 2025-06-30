import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import AdminCard from "../../../components/AdminCard";
import AdminTable from "../../../components/AdminTable";
function UsersDashboard() {
  const [EditUser, setEditUser] = useState(false);

  const users = [
    { id: 1, name: "User 1", role: "Role" },
    { id: 2, name: "Ahmed", role: "Driver" },
    { id: 3, name: "Khaled" },
    { id: 4, name: "Fhaed", role: "Parent" },
    { id: 5, name: "h", role: "Driver" },
    { id: 6, name: "Ahmed", role: "Driver" },
    { id: 7, name: "Ahmed", role: "Driver" },
  ];

  const handleEditUser = () => {
    setEditUser(!EditUser);
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user:", user);
    // Add delete logic here
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  md:px-5 p-2 ">
      {/* Header Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5 lg:gap-10 py-4 w-full ">
        <AdminCard icon={FaUserFriends} title="Drivers" count="24" />
        <AdminCard icon={FaUserFriends} title="Student" count="120" />
        <AdminCard icon={FaUserFriends} title="Parent" count="30" />
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
              onClick={() => handleEditUser()}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    User Name
                    <input
                      type="text"
                      placeholder="User Name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Password
                    <input
                      type="text"
                      placeholder="Password"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Email
                    <input
                      type="text"
                      placeholder="email"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span>Select Role</span>
                    <select className="border border-gray-300 rounded-md p-2">
                      <option value=""></option>
                      <option value="admin">Admin</option>
                      <option value="driver">Driver</option>
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                    </select>
                  </label>
                </div>
              </div>
              <button
                onClick={() => handleEditUser()}
                className="bg-blue-500 text-white rounded-md p-2 w-2/3 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersDashboard;
