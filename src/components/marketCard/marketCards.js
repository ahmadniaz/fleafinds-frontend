// MarketCard.js
import React, { useState } from "react";
import { Grid2, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { createSlug } from "../../utils/slug";
import CustomCardContent from "./component/cardContent";
import { useLocation } from "react-router-dom";

const MarketCard = ({ market }) => {
  const location = useLocation();
  const slug = createSlug(market?.name);
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(false);
  const isOwner = token && location?.pathname === "/dashboard";

  // Calculate if the market is less than one month old
  const isNewMarket = (createdAt) => {
    const marketDate = new Date(createdAt);
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    return marketDate >= oneMonthAgo;
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={market?._id}>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ position: "relative" }}
      >
        {isOwner ? (
          <CustomCardContent
            isNewMarket={isNewMarket}
            isOwner={isOwner}
            hovered={hovered}
            market={market}
          />
        ) : (
          <Link to={`/markets/${slug}`} style={{ textDecoration: "none" }}>
            <CustomCardContent
              isNewMarket={isNewMarket}
              isOwner={isOwner}
              hovered={hovered}
              market={market}
            />
          </Link>
        )}
      </Box>
    </Grid2>
  );
};

export default MarketCard;
