import React from "react";
const OwnerRegistration = React.lazy(() =>
  import("./ownerRegistration/ownerRegistraton")
);

const CitiesList = React.lazy(() => import("./citiesList/citiesList"));
const RegistrationBanner = React.lazy(() =>
  import("./registrationBanner/registrationBanner")
);

export { OwnerRegistration, CitiesList, RegistrationBanner };
