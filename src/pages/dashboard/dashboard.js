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

  return (
    <div style={{ display: "flex" }}>
      <LeftNavigation setActiveForm={setActiveForm} activeForm={activeForm} />
      {activeForm === "marketInfo" && (
        <MarketInfoForm setActiveForm={setActiveForm} />
      )}
      {activeForm === "ownerInfo" && <OwnerInfoForm />}
      {activeForm === "home" && <HomeSection setActiveForm={setActiveForm} />}
    </div>
  );
};

export default Dashboard;
