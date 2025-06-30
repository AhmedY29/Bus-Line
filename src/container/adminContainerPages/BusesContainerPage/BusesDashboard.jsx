import React from "react";
import AdminTable from "../../../components/AdminTable";
import { useState } from "react";
import { HiX } from "react-icons/hi";
function BusesDashboard() {
  const [EditUser, setEditUser] = useState(false);

  const Buses = [
    { id: 1, name: "Bus 1", role: "Driver name" },
    { id: 2, name: "Bus 2", role: "Driver name" },
    { id: 3, name: "Bus 3", role: "Driver name" },
    { id: 4, name: "Bus 4", role: "Driver name" },
    { id: 5, name: "Bus 5", role: "Driver name" },
    { id: 6, name: "Bus 6", role: "Driver name" },
    { id: 7, name: "Bus 7", role: "Driver name" },
    { id: 8, name: "Bus 8", role: "Driver name" },
    { id: 9, name: "Bus 9", role: "Driver name" },
    { id: 10, name: "Bus 10", role: "Driver name" },
    { id: 11, name: "Bus 11", role: "Driver name" },
    { id: 12, name: "Bus 12", role: "Driver name" },
    { id: 13, name: "Bus 13", role: "Driver name" },
    { id: 14, name: "Bus 14", role: "Driver name" },
    { id: 15, name: "Bus 15", role: "Driver name" },
  ];
  const handleEditUser = () => {
    setEditUser(!EditUser);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  md:px-5 p-2 ">
      <AdminTable
        title="Buses"
        data={Buses}
        searchPlaceholder="Search buses..."
        onEdit={handleEditUser}
        height="h-[80vh]"
      />
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
              <h2 className="text-2xl font-semibold mb-4">Edit Bus</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Driver Name
                    <input
                      type="text"
                      placeholder="Driver Name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Plate Number
                    <input
                      type="text"
                      placeholder="Plate Number"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Capacity
                    <input
                      type="number"
                      placeholder="Capacity"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1">
                    Bus Name
                    <input
                      type="text"
                      placeholder="Bus Name"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Color
                    <input
                      type="text"
                      placeholder="Color"
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    Model
                    <input
                      type="text"
                      placeholder="Model"
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

export default BusesDashboard;
