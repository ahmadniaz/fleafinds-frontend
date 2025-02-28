import React, { useState } from "react";
// import Layout from "../../layout/layout";
import {
  LeftNavigation,
  MarketInfoForm,
  OwnerInfoForm,
  HomeSection,
  EventsInfoForm,
} from "./components";

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("home");
  const [updateMarket, setUpdateMarket] = useState(null);
  const [updateEvent, setUpdateEvent] = useState(null);
  const [ownerAllMarkets, setOwnerAllMarkets] = useState([]);

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
          setUpdateEvent={setUpdateEvent}
          setOwnerAllMarkets={setOwnerAllMarkets}
        />
      )}
      {activeForm === "events" && (
        <EventsInfoForm
          setActiveForm={setActiveForm}
          updateEventData={updateEvent}
          ownerAllMarkets={ownerAllMarkets}
          setUpdateEvent={setUpdateEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
