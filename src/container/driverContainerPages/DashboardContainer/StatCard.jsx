import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md gap-4 pl-4 h-35 w-full p-4">
      <div className="flex items-center bg-white rounded-lg shadow-md gap-2 w-full md:w-46 lg:w-50 hover:shadow-lg">
        <div className='flex flex-col items-center w-full'>
          <p className="font-bold text-lg">{title}</p>
          <div className="flex items-center gap-3 p-3 rounded-full">
            {icon}
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
