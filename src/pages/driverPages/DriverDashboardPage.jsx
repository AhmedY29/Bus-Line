import React, { useState } from 'react';
import DriverSidebar from '../../container/driverContainerPages/DriverSidebar';
import TripCard from '../../container/driverContainerPages/TripCard';
import StatsCards from '../../container/driverContainerPages/StatsCards';
import TripsList from '../../container/driverContainerPages/TripsList';

function DriverDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      

    

 
      <main className="md:ml-64 flex-1 space-y-6 overflow-auto">
        <StatsCards />
        <TripCard />
        <TripsList />
      </main>
    </div>
  );
}

export default DriverDashboardPage;