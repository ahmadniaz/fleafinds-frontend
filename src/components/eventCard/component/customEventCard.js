import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/dateFormatter";

const CustomEventCard = ({
  event,
  handleUpdateIconClick,
  handleDeleteEvent,
  hovered,
}) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isOwner = token && location?.pathname === "/dashboard";
  const formattedDate = formatDate(event?.date);

  return (
    <Card
      sx={{
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-5px)",
        },
        border: "1px solid #15a0db",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
    >
      {/* Event Image */}
      <Box sx={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={event?.eventImage?.url || "/default-event.jpg"}
          alt={event?.eventName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          padding: "16px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Event Name */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {event?.name}
        </Typography>

        {/* Event Category */}
        <Chip
          label={event?.eventType}
          color="primary"
          size="small"
          sx={{
            backgroundColor: "#15a0db",
            color: "#fff",
            marginBottom: 2,
          }}
        />

        {/* Event Date & Time */}
        <Box display="flex" alignItems="center" marginBottom={1}>
          <CalendarTodayIcon sx={{ color: "text.secondary", marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {formattedDate}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" marginBottom={1}>
          <AccessTimeIcon sx={{ color: "text.secondary", marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {event?.time}
          </Typography>
        </Box>

        {/* Event Location */}
        <Box display="flex" alignItems="center" marginBottom={1}>
          <LocationOnIcon sx={{ color: "text.secondary", marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {event?.location}
          </Typography>
        </Box>
      </CardContent>

      {/* Owner Actions */}
      {isOwner && (
        <Box
          sx={{
            position: "absolute",
            top: 50,
            right: 10,
            display: hovered ? "flex" : "none",
            flexDirection: "column",
            padding: "8px",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <IconButton
            sx={{ marginBottom: "5px" }}
            onClick={() => handleUpdateIconClick(event)}
          >
            <Edit fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => handleDeleteEvent(event?._id)}
            color="error"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default CustomEventCard;
