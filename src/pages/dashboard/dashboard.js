import React, { useState } from "react";
// import Layout from "../../layout/layout";
import {
  LeftNavigation,
  MarketInfoForm,
  OwnerInfoForm,
  HomeSection,
} from "./components";

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("home");
  const [updateMarket, setUpdateMarket] = useState(null);

  console.log(updateMarket, "UPDATE MARKET DATA");

  return (
    <div style={{ display: "flex" }}>
      <LeftNavigation setActiveForm={setActiveForm} activeForm={activeForm} />
      {activeForm === "marketInfo" && (
        <MarketInfoForm
          setActiveForm={setActiveForm}
          marketData={updateMarket}
          setUpdateMarket={setUpdateMarket}
        />
      )}
      {activeForm === "ownerInfo" && <OwnerInfoForm />}
      {activeForm === "home" && (
        <HomeSection
          setActiveForm={setActiveForm}
          setUpdateMarket={setUpdateMarket}
        />
      )}
    </div>
  );
};

export default Dashboard;
