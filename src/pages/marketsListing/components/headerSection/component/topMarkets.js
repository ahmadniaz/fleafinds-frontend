import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createSlug } from "../../../../../utils/slug";
import { useLanguage } from "../../../../../context/LanguageContext";

const TopMarkets = ({ allMarkets }) => {
  const topMarkets = allMarkets?.slice(0, 5); // Display top 3 markets
  const navigate = useNavigate();

  const handleClick = (market) => {
    // You can pass state or other parameters here
    const slug = createSlug(market?.name);
    navigate(`/markets/${slug}`, { state: { marketData: market } });
  };

  const { translations } = useLanguage();
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#15a0db", mb: 2 }}
      >
        {translations.MARKET_LISTING_PAGE.TOP}
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        {topMarkets?.length < 1 ? (
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#ff0000", fontWeight: "medium", ml: 1 }}
          >
            {translations.MARKET_LISTING_PAGE.NO_MARKETS}
          </Typography>
        ) : (
          topMarkets?.map((market) => (
            <Box
              component="li"
              key={market?._id}
              sx={{ mb: 1, listStyleType: "disc" }}
            >
              <Link
                component="button"
                underline="hover"
                sx={{ fontWeight: "bold", color: "#15a0db" }}
                onClick={() => handleClick(market)} // Call handleClick function on click
              >
                {market?.name}
              </Link>

              <Typography
                variant="body2"
                component="span"
                sx={{ color: "#ff0000", fontWeight: "medium", ml: 1 }}
              >
                ({market?.reviewCount}{" "}
                {translations.MARKET_LISTING_PAGE.REVIEWS}{" "}
                {market?.averageRating} ⭐)
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default TopMarkets;
