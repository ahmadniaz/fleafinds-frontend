import React from "react";
import { Box, Typography, Link } from "@mui/material";

const TopMarkets = ({ fleaMarketsList }) => {
  const topMarkets = fleaMarketsList?.slice(0, 3); // Display top 3 markets

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#15a0db", mb: 2 }}
      >
        Top Markets
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        {topMarkets.map((market) => (
          <Box
            component="li"
            key={market.id}
            sx={{ mb: 1, listStyleType: "disc" }}
          >
            <Link
              href={`/market/${market.id}`} // Replace with actual URL for market details
              underline="hover"
              sx={{ fontWeight: "bold", color: "#15a0db" }}
            >
              {market.name}
            </Link>{" "}
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "#ff0000", fontWeight: "medium", ml: 1 }}
            >
              ({market.reviews} reviews, {market.rating} ⭐)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopMarkets;
