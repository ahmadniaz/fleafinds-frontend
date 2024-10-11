import React from "react";
const OwnerRegistration = React.lazy(() =>
  import("./ownerRegistration/ownerRegistraton")
);

const CitiesList = React.lazy(() => import("./citiesList/citiesList"));

export { OwnerRegistration, CitiesList };
