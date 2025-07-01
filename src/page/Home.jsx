import React from "react";
import LandingPage from "../container/HomePage/LandingPage";
import HomeStudent from "../container/HomePage/HomeStudent";
import HomeDriver from "../container/HomePage/HomeDriver";
import HomeFooter from "../container/HomePage/HomeFooter";
function Home() {
  return (
    <>
      <LandingPage />
      <HomeStudent />
      <HomeDriver />
      <HomeFooter />
    </>
  );
}

export default Home;
