import React from 'react'
import StatsCards from '../../container/driverContainerPages/DashboardContainer/StatsCards'
import TripsList from '../../container/driverContainerPages/tripsContainer/TripsList'
function DriverTrips() {
  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">

  <StatsCards />
<TripsList/>

    </div>
  )
}

export default DriverTrips