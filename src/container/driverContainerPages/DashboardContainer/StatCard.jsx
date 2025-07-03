
import React from 'react';

const StatCard = ({ title, value, icon }) => {
 
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-4 pl-4 h-35 w-full">
     
      <div className='flex flex-col items-center'>
        <p className="p-2 text-gray-500">{title}</p>
        <div className={` flex gap-5 rounded-full p-3`}>
        {icon}
        <p className="text-2xl font-bold">{value}</p>
      </div>
        
      </div>
    </div>
  );
};

export default StatCard;