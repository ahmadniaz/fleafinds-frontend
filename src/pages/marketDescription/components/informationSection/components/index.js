import React from "react";

const Description = React.lazy(() =>
  import("./descriptionSection/description")
);
const MapSection = React.lazy(() => import("./mapSection/mapSection"));

export { Description, MapSection };
