import React, { useState, useEffect } from "react";

const TripRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    try {
      const response = await fetch("https://bus-line-backend.onrender.com/api/bookings/booking-pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch requests");

      const data = await response.json();
      setRequests(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`https://bus-line-backend.onrender.com/api/bookings/booking-driver/${id}/accept`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to accept booking");

      fetchRequests();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`https://bus-line-backend.onrender.com/api/bookings/booking-driver/${id}/reject`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to reject booking");

      fetchRequests();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredRequests = requests.filter((req) =>
    req.tripId?.destinationId?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Trip Requests</h1>

        <form
          className="w-full max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}
        >
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-3 ps-10 text-sm border rounded-lg bg-gray-50"
              placeholder="Search by destination..."
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
              <th className="px-4 py-3 text-left">Passenger Name</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-3">{req.tripId?.destinationId?.title || '-'}</td>
                <td className="px-4 py-3">{req.tripId?.neighborhood || '-'}</td>
                <td className="px-4 py-3">{req.tripId?.departureTime || '-'}</td>
                <td className="px-4 py-3">{req.userId?.name || '-'}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 rounded bg-green-200 text-green-700 text-xs">Paid</span>
                </td>
                <td className="py-3 space-x-2">
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {currentRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentRequests.length} of {filteredRequests.length} entries
        </p>
        <nav className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === page + 1 ? 'bg-[#0165AD] text-white' : 'bg-gray-200'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TripRequests;
