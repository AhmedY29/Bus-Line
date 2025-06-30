import React, { useState } from 'react';

const TripCard = () => {

  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  
  const destinations = ['destinations1', 'destinations2', 'destinations3', 'destinations4', 'destinations5'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
 
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-700 font-medium">Trip ID #12334</p>
          <small className="text-gray-500 flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2a10 10 0 0110 10c0 4.42-3.58 8-8 8a8 8 0 01-8-8A8 8 0 0112 2zm3 9H9a1 1 0 010-2h3v2z" />
            </svg>
            <span>Today</span>
          </small>
        </div>
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Start
        </button>
      </div>


      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <label htmlFor="from" className="block text-gray-700 font-medium mb-2">
            From:
          </label>
          <input
            type="text"
            id="from"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="Current Location"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">
            Destination:
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Destination</option>
            {destinations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

 
      <div>
        <h3 className="text-lg font-semibold mb-2">Trip Passenger</h3>
        <button
          type="button"
          className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-1 px-2 rounded inline-flex items-center space-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2a10 10 0 0110 10c0 4.42-3.58 8-8 8a8 8 0 01-8-8A8 8 0 0112 2zm3 9H9a1 1 0 010-2h3v2z" />
          </svg>
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default TripCard;