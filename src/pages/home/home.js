import React, { useRef } from "react";
import Layout from "../../layout/layout";
import {
  CitiesList,
  RegistrationBanner,
  CircularEconomy,
  HeroSection,
} from "./components";

const Home = () => {
  const citiesRef = useRef(null);
  return (
    <div>
      <Layout />
      <HeroSection citiesRef={citiesRef} />
      <RegistrationBanner />
      <CitiesList citiesRef={citiesRef} />
      <CircularEconomy />
    </div>
  );
};

export default Home;
