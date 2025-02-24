import React from "react";
import { Box, Typography, Link } from "@mui/material";

const TopMarkets = ({ allMarkets }) => {
  const topMarkets = allMarkets?.slice(0, 1); // Display top 3 markets

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#15a0db", mb: 2 }}
      >
        Top Markets
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        {allMarkets?.map((market) => (
          <Box
            component="li"
            key={market?._id}
            sx={{ mb: 1, listStyleType: "disc" }}
          >
            <Link
              href={`/market/${market?._id}`} // Replace with actual URL for market details
              underline="hover"
              sx={{ fontWeight: "bold", color: "#15a0db" }}
            >
              {market?.name}
            </Link>{" "}
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "#ff0000", fontWeight: "medium", ml: 1 }}
            >
              ({market.reviewCount} reviews, {market.averageRating} ⭐)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopMarkets;
