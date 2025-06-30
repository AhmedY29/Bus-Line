import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-4 p-4 h-40 w-70 sm:w-auto min-w-[200px]">
      <div className="rounded-full p-3 bg-opacity-20">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-lg font-bold">{title}</p>
        <p className="text-xl sm:text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;