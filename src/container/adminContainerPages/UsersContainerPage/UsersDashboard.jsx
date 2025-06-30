import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { ToggleButton } from "@mui/material";
import AdminCard from "../../../components/AdminCard";
function UsersDashboard() {
  const [EditUser, setEditUser] = useState(false);
  const users = [
    { id: 1, name: "User 1", role: "Role" },
    { id: 2, name: "Ahmed", role: "Driver" },
    { id: 3, name: "Khaled", role: "Student" },
    { id: 4, name: "Fhaed", role: "Parent" },
    { id: 5, name: "h", role: "Driver" },
    { id: 6, name: "Ahmed", role: "Driver" },
    { id: 7, name: "Ahmed", role: "Driver" },
  ];
  const toggle = () => {
    setEditUser(!EditUser);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  md:px-5 p-2">
      {/* Header Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5 lg:gap-10 py-4 w-full ">
        <AdminCard icon={FaUserFriends} title="Drivers" count="24" />
        <AdminCard icon={FaUserFriends} title="Student" count="120" />
        <AdminCard icon={FaUserFriends} title="Parent" count="30" />
      </div>
      {/* Users Table */}
      <div className="flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full h-[60vh] ">
        <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
          <h1 className="text-lg font-bold w-1/3">Users</h1>
          <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
              <IoSearchOutline className="text-gray-400 text-2xl" />
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search users..."
                className="focus:outline-none bg-neutral-100 rounded-md p-1 w-full"
              />
            </div>
            <select
              name="role"
              id="role"
              className="border border-gray-300 rounded-md p-1 w-1/3"
            >
              <option value=""></option>
              <option value="">Newest to Oldest</option>
              <option value="">Alphabetical</option>
              <option value="">Oldest to Newest</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-y-auto gap-2 mt-10 md:mt-2 scrollbar-hide">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 "
            >
              <div className="flex flex-col">
                <h1 className="text-base font-semibold">{user.name}</h1>
                <h2 className="text-xs text-gray-500">{user.role}</h2>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-gray-200 pl-4 h-full ">
                <FaUserPen
                  className="text-gray-400 cursor-pointer text-2xl"
                  onClick={() => toggle()}
                />
                <MdOutlineDelete className="text-gray-400 cursor-pointer text-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Edit User Modal popup */}
      {EditUser && (
        <div className="fixed inset-10 md:inset-auto w-4/5 md:w-3/5 h-4/5 flex flex-col bg-white rounded-2xl items-center justify-center py-4 gap-5 z-50">
          <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="User Name"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Role"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="User Name"
                className="border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Role"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <button
            onClick={() => toggle()}
            className="bg-blue-500 text-white rounded-md p-2 w-2/3 cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersDashboard;
