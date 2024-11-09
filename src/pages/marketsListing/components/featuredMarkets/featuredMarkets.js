// FeaturedMarkets.js
import React from "react";
import { Box, Typography } from "@mui/material";
import FeaturedMarketSlider from "./component/featureMarketSlider";

const FeaturedMarkets = ({ featuredMarkets }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#15a0db", fontWeight: "bold", textAlign: "center" }}
      >
        Featured Markets in Turku
      </Typography>
      <FeaturedMarketSlider items={featuredMarkets} />
    </Box>
  );
};

export default FeaturedMarkets;
