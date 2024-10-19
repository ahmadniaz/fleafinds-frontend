import React from "react";
import { Description, MapSection } from "./components";
import { Grid2 } from "@mui/material";

const InformationSection = ({ testMarketData }) => {
  return (
    <Grid2 container spacing={3}>
      {/*Market Informaton Description */}
      <Description testMarketData={testMarketData} />

      {/*Market Address */}
      <MapSection testMarketData={testMarketData} />
    </Grid2>
  );
};

export default InformationSection;
