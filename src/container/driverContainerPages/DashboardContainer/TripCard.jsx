import React, { useState } from 'react';

const TripCard = () => {
  const [trip, setTrip] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Al Hamra');
  const [destination, setDestination] = useState('KSU');

  const trips = ['Trip ID #12334', 'Trip ID #12335', 'Trip ID #12336', 'Trip ID #12337'];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">

      <div className="flex flex-col gap-6 w-full md:w-1/2">
     
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold">New request</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap">
              Add Trip +
            </button>
          </div>

    
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Trip destination</th>
                  <th className="px-4 py-2 text-left">Neighborhood</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">Alhamra</td>
                  <td className="px-4 py-2">King Saud U</td>
                  <td className="px-4 py-2">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm w-full sm:w-auto">
                      More Details
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">King Saud U</td>
                  <td className="px-4 py-2">Alhamra</td>
                  <td className="px-4 py-2">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm w-full sm:w-auto">
                      More Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

     
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <p className="block font-medium">Choose Trip</p>
            <span className="text-sm text-gray-500">Today | 10:30 AM</span>
          </div>

          <div className="mb-6">
            <select
              id="trip"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Trip</option>
              {trips.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="block font-bold mb-2">From:</h1>
                <h3>{currentLocation}</h3>
              </div>
              <div>
                <h1 className="block font-bold mb-2">To:</h1>
                <h3>{destination}</h3>
              </div>
            </div>

            <button
              type="button"
              className="bg-[#00B087] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Start
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
  <h2 className="font-bold mb-4">Live Tracking Map</h2>
  <div className="border border-gray-300 rounded h-64 md:h-96 overflow-hidden bg-gray-100 relative">
  


    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.012345678!2d-46.67511408467358!3d24.71355298412488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c4e4e0f5e2d027%3A0x5e722f5b45c6b9f8!2sTuwaij%20Academy!5e0!3m2!1sen!2s!4v1631954444031!5m2!1sen!2s"
      title="Google Maps Tracking"
      className="w-full h-full absolute "
    
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</div>
    </div>
  );
};

export default TripCard;