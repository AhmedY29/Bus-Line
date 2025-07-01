import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const TripPassenger = () => {
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      destination: 'Princess Noura',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      email: '',
      trip: 'King Saud U',
      status: 'boarded',
    },
    {
      id: 2,
      destination: 'King Saud U',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      email: 'floyd@yahoo.com',
      trip: 'Princess Noura',
      status: 'absent',
    },
    {
      id: 3,
      destination: 'Ronald Richards',
      neighborhood: 'Adobe',
      departureTime: '8:30 AM',
      email: 'ronald@adobe.com',
      trip: 'Princess Noura',
      status: 'boarded',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter
  const filteredPassengers = passengers.filter((passenger) =>
    passenger.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Status Change
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
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 px-2 gap-2 md:w-1/2">
  <IoSearchOutline className="text-gray-400 text-xl" />
  <input
    type="search"
    name="search"
    id="search"
    placeholder="Search passengers..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="focus:outline-none bg-gray-100 rounded-md p-1 w-full"
  />
</div>
        <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
          Filters
        </button>
      </div>

   
    


      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Trip</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPassengers.map((passenger) => (
              <tr key={passenger.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3">{passenger.destination}</td>
                <td className="px-4 py-3">{passenger.neighborhood}</td>
                <td className="px-4 py-3">{passenger.departureTime}</td>
                <td className="px-4 py-3">{passenger.email || '-'}</td>
                <td className="px-4 py-3">{passenger.trip}</td>
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
            <h3 className="font-semibold">{passenger.destination}</h3>
            <p className="text-sm text-gray-600 mt-1">📍 Neighborhood: {passenger.neighborhood}</p>
            <p className="text-sm text-gray-600">🕒 Departure: {passenger.departureTime}</p>
            <p className="text-sm text-gray-600">✉️ Email: {passenger.email || '-'}</p>
            <p className="text-sm text-gray-600">🚌 Trip: {passenger.trip}</p>
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