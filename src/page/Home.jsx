import React from "react";
import LandingPage from "../container/HomePage/LandingPage";
import HomeStudent from "../container/HomePage/HomeStudent";
import HomeDriver from "../container/HomePage/HomeDriver";
import HomeFooter from "../container/HomePage/HomeFooter";
import HomeBook from "../container/HomePage/HomeBook";
import HomeReviews from "@/container/HomePage/HomeReviews";
function Home() {
  return (
    <>
      <LandingPage />
      <HomeStudent />
      <HomeBook />
      <HomeDriver />
      <HomeReviews />
      <HomeFooter />
    </>
  );
}

export default Home;
