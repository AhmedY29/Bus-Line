import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

function AdminTable({
  title = "Users",
  data = [],
  searchPlaceholder = "Search...",
  sortOptions = [
    { value: "", label: "Sort by..." },
    { value: "newest", label: "Newest to Oldest" },
    { value: "alphabetical", label: "Alphabetical" },
    { value: "oldest", label: "Oldest to Newest" },
  ],
  onEdit,
  onDelete,
  height = "h-[60vh]",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Filter and sort data
  let filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "alphabetical") {
    filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "oldest") {
    filteredData = [...filteredData].reverse();
  }

  return (
    <div
      className={`flex flex-col gap-2 p-2 bg-white shadow-md rounded-lg w-full ${height}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between py-1 px-2 items-center h-12 gap-2">
        <h1 className="text-lg font-bold w-1/3">{title}</h1>
        <div className="flex items-center justify-between gap-2.5 w-full md:w-2/3">
          {/* Search Input */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
            <IoSearchOutline className="text-gray-400 text-2xl" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder={searchPlaceholder}
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
      <div className="flex flex-col h-full overflow-y-auto gap-2 mt-10 md:mt-2 scrollbar-hide">
        <div className="flex items-center p-2">
          <h1 className="text-xs lg:text-base font-bold w-1/2 text-left">
            Name
          </h1>
          <h2 className="hidden md:block text-xs lg:text-base font-bold w-1/2  md:w-full text-left">
            Email
          </h2>
          <h2 className="text-xs lg:text-base font-bold w-1/2 text-left">
            Role
          </h2>

          <div className="flex items-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4   h-full w-3/12 md:w-2/12  ">
            <h1 className="text-xs lg:text-base font-semibold  text-left md:pr-9">
              Edit
            </h1>
          </div>
        </div>
        {filteredData.map((item, index) => (
          <div
            key={item.id || item._id || index}
            className="flex items-center p-2 rounded-md hover:bg-gray-100"
          >
            <h1 className="text-xs lg:text-base  w-1/2 text-left">
              {item.name}
            </h1>
            <h2 className="hidden md:block text-xs lg:text-base  w-1/2 md:w-full text-left">
              {item.email}
            </h2>
            <h2 className="text-xs lg:text-base  w-1/2 text-left">
              {item.role}
            </h2>

            <div className="flex items-center gap-1 md:gap-4 border-l-2 border-gray-200 pl-1 md:pl-4   h-full w-3/12 md:w-2/12   ">
              <FaUserPen
                className="cursor-pointer text-2xl text-blue-600 transition-colors"
                onClick={() => onEdit && onEdit(item)}
              />
              <MdOutlineDelete
                className="cursor-pointer text-2xl text-red-600 transition-colors"
                onClick={() => onDelete && onDelete(item)}
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
    </div>
  );
}

export default AdminTable;
