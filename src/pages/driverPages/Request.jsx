import React from 'react'
import TripRequests from '../../container/driverContainerPages/RequestContainer/TripRequests'
import StatsCards from '../../container/driverContainerPages/DashboardContainer/StatsCards'
function Request() {
  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">
    <StatsCards />
<TripRequests/>
  
      </div>
  )
}

export default Request