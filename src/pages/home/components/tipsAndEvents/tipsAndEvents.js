import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  CardMedia,
  Chip,
  Stack,
  Pagination,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useLanguage } from "../../../../context/LanguageContext";

const LocalTipsAndEvents = ({ events }) => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const [page, setPage] = useState(1);
  const eventsPerPage = 5;
  const { translations, changeLanguage } = useLanguage();

  useEffect(() => {
    const now = new Date();
    const upcoming = events.filter((event) => new Date(event.date) > now);
    const past = events.filter((event) => new Date(event.date) <= now);
    setSortedEvents([...upcoming, ...past]);
  }, [events]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedEvents = sortedEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  const getTimeLeft = (eventDate) => {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const diff = eventTime - now;
    if (diff <= 0) return "Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h left`;
  };

  return (
    <Box sx={{ mt: 6, px: 2 }}>
      {/* Upcoming Events Section */}
      <Typography
        variant="h4"
        sx={{
          color: "#15a0db",
          fontWeight: "bold",
          textAlign: "center",
          mt: 6,
          mb: 3,
        }}
      >
        {translations.EVENTS.TITLE}
      </Typography>
      <Grid2 container spacing={4}>
        {paginatedEvents.map((event, index) => (
          <Grid2 item size={{ xs: 12, md: 6 }} key={index}>
            <Card sx={{ boxShadow: 4, borderRadius: 3, p: 1 }}>
              <CardMedia
                component="img"
                height="200"
                image={event.eventImage.url}
                alt={event.name}
                sx={{ borderRadius: 2 }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {event.name}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EventIcon color="primary" />
                  <Typography variant="body2">
                    {new Date(event.date).toDateString()} - {event.time}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  <PlaceIcon color="secondary" />
                  <Typography variant="body2">{event.location}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} mt={2} alignItems="center">
                  <AccessTimeIcon color="warning" />
                  <Typography
                    variant="body2"
                    color={
                      getTimeLeft(event.date) === "Ended" ? "error" : "success"
                    }
                  >
                    {getTimeLeft(event.date)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} mt={2}>
                  <Chip
                    icon={<MusicNoteIcon />}
                    label={event.eventType}
                    color="success"
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(sortedEvents.length / eventsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default LocalTipsAndEvents;
