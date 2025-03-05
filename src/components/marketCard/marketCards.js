// MarketCard.js
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createSlug } from "../../utils/slug";
import CustomCardContent from "./component/cardContent";
import { useLocation } from "react-router-dom";

const MarketCard = ({
  market,
  handleUpdateIconClick,
  handleDeleteIconClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleClick = () => {
    // You can pass state or other parameters here
    navigate(`/markets/${slug}`, { state: { marketData: market } });
  };
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ position: "relative" }}
      key={market?._id}
    >
      {isOwner ? (
        <CustomCardContent
          isNewMarket={isNewMarket}
          handleUpdateIconClick={handleUpdateIconClick}
          handleDeleteIconClick={handleDeleteIconClick}
          isOwner={isOwner}
          hovered={hovered}
          market={market}
        />
      ) : (
        <div onClick={handleClick}>
          <CustomCardContent
            isNewMarket={isNewMarket}
            isOwner={isOwner}
            hovered={hovered}
            market={market}
          />
        </div>
      )}
    </Box>
  );
};

export default MarketCard;
