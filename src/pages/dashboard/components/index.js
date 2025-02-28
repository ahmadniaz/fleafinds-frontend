import React from "react";

const LeftNavigation = React.lazy(() =>
  import("./leftNavigaton/leftNavigation")
);
const MarketInfoForm = React.lazy(() => import("./marketInfo/marketInfo"));
const OwnerInfoForm = React.lazy(() => import("./ownerInfo/ownerInfo"));
const HomeSection = React.lazy(() => import("./homeSection/homeSecton"));
const EventsInfoForm = React.lazy(() => import("./eventsInfo/eventsInfo"));

export {
  LeftNavigation,
  MarketInfoForm,
  OwnerInfoForm,
  HomeSection,
  EventsInfoForm,
};
