import React from "react";
const CitiesList = React.lazy(() => import("./citiesList/citiesList"));
const RegistrationBanner = React.lazy(() =>
  import("./registrationBanner/registrationBanner")
);

const CircularEconomy = React.lazy(() =>
  import("./circularEconomy/circularEconSection")
);
export { CitiesList, RegistrationBanner, CircularEconomy };
