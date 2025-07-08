import React, { useState, useEffect } from 'react';
import { MdStarRate } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

const TripReports = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  const driverId = localStorage.getItem('driverId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!driverId || !token) {
      setError('Driver ID or token is missing.');
      setLoading(false);
      return;
    }

    fetch(`https://bus-line-backend.onrender.com/api/rating/driver/${driverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch ratings');
        return res.json();
      })
      .then(data => {
        setReports(Array.isArray(data) ? data : (data.ratings || []));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Unexpected error');
        setLoading(false);
      });
  }, [driverId, token]);

  const filteredReports = reports.filter(report =>
    (report.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof report.userId === 'string'
        ? report.userId.toLowerCase().includes(searchQuery.toLowerCase())
        : (report.userId?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      )
    )
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const currentReports = sortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleMoreDetails = (report) => setSelectedReport(report);
  const handleCloseModal = () => setSelectedReport(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) return <p className="p-6">Loading ratings...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (reports.length === 0) return <p className="p-6">No ratings found for this driver.</p>;

  const getUserName = (userId) => {
    if (!userId) return 'Unknown';
    if (typeof userId === 'string') return userId;
    if (typeof userId === 'object' && userId.name) return userId.name;
    return 'Unknown';
  };

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Driver Ratings</h1>

        <form className="w-82" onSubmit={e => e.preventDefault()}>
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by comment or user ID"
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
        </form>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:border-[#0165AD]"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Comment</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map(report => (
              <tr key={report._id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">{getUserName(report.userId)}</td>
                <td className="px-4 py-3">{report.comment}</td>
                <td className="px-4 py-3 flex items-center">

                  {[...Array(Math.floor(report.rating))].map((_, i) => (
                    <MdStarRate key={i} className="text-yellow-400 inline-block" />
                  ))}
                </td>
                <td className="px-4 py-3">{new Date(report.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleMoreDetails(report)}
                    className="bg-[#0165AD] hover:bg-[#0165addf] text-white px-3 py-1 rounded"
                  >
                    More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {currentReports.map(report => (
          <div key={report._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <p className="font-semibold">{getUserName(report.userId)}</p>
            <p className="text-sm text-gray-600 mt-1">💬 {report.comment}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 flex">
                {[...Array(Math.floor(report.rating))].map((_, i) => (
                  <MdStarRate key={i} className="text-yellow-400 text-xs" />
                ))}
              </span>
              <span className="ml-1 text-sm">{report.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">📅 {new Date(report.createdAt).toLocaleDateString()}</p>
         
            <button
              onClick={() => handleMoreDetails(report)}
              className="mt-3 w-full bg-[#0165AD] text-white text-sm px-3 py-1 rounded hover:bg-[#0165addf]"
            >
              More Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentReports.length} of {sortedReports.length} entries
        </p>
        <nav className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${currentPage === page + 1
                ? 'bg-[#0165AD] text-white'
                : 'bg-gray-200 hover:bg-blue-300 text-gray-800'}`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            Next
          </button>
        </nav>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Report Details</h2>
            <div className="space-y-2">
              <p> {getUserName(selectedReport.userId)}</p>
              <p><strong>Comment:</strong> {selectedReport.comment}</p>
              <p className="flex items-center">
                <strong>Rating:</strong>
                <span className="text-yellow-400 ml-1 flex">
                  {[...Array(Math.floor(selectedReport.rating))].map((_, i) => (
                    <MdStarRate key={i} className="inline-block text-sm" />
                  ))}
                </span>
                <span className="ml-2">{selectedReport.rating}</span>
              </p>
              <p><strong>Date:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>
            
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-[#0165AD] hover:bg-[#0165addb] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripReports;