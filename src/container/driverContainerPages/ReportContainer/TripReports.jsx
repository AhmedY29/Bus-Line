import React, { useState, useEffect } from 'react';
import { MdStarRate } from "react-icons/md";

const TripReports = () => {
  const reports = [
    {
      id: 1,
      destination: 'Princess Noura',
      comment: 'dadasdas asdasd.....',
      rating: 4.7,
      email: 'jane@microsoft.com',
      details: {
        tripDate: '2023-10-05',
        driverName: 'John Doe',
        busNumber: 'B-1234',
        feedback: 'Great service!',
      },
    },
    {
      id: 2,
      destination: 'King Saud U',
      comment: 'ANY N',
      rating: 4.7,
      email: 'floyd@yahoo.com',
      details: {
        tripDate: '2023-10-06',
        driverName: 'Alice Smith',
        busNumber: 'B-5678',
        feedback: 'Very punctual.',
      },
    },
    {
      id: 3,
      destination: 'Adobe',
      comment: 'Great trip!',
      rating: 4.9,
      email: 'ronald@adobe.com',
      details: {
        tripDate: '2023-10-07',
        driverName: 'Michael Johnson',
        busNumber: 'B-9012',
        feedback: 'Excellent experience.',
      },
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [selectedReport, setSelectedReport] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const filteredReports = reports.filter((report) =>
    report.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedReports = [...filteredReports].sort((a, b) => {
    const dateA = new Date(a.details.tripDate);
    const dateB = new Date(b.details.tripDate);
    return sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
  });


  const totalPages = Math.ceil(sortedReports.length / itemsPerPage);
  const currentReports = sortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleMoreDetails = (report) => setSelectedReport(report);
  const handleCloseModal = () => setSelectedReport(null);


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-white m-5 shadow-md rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Report</h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Destination..."
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          />
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
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Comment</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">{report.destination}</td>
                <td className="px-4 py-3">{report.comment}</td>
                <td className="px-4 py-3 flex items-center">
                  <span className="mr-1">{report.rating}</span>
                  {[...Array(Math.floor(report.rating))].map((_, i) => (
                    <MdStarRate key={i} className="text-yellow-400 inline-block" />
                  ))}
                </td>
                <td className="px-4 py-3">{report.email}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleMoreDetails(report)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
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
        {currentReports.map((report) => (
          <div key={report.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-semibold">{report.destination}</h3>
            <p className="text-sm text-gray-600 mt-1">💬 {report.comment}</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 flex">
                {[...Array(Math.floor(report.rating))].map((_, i) => (
                  <MdStarRate key={i} className="text-yellow-400 text-xs" />
                ))}
              </span>
              <span className="ml-1 text-sm">{report.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">📧 {report.email}</p>
            <button
              onClick={() => handleMoreDetails(report)}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
              More Details
            </button>
          </div>
        ))}
      </div>


      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentReports.length} of {sortedReports.length} entries
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

    
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Report Details</h2>
            <div className="space-y-2">
              <p><strong>Trip Destination:</strong> {selectedReport.destination}</p>
              <p><strong>Comment:</strong> {selectedReport.comment}</p>
              <p className="flex items-center">
                <strong>Rating:</strong>
                <span className="text-yellow-400 ml-1">
                  {[...Array(Math.floor(selectedReport.rating))].map((_, i) => (
                    <MdStarRate key={i} className="inline-block text-sm" />
                  ))}
                </span>
                <span>{selectedReport.rating}</span>
              </p>
              <p><strong>Email:</strong> {selectedReport.email}</p>
              <p><strong>Trip Date:</strong> {selectedReport.details.tripDate}</p>
              <p><strong>Driver Name:</strong> {selectedReport.details.driverName}</p>
              <p><strong>Bus Number:</strong> {selectedReport.details.busNumber}</p>
              <p><strong>Feedback:</strong> {selectedReport.details.feedback}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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