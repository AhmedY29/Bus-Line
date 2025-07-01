import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
const TripRequests = () => {
  const requests = [
    { id: 1, destination: 'Princess Noura', neighborhood: 'ANY N', departureTime: '8:30 AM', passengerEmail: 'jane@microsoft.com', paymentStatus: 'Paid', status: 'Pending' },
    { id: 2, destination: 'King Saud U', neighborhood: 'ANY N', departureTime: '8:30 AM', passengerEmail: 'floyd@yahoo.com', paymentStatus: 'Paid', status: 'Pending' },
    { id: 3, destination: 'King Saud U', neighborhood: 'ANY N', departureTime: '8:30 AM', passengerEmail: 'ronald@adobe.com', paymentStatus: 'Paid', status: 'Pending' },
  ]

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  const filteredRequests = requests.filter((request) =>
    request.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.departureTime) - new Date(a.departureTime);
    }
    return new Date(a.departureTime) - new Date(b.departureTime);
  });

  
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const currentRequests = sortedRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAccept = (id) => {
    console.log(`Accepted request with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected request with ID: ${id}`);
  };

  return (
    <div className="bg-white m-4 shadow-md rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Request</h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
          <IoSearchOutline className="text-gray-400 text-xl" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             className="focus:outline-none bg-gray-100 rounded-md p-1 w-full"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Trip Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
              <th className="px-4 py-3 text-left">Passengers</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-3">{request.destination}</td>
                <td className="px-4 py-3">{request.neighborhood}</td>
                <td className="px-4 py-3">{request.departureTime}</td>
                <td className="px-4 py-3">{request.passengerEmail}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 rounded bg-green-200 text-green-700 text-xs">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 gap-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="block md:hidden space-y-4">
        {currentRequests.map((request) => (
          <div key={request.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{request.destination}</h3>
                <p className="text-sm text-gray-600">📍 {request.neighborhood}</p>
                <p className="text-sm text-gray-600">🕒 {request.departureTime}</p>
                <p className="text-sm text-gray-600">✉️ {request.passengerEmail}</p>
                <p className="text-sm mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-200 text-green-700">
                    Paid
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="block w-full text-center bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentRequests.length} of {sortedRequests.length} entries
        </p>
        <nav className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded transition-colors ${
                currentPage === page + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-blue-300 text-gray-800'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TripRequests;