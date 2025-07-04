import React, { useState } from 'react';

const TripCard = () => {
  const [trip, setTrip] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Al Hamra');
  const [destination, setDestination] = useState('KSU');

  const trips = ['Trip ID #12334', 'Trip ID #12335', 'Trip ID #12336', 'Trip ID #12337'];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">

      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
     <div className=' flex justify-between'> 
     <p htmlFor="trips" className="block font-medium mb-2">
              Choose Trip
            </p>
            <span className='text-sm text-gray-500'>Today|10:30AM </span>

     </div>
          
        <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
      
          <div className="w-full">
       
            <select
              id="trip"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option className='' value="">Select Trip</option>
              {trips.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

       
        </div>

        <div className="flex flex-col gap-6">
         
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

          {/* Start Button */}
          <button
            type="button"
            className="bg-[#00B087] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
          >
            Start
          </button>
        </div>
      </div>


      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 mt-6 md:mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className=" font-bold">New request</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap">
            Add Trip +
          </button>
        </div>


        <div className="overflow-x-auto">
          <table className="w-full  border-collapse">
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
    </div>
  );
};

export default TripCard;