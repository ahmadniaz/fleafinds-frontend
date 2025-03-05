// FeaturedMarkets.js
import React from "react";
import { Box, Typography } from "@mui/material";
import FeaturedMarketSlider from "./component/featureMarketSlider";
import { useLanguage } from "../../../../context/LanguageContext";

const FeaturedMarkets = ({ featuredMarkets }) => {
  const { translations } = useLanguage();
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#15a0db", fontWeight: "bold", textAlign: "center" }}
      >
        {translations.FEATURED_MARKETS.TITLE}
      </Typography>
      <FeaturedMarketSlider items={featuredMarkets} />
    </Box>
  );
};

export default FeaturedMarkets;
