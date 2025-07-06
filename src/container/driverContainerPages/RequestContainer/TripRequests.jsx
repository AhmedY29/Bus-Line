import React, { useState } from 'react';

const TripRequests = () => {
  const requests = [
    { id: 1, destination: 'Princess Noura', neighborhood: 'ANY N', departureTime: '8:30 AM', passengerEmail: 'jane@microsoft.com', paymentStatus: 'Paid', status: 'Pending' },
    { id: 2, destination: 'King Saud U', neighborhood: 'ANY N', departureTime: '8:30 AM', passengerEmail: 'floyd@yahoo.com', paymentStatus: 'Paid', status: 'Pending' },
    { id: 3, destination: 'Adobe', neighborhood: 'Adobe', departureTime: '8:30 AM', passengerEmail: 'ronald@adobe.com', paymentStatus: 'Paid', status: 'Pending' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  const filteredRequests = requests.filter((request) =>
    request.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.departureTime) - new Date(a.departureTime);
    }
    return new Date(a.departureTime) - new Date(b.departureTime);
  });

  
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const currentRequests = sortedRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAccept = (id) => {
    console.log(`Accepted request with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected request with ID: ${id}`);
  };

  return (
    <div className="bg-white shadow-md m-6 rounded-lg p-4 md:p-6">
      
    <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Requests</h1>
        <form className="w-full max-w-xl">
   
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
<button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#0165AD] rounded-e-lg border border-[#0165AD] hover:bg-[#0165AD] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
               </svg>
               <span className="sr-only">Search</span>
           </button>
   </div>
 </form>
          {/* <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select> */}
     
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left"> Destination</th>
              <th className="px-4 py-3 text-left">Neighborhood</th>
              <th className="px-4 py-3 text-left">Departure Time</th>
              <th className="px-4 py-3 text-left">Passengers</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 border-b border-gray-300">
                <td className="px-4 py-3">{request.destination}</td>
                <td className="px-4 py-3">{request.neighborhood}</td>
                <td className="px-4 py-3">{request.departureTime}</td>
                <td className="px-4 py-3">{request.passengerEmail}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 rounded bg-green-200 text-green-700 text-xs">
                    Paid
                  </span>
                </td>
                <td className=" py-3 space-x-2">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 gap-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="block md:hidden space-y-4">
        {currentRequests.map((request) => (
          <div key={request.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{request.destination}</h3>
                <p className="text-sm text-gray-600">📍 {request.neighborhood}</p>
                <p className="text-sm text-gray-600">🕒 {request.departureTime}</p>
                <p className="text-sm text-gray-600">✉️ {request.passengerEmail}</p>
                <p className="text-sm mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-200 text-green-700">
                    Paid
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="block w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="block w-full text-center bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {currentRequests.length} of {sortedRequests.length} entries
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
    </div>
  );
};

export default TripRequests;