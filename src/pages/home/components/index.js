import React from "react";
const CitiesList = React.lazy(() => import("./citiesList/citiesList"));
const RegistrationBanner = React.lazy(() =>
  import("./registrationBanner/registrationBanner")
);

export { CitiesList, RegistrationBanner };
