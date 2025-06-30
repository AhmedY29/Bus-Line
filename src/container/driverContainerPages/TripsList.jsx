import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
const TripsList = () => {

  const [trips, setTrips] = useState([
    {
      destination: 'Princess Noura',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      trip: 'King Saud U',
      status: 'Active',
    },
    {
      destination: 'King Saud U',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      trip: 'Princess Noura',
      status: 'Inactive',
    },
    {
      destination: 'Ronald Richards',
      neighborhood: 'Adobe',
      departureTime: '8:30 AM',
      trip: 'Princess Noura',
      status: 'Inactive',
    },
  ]);


  const [showModal, setShowModal] = useState(false);


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-md m-5 rounded-lg p-6">

<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
  <h1 className="text-xl font-bold">Trips</h1>

  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:ml-auto">
    <div className="relative flex-grow ">
      <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
      <input
        type="search"
        placeholder="Search Trips."
        className="pl-10 pr-4 py-2 w-full md:w-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>

    <button 
     onClick={handleOpenModal}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap">
      Add Trip +
    </button>
  </div>
</div>



   
<br />
    <div className="overflow-x-auto sm:block">
  <table className="w-full table-auto border-collapse">
    <thead className=" border-b  text-gray-500  text-sm hidden sm:table-header-group">
      <tr>
        <th className="px-4 py-3 text-left">Trip Destination</th>
        <th className="px-4 py-3 text-left">Neighborhood</th>
        <th className="px-4 py-3 text-left">Departure Time</th>
        <th className="px-4 py-3 text-left">Trip</th>
        <th className="px-4 py-3 text-left">Status</th>
      </tr>
    </thead>
    <tbody className="text-sm font-medium text-gray-700">
      {trips.map((trip, index) => (
        <tr
          key={index}
          className="flex flex-col border-b sm:table-row hover:bg-gray-50 transition-colors"
        >
          <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
            <span className="font-semibold sm:hidden mr-2">Destination:</span>
            {trip.destination}
          </td>
          <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
            <span className="font-semibold sm:hidden mr-2">Neighborhood:</span>
            {trip.neighborhood}
          </td>
          <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
            <span className="font-semibold sm:hidden mr-2">Departure:</span>
            {trip.departureTime}
          </td>
          <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
            <span className="font-semibold sm:hidden mr-2">Trip:</span>
            {trip.trip}
          </td>
          <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
            <span className="font-semibold sm:hidden mr-2">Status:</span>
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                trip.status === 'Active'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {trip.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-50 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Trip</h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18 6l-1.41-1.41L13.59 10.07 7.41 3.93 6 5.34l6 6 6-6z" />
                </svg>
              </button>
            </div>
            <form>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="neighborhood" className="block text-gray-700 font-medium mb-2">
                    Neighborhood
                  </label>
                  <select
                
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Neighborhood 1">Neighborhood 1</option>
                    <option value="Neighborhood 2">Neighborhood 2</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">
                    Destination
                  </label>
                  <select
                    id="destination"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Destination 1">Destination 1</option>
                    <option value="Destination 2">Destination 2</option>
                  </select>
                </div>
              </div>

           
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="departureTime" className="block text-gray-700 font-medium mb-2">
                    Departure Time
                  </label>
                  <input
                    type="text"
             
                    placeholder="write"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="arrivalTime" className="block text-gray-700 font-medium mb-2">
                    Arrival Time
                  </label>
                  <input
                    type="text"
                
                    placeholder="write"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

       
              <div className="mb-4">
                <label  className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <input
                  type="number"
              
                  placeholder="Price"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

        
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-200 hover:border-transparent rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsList;