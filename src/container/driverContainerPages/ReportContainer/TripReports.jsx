import React, { useState, useEffect } from 'react';
import { MdStarRate } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

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
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Reports</h1>
        <form className="w-82">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
          
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search "
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-[#0165AD] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
       
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block py-2.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-[#0165AD] focus:outline-none focus:ring-0 focus:border-[#0165AD] peer" 
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
              className="mt-3 w-full bg-[#0165AD] hover:bg- text-white text-sm px-3 py-1 rounded"
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
                  ? 'bg-[#0165AD] text-white'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
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