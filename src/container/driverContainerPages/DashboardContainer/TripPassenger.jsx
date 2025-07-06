import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const TripPassenger = () => {
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      passengers: 'passengers1',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      status: 'boarded',
    },
    {
      id: 2,
      passengers: 'passengers2',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      status: 'absent',
    },
    {
      id: 3,
      passengers: 'passengers2',
      neighborhood: 'Adobe',
      departureTime: '8:30 AM',
  
   
      status: 'boarded',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');


  const filteredPassengers = passengers.filter((passenger) =>
    passenger.passengers.toLowerCase().includes(searchQuery.toLowerCase()) ||
    passenger.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    passenger.trip.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleStatusChange = (id, newStatus) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger) =>
        passenger.id === id ? { ...passenger, status: newStatus } : passenger
      )
    );
  };

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Trip Passenger</h1>
        <form className="w-82">
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
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0165AD] focus:border-[#0165AD] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0165AD] dark:focus:border-[#0165AD]"
              placeholder="Search "
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
          Filters
        </button> */}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
             
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPassengers.map((passenger) => (
              <tr key={passenger.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">{passenger.passengers}</td>
                <td className="px-4 py-3">{passenger.neighborhood}</td>
                <td className="px-4 py-3">{passenger.departureTime}</td>
       
    
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(passenger.id, 'boarded')}
                      className={`px-2 py-1 rounded ${
                        passenger.status === 'boarded'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Boarded
                    </button>
                    <button
                      onClick={() => handleStatusChange(passenger.id, 'absent')}
                      className={`px-2 py-1 rounded ${
                        passenger.status === 'absent'
                          ? 'bg-red-200 text-red-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {filteredPassengers.map((passenger) => (
          <div key={passenger.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <h3 className="font-semibold">{passenger.passengers}</h3>
            <p className="text-sm text-gray-600 mt-1">📍 Neighborhood: {passenger.neighborhood}</p>
            <p className="text-sm text-gray-600">🕒 Departure: {passenger.departureTime}</p>
           
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleStatusChange(passenger.id, 'boarded')}
                className={`flex-1 py-1 rounded text-sm ${
                  passenger.status === 'boarded'
                    ? 'bg-green-200 text-green-700'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Boarded
              </button>
              <button
                onClick={() => handleStatusChange(passenger.id, 'absent')}
                className={`flex-1 py-1 rounded text-sm ${
                  passenger.status === 'absent'
                    ? 'bg-red-200 text-red-700'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripPassenger;