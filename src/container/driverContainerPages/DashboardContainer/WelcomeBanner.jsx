import React, { useEffect, useState } from 'react';

const WelcomeBanner = () => {
  const [driverName, setDriverName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setDriverName(parsed.name || 'Driver');
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br m-3 from-blue-600 via-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <span className="text-green-400 text-3xl">•</span>
          <span className="text-md font-medium">Good Morning</span>
        </div>
        <a
          href="/driver/trips"
          className="bg-white text-[#0165AD] px-5 py-2 font-bold rounded-full shadow hover:bg-gray-100 transition duration-200 text-center min-w-[120px] inline-block"
        >
          Add Trip +
        </a>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Welcome back, {driverName}!
      </h1>

      <p className="text-sm sm:text-base leading-relaxed text-white/90 max-w-xl">
        You have a trip scheduled for today. Make sure to be on time and check
        the list of students before departure.
      </p>
    </div>
  );
};

export default WelcomeBanner;
