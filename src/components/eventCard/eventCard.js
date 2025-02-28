// MarketCard.js
import React, { useState } from "react";
import { Grid2, Box } from "@mui/material";
import CustomEventCard from "./component/customEventCard";
import { useLocation } from "react-router-dom";

const EventCard = ({ event, handleUpdateIconClick, handleDeleteIconClick }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(false);
  const isOwner = token && location?.pathname === "/dashboard";

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={event?._id}>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ position: "relative" }}
      >
        {isOwner ? (
          <CustomEventCard
            handleUpdateIconClick={handleUpdateIconClick}
            handleDeleteIconClick={handleDeleteIconClick}
            isOwner={isOwner}
            hovered={hovered}
            event={event}
          />
        ) : (
          <CustomEventCard isOwner={isOwner} hovered={hovered} event={event} />
        )}
      </Box>
    </Grid2>
  );
};

export default EventCard;
