import React from 'react'
import PassengerList from '../../container/driverContainerPages/passengerContainer/PassengerList'
import StatsCards from '../../container/driverContainerPages/DashboardContainer/StatsCards'
function Passengers() {
  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">
    <StatsCards />
<PassengerList/>
  
      </div>
  )
}

export default Passengers