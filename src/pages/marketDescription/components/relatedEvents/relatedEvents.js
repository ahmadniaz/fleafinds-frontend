import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

const RelatedEventsSection = ({ marketData, relatedEvents }) => {
  const { translations } = useLanguage();
  return (
    <Box sx={{ mt: 4, maxHeight: 400, overflowY: "auto" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        📅 {translations.MARKET_DESCRIPTION.UPCOMING_EVENTS_AT} {marketData?.name}
      </Typography>
      {relatedEvents.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {relatedEvents.map((event) => (
            <EventListItem key={event._id} event={event} />
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="text.secondary">
          {translations.MARKET_DESCRIPTION.NO_EVENTS_FOUND}
        </Typography>
      )}
    </Box>
  );
};

const EventListItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#f8f8f8",
          borderRadius: 2,
          mb: 1.5,
          padding: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Image & Title */}
        <ListItemAvatar>
          <Avatar
            variant="square"
            src={event.eventImage?.url || "https://via.placeholder.com/100"}
            sx={{ width: "100%", height: 100, borderRadius: 2 }}
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="bold">
              {event.name}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body2" color="textSecondary">
                📍 {event.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time}
              </Typography>
              <Typography variant="body2" color="primary">
                🎶 {event.eventType}
              </Typography>
            </>
          }
        />

        {/* Description with Expand/Collapse */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "text.secondary", textAlign: "justify" }}
          >
            {event.description}
          </Typography>
        </Collapse>

        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{ alignSelf: "flex-end", mt: 1 }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
    </>
  );
};

export default RelatedEventsSection;
