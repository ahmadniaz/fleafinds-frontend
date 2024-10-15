import React from "react";

const LeftNavigation = React.lazy(() =>
  import("./leftNavigaton/leftNavigation")
);
const MarketInfoForm = React.lazy(() => import("./marketInfo/marketInfo"));
const OwnerInfoForm = React.lazy(() => import("./ownerInfo/ownerInfo"));
const HomeSection = React.lazy(() => import("./homeSection/homeSecton"));

export { LeftNavigation, MarketInfoForm, OwnerInfoForm, HomeSection };
