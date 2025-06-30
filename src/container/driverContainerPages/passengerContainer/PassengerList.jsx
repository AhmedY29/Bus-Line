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
    { name: 'Jacob Jones', location: 'Yahoo', departureTime: '8:30 AM', email: 'jacob@yahoo.com', destination: 'King Saud U', status: 'Active' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const parseTimeToDate = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  
  const filteredPassengers = passengers.filter((passenger) =>
    passenger.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const sortedPassengers = [...filteredPassengers].sort((a, b) => {
    if (sortBy === 'Newest') {
      return parseTimeToDate(b.departureTime) - parseTimeToDate(a.departureTime);
    }
    return parseTimeToDate(a.departureTime) - parseTimeToDate(b.departureTime);
  });


  const totalPages = Math.ceil(sortedPassengers.length / itemsPerPage);
  const currentPassengers = sortedPassengers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (


<div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      
     
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

        <h1 className="text-2xl p-3 font-bold">Passenger</h1>
       
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