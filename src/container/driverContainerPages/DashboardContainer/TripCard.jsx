import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

const TripCard = () => {
  const [trip, setTrip] = useState('');
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://bus-line-backend.onrender.com/api/trips/driver-trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (Array.isArray(data.trips)) {
          setTrips(data.trips);
        } else {
          console.error("Unexpected trips structure", data);
        }
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips();
  }, []);


  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://bus-line-backend.onrender.com/api/destination", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setDestinations(data.destinations || []);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleTripChange = (e) => {
    const selectedTripId = e.target.value;
    setTrip(selectedTripId);

    const selectedTrip = trips.find(t => t._id === selectedTripId);
    if (selectedTrip) {
      setCurrentLocation(selectedTrip.neighborhood || '');

      let destTitle = '';
      const destinationId =
        typeof selectedTrip.destinationId === 'object'
          ? selectedTrip.destinationId._id
          : selectedTrip.destinationId;

      const destObj = destinations.find(d => d._id === destinationId);
      destTitle = destObj?.title || '';

      setDestination(destTitle);
    } else {
      setCurrentLocation('');
      setDestination('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">

      <div className="flex flex-col gap-6 w-full md:w-1/2">
       
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold">New request</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-center">Destination</th>
                  <th className="px-4 py-2 text-left">Neighborhood</th>
                  <th className="px-4 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">Alhamra</td>
                  <td className="px-4 py-2">King Saud U</td>
                  <td className="px-4 py-2">
                    <button className="bg-[#0165AD] hover:bg-blue-800 text-white py-1 px-6 rounded text-sm w-full sm:w-auto">
                      Details
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
            <span className="text-sm text-gray-500">
  {new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</span>
          </div>

          <div className="mb-6">
            <select
              id="trip"
              value={trip}
              onChange={handleTripChange}
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-900 focus:outline-none"
            >
              <option value="">Choose Trip</option>
              {trips.map((t) => (
                <option key={t._id} value={t._id}>
                  {`#${t._id.slice(0, 5)} 
                  `}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-5">
                <h1 className="block font-bold mb-2">From:</h1>
                <h3>{currentLocation}</h3>
              </div>
              <div className="flex gap-5">
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
        <div className="flex gap-2">
          <FaMapMarkerAlt className="h-5 mt-1" />
          <h2 className="font-bold mb-4">Live Tracking Map</h2>
        </div>

        <div className="border border-gray-300 rounded h-64 md:h-96 overflow-hidden bg-gray-100 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.012345678!2d-46.67511408467358!3d24.71355298412488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c4e4e0f5e2d027%3A0x5e722f5b45c6b9f8!2sTuwaij%20Academy!5e0!3m2!1sen!2s!4v1631954444031!5m2!1sen!2s"
            title="Google Maps Tracking"
            className="w-full h-full absolute"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
