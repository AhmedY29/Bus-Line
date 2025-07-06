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
      destination: 'King Saud U',
      neighborhood: 'ANY N',
      departureTime: '8:30 AM',
      trip: 'Princess Noura',
      status: 'Inactive',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);


  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Trips</h1>

      
  
        <form className="w-82">
   
   <div className="relative">
     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
       <svg
         className="w-4 h-4 text-gray-500 dark:text-gray-400"
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 20 20"
       >
         <path
   
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
         />
       </svg>
     </div>
     <input
 type="search"
 id="default-search"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 placeholder="Search..."
 required
/>
<button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-[#0165AD] hover:bg-[#0165add8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
               </svg>
               <span className="sr-only">Search</span>
           </button>
   </div>
 </form>

          {/* Add Trip Button */}
          <button
            onClick={handleOpenModal}
            className="bg-[#0165AD] hover:bg-[#0165addf] text-white font-bold py-2 px-4 rounded whitespace-nowrap"
          >
            Add Trip +
          </button>
 
      </div>

      {/* Table */}
      <div className="overflow-x-auto sm:block">
        <table className="w-full table-auto border-collapse">
          <thead className="border-b text-gray-500 text-sm hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left">Trip Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
              <th className="px-4 py-3 text-left">Trip</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-700">
            {filteredTrips.map((trip, index) => (
              <tr
                key={index}
                className="flex flex-col border-b-gray-500  sm:table-row hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2  sm:py-3 border-t sm:border-none">
                  <span className="font-semibold sm:hidden mr-2">Destination:</span>
                  {trip.destination}
                </td>
                <td className="px-4 py-2 sm:py-3 border-t border-gray-200 sm:border-none">
                  <span className="font-semibold sm:hidden mr-2">Neighborhood:</span>
                  {trip.neighborhood}
                </td>
                <td className="px-4 border-gray-500 py-2 sm:py-3 border-t  sm:border-none">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">      
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Trip</h2>
            
            </div>

            <form>
          
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="neighborhood" className="block text-gray-700 font-medium mb-2">
                    Neighborhood
                  </label>
                  {/* <div className="mb-6">
      
      <select
        id="trip"
        value={trip}
        onChange={(e) => setTrip(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-900 dark:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 peer"  >
        <option value="">Select Trip</option>
        {trips.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div> */}

                  <select
                    id="neighborhood"
                    name="neighborhood"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" 
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
                    name="destination"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" >

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
                    type="time"
                    id="departureTime"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" 
                    />
                </div>
                <div>
                  <label htmlFor="arrivalTime" className="block text-gray-700 font-medium mb-2">
                    Arrival Time
                  </label>
                  <input
                    type="time"
                    id="arrivalTime"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" 
                    />
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-500  dark:text-gray-900 dark:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-700 peer" 
                  />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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