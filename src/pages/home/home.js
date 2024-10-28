import React from "react";
import Layout from "../../layout/layout";
import { CitiesList, RegistrationBanner, CircularEconomy } from "./components";

const Home = () => {
  return (
    <div>
      <Layout />
      <RegistrationBanner />
      <CitiesList />
      <CircularEconomy />
    </div>
  );
};

export default Home;
