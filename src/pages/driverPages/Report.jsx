import React from 'react'
import TripReports from '../../container/driverContainerPages/ReportContainer/TripReports'
import StatsCards from '../../container/driverContainerPages/DashboardContainer/StatsCards'
function Report() {
  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">
    <StatsCards />
<TripReports/>
  
      </div>
  )
}

export default Report