import React, { useState } from "react";

import TripCard from "../../container/driverContainerPages/DashboardContainer/TripCard";
import StatsCards from "../../container/driverContainerPages/DashboardContainer/StatsCards";
import TripPassenger from "../../container/driverContainerPages/DashboardContainer/TripPassenger";
import WelcomeBanner from "@/container/driverContainerPages/DashboardContainer/WelcomeBanner";
function DriverDashboardPage() {
  return (
    <div className="bg-[#F5F7FA] flex-col justify-center w-full  md:h-[90vh] ">
      <WelcomeBanner />
      <StatsCards />
      <TripCard />
      <TripPassenger />
    </div>
  );
}

export default DriverDashboardPage;
