import React from "react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";

function TripsDashboard() {
  const [EditUser, setEditUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const trips = [
    { id: 1, name: "Trip 1", role: "Location 1" },
    { id: 2, name: "Trip 2", role: "Location 2" },
    { id: 3, name: "Trip 3", role: "Location 3" },
    { id: 4, name: "Trip 4", role: "Location 4" },
    { id: 5, name: "Trip 5", role: "Location 5" },
    { id: 6, name: "Trip 6", role: "Location 6" },
    { id: 7, name: "Trip 7", role: "Location 7" },
    { id: 8, name: "Trip 8", role: "Location 8" },
    { id: 9, name: "Trip 9", role: "Location 9" },
    { id: 10, name: "Trip 10", role: "Location 10" },
    { id: 11, name: "Trip 11", role: "Location 11" },
    { id: 12, name: "Trip 12", role: "Location 12" },
    { id: 13, name: "Trip 13", role: "Location 13" },
    { id: 14, name: "Trip 14", role: "Location 14" },
    { id: 15, name: "Trip 15", role: "Location 15" },
  ];
  const sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ];
  const filteredData = trips.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEditUser = () => {
    setEditUser(!EditUser);
  };
  const handleDeleteUser = (user) => {
    console.log("Delete user:", user);
    // Add delete logic here
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
      <div className="flex flex-col h-full overflow-y-auto gap-4 mt-10 md:mt-2 scrollbar-hide">
        {filteredData.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2">
            <div className="flex flex-col">
              <h1 className="text-base font-semibold">{item.name}</h1>
              <h2 className="text-xs text-gray-500">{item.role}</h2>
            </div>
            <div className="flex items-center gap-4 border-l-2 border-gray-200 pl-4 h-full">
              <FaRegEdit
                className="text-gray-400 cursor-pointer text-2xl hover:text-blue-600 transition-colors"
                onClick={() => handleEditUser()}
              />
              <MdOutlineDelete
                className="text-gray-400 cursor-pointer text-2xl hover:text-red-600 transition-colors"
                onClick={() => handleDeleteUser()}
              />
            </div>
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
              <h2 className="text-2xl font-semibold mb-4">Edit Trip</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    License Number
                    <input
                      type="text"
                      placeholder="License Number"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Trip Date
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Arivel Time
                    <input
                      type="time"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    <span>Select Destination</span>
                    <select className="border border-gray-300 rounded-md p-2">
                      <option value=""></option>
                      <option value="uptown">Uptown</option>
                      <option value="suburbs">Suburbs</option>
                      <option value="rural">Rural</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span>Select Neighborhood</span>
                    <select className="border border-gray-300 rounded-md p-2">
                      <option value=""></option>
                      <option value="downtown">Downtown</option>
                      <option value="uptown">Uptown</option>
                      <option value="suburbs">Suburbs</option>
                      <option value="rural">Rural</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    Price
                    <input
                      type="text"
                      placeholder="Price"
                      className="border border-gray-300 rounded-md p-2"
                    />
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

export default TripsDashboard;
