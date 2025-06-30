
import React from 'react';

const StatCard = ({ title, value, icon }) => {
 
  return (
    <div className="flex  items-center bg-white rounded-lg shadow-md gap-4  pl-4 h-35 w-50 md:h-40 md:w-56  lg:w-60">
      <div className={` rounded-full p-3`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;