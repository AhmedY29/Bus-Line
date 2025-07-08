import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';

const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPassengers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Missing token");

      const response = await axios.get(
        'https://bus-line-backend.onrender.com/api/bookings/booking-passengers',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response.data);

      const data = Array.isArray(response.data.passengers)
        ? response.data.passengers
        : [];

      setPassengers(data);
    } catch (error) {
      console.error('Error fetching passengers:', error);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const filteredPassengers = passengers
    .filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);
  const currentPassengers = filteredPassengers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Passengers</h1>
        <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="w-4 h-4 text-gray-500" />
            </div>
            <div className="relative w-82">
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search "
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-[#0165AD] hover:bg-blue-800"
            >
              <IoSearchOutline size={20} />
              <span className="sr-only">Search</span>
            </button>
          </div>
          </div>
        </form>
      </div>

      {/* Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-500 bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPassengers.map((p, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-t px-4 py-2">{p.name || 'N/A'}</td>
                <td className="border-t px-4 py-2">{p.address?.addressName || 'N/A'}</td>
                <td className="border-t px-4 py-2">{p.email || 'N/A'}</td>
                <td className='border-t px-4 py-2 text-green-600'> Active </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {currentPassengers.map((p, index) => (
          <div key={index} className="border border-gray-200 rounded p-4">
            <div className="flex justify-between">
              <strong>{p.name || 'N/A'}</strong>
              <span className="text-xs text-green-600"> Active</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">📍 {p.address?.addressName || 'N/A'}</p>
            <p className="text-sm text-gray-600">✉️ {p.email || 'N/A'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentPassengers.length} of {filteredPassengers.length} passengers
        </p>
        <nav className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === page + 1 ? 'bg-[#0165AD] text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default PassengerList;
