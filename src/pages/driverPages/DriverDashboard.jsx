import React, { useState } from 'react';

import TripCard from '../../container/driverContainerPages/DashboardContainer/TripCard';
import StatsCards from '../../container/driverContainerPages/DashboardContainer/StatsCards';
import TripPassenger from '../../container/driverContainerPages/DashboardContainer/TripPassenger';
function DriverDashboardPage() {


  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">
    <StatsCards />
    <TripCard/>
    <TripPassenger/>
  </div>
  );
}

export default DriverDashboardPage;