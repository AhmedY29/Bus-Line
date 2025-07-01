import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-4 p-4 h-35 w-70 sm:w-auto min-w-[200px]">
       <p className="text-gray-500 font-medium ">{title}</p>
      <div className="rounded-full p-3 bg-opacity-20">
        {icon}
        <p className="text-xl sm:text-2xl font-medium">{value}</p>
      </div>
    
      
        
     
    </div>
  );
};

export default StatCard;