
import React from 'react';

const StatCard = ({ title, value, icon }) => {
 
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-2 h-30 w-40 md:h-30 md:w-46 hover:shadow-lg  lg:w-50">
     
      <div className='flex flex-col items-center'>
        <p className="p-2 font-bold">{title}</p>
        <div className={` flex gap-5 rounded-full p-3`}>
        {icon}
        <p className="text-2xl font-bold">{value}</p>
      </div>
        
      </div>
    </div>
  );
};

export default StatCard;