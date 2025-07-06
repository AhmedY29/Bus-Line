import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const PassengerList = () => {
  const passengers = [
    { name: 'Jane Cooper', location: 'Microsoft', departureTime: '8:30 AM', email: 'jane@microsoft.com', destination: 'King Saud U', status: 'Active' },
    { name: 'Floyd Miles', location: 'Yahoo', departureTime: '8:30 AM', email: 'floyd@yahoo.com', destination: 'Princess Noura', status: 'Inactive' },
    { name: 'Ronald Richards', location: 'Adobe', departureTime: '8:30 AM', email: 'ronald@adobe.com', destination: 'Princess Noura', status: 'Inactive' },
    { name: 'Marvin McKinney', location: 'Tesla', departureTime: '8:30 AM', email: 'marvin@tesla.com', destination: 'King Saud U', status: 'Active' },
    { name: 'Jerome Bell', location: 'Google', departureTime: '8:30 AM', email: 'jerome@google.com', destination: 'Princess Noura', status: 'Active' },
    { name: 'Kathryn Murphy', location: 'Microsoft', departureTime: '8:30 AM', email: 'kathryn@microsoft.com', destination: 'King Saud U', status: 'Active' },
    { name: 'Jacob Jones', location: 'Yahoo', departureTime: '8:30 AM', email: 'jacob@yahoo.com', destination: 'King Saud U', status: 'Active' },
    { name: 'Another User', location: 'Apple', departureTime: '8:30 AM', email: 'another@apple.com', destination: 'King Saud U', status: 'Inactive' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const parseTimeToDate = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };


  const filteredByStatus = passengers.filter(passenger => {
    if (filterStatus === 'All') return true;
    return passenger.status === filterStatus;
  });


  const filteredByName = filteredByStatus.filter((passenger) =>
    passenger.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const sortedPassengers = [...filteredByName].sort((a, b) => {
    return parseTimeToDate(b.departureTime) - parseTimeToDate(a.departureTime);
  });


  const totalPages = Math.ceil(sortedPassengers.length / itemsPerPage);
  const currentPassengers = sortedPassengers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Passenger</h1>

        <form className="w-full max-w-sm">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by name..."
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

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); 
          }}
          className="block py-2.5 px-0 text-sm  bg-transparent border-0 border-b-2 border-[#0165AD]  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 " 
          >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-500">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Departure Time</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Destination</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPassengers.map((passenger, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-t border-gray-200 px-4 py-2">{passenger.name}</td>
                <td className="border-t border-gray-200 px-4 py-2">{passenger.location}</td>
                <td className="border-t border-gray-200 px-4 py-2">{passenger.departureTime}</td>
                <td className="border-t border-gray-200 px-4 py-2">{passenger.email}</td>
                <td className="border-t border-gray-200 px-4 py-2">{passenger.destination}</td>
                <td className="border-t border-gray-200 px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      passenger.status === 'Active'
                        ? 'bg-green-200 text-green-700'
                        : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {passenger.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {currentPassengers.map((passenger, index) => (
          <div key={index} className="border border-gray-200 rounded p-4">
            <div className="flex justify-between">
              <strong>{passenger.name}</strong>
              <span
                className={`inline-block px-2 py-1 rounded text-xs ${
                  passenger.status === 'Active'
                    ? 'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'
                }`}
              >
                {passenger.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">📍 {passenger.location}</p>
            <p className="text-sm text-gray-600">🕒 {passenger.departureTime}</p>
            <p className="text-sm text-gray-600">✉️ {passenger.email}</p>
            <p className="text-sm text-gray-600">🎯 {passenger.destination}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentPassengers.length} of {sortedPassengers.length} entries
        </p>
        <nav className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${
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
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
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

export default PassengerList;