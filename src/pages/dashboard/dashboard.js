import React, { useState } from "react";
// import Layout from "../../layout/layout";
import { LeftNavigation, MarketInfoForm, OwnerInfoForm } from "./components";

const Header = () => {
  const [activeForm, setActiveForm] = useState("marketInfo");

  return (
    <div style={{ display: "flex" }}>
      <LeftNavigation setActiveForm={setActiveForm} activeForm={activeForm} />
      {activeForm === "marketInfo" && <MarketInfoForm />}
      {activeForm === "ownerInfo" && <OwnerInfoForm />}
    </div>
  );
};

export default Header;
