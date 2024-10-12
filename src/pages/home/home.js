import React from "react";
import Layout from "../../layout/layout";
import { CitiesList, RegistrationBanner } from "./components";

const Header = () => {
  return (
    <div>
      <Layout />
      <RegistrationBanner />
      <CitiesList />
    </div>
  );
};

export default Header;
