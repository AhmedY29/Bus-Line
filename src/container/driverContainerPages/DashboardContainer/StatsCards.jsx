import React from 'react';
import StatCard from './StatCard';
import { FaBus } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { MdGroupOff } from "react-icons/md";
import { MdStarRate } from "react-icons/md";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-7 bg-[#F5F7FA]">
      <StatCard
        title="Total Passenger"
        value="24"
        color="green"
        icon={
          <MdGroups2 className='text-[#19ACA0] w-10 h-10 bg-green-200 rounded-full shadow-sm' />
        }
      />

      <StatCard
        title="Total Trip"
        value="2"
        color="yellow"
        icon={
          <FaBus className='text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm' />
        }
      />

      <StatCard
        title="Absent Today"
        value="3"
        color="green"
        icon={
          <MdGroupOff className='text-[#28A1BB] w-10 h-10 bg-sky-200 rounded-full shadow-sm' />
        }
      />

      <StatCard
        title="Total Rating"
        value="4.3"
        color="yellow"
        icon={
          <MdStarRate className='text-[#E4B83C] w-10 h-10 bg-yellow-200 rounded-full shadow-sm' />
        }
      />
    </div>
  );
};

export default StatsCards;