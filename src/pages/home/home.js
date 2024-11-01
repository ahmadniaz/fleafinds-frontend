import React, { useRef } from "react";
import Layout from "../../layout/layout";
import {
  CitiesList,
  RegistrationBanner,
  SustainabilityInfoSection,
  HeroSection,
  LocalTipsAndEvents,
} from "./components";
import { tips, events } from "../../data/data";

const Home = () => {
  const citiesRef = useRef(null);
  return (
    <div>
      <Layout />
      <HeroSection citiesRef={citiesRef} />
      <RegistrationBanner />
      <CitiesList citiesRef={citiesRef} />
      <LocalTipsAndEvents tips={tips} events={events} />
      <SustainabilityInfoSection />
    </div>
  );
};

export default Home;
