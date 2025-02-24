import React from "react";
import { Description, MapSection } from "./components";
import { Grid2 } from "@mui/material";

const InformationSection = ({ marketData }) => {
  return (
    <Grid2 container spacing={3}>
      {/*Market Informaton Description */}
      <Description marketData={marketData} />

      {/*Market Address */}
      <MapSection marketData={marketData} />
    </Grid2>
  );
};

export default InformationSection;
