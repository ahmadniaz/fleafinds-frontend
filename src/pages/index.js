import React from "react";

const Home = React.lazy(() => import("./home/home"));
const About = React.lazy(() => import("./about/about"));
const AuthPage = React.lazy(() => import("./auth/authPage"));
const DashboardPage = React.lazy(() => import("./dashboard/dashboard"));
const FleaMarketListing = React.lazy(() =>
  import("./marketsListing/marketsListing")
);
const MarketDescription = React.lazy(() =>
  import("./marketDescription/marketDescription")
);
const FAQPage = React.lazy(() => import("./faq/faqs"));
const TermsAndConditionsPage = React.lazy(() =>
  import("./termAndCondition/termsAndCondition")
);

export {
  Home,
  About,
  AuthPage,
  DashboardPage,
  FleaMarketListing,
  MarketDescription,
  FAQPage,
  TermsAndConditionsPage,
};
