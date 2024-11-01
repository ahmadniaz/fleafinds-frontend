import React from "react";
import { Box, Typography, Card, CardContent, Grid2 } from "@mui/material";

const LocalTipsAndEvents = ({ tips, events }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#15a0db", fontWeight: "bold", textAlign: "center" }}
      >
        Local Tips & Upcoming Events
      </Typography>
      <Grid2 container spacing={3} sx={{ mt: 2 }}>
        {/* Shopping Tips Section */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h5"
            sx={{ color: "#ff0000", textAlign: "center" }}
          >
            Shopping Tips
          </Typography>
          {tips.map((tip, index) => (
            <Card key={index} sx={{ my: 1, boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body1">{tip.tip}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid2>

        {/* Upcoming Events Section */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h5"
            sx={{ color: "#ff0000", textAlign: "center" }}
          >
            Upcoming Events
          </Typography>
          {events.map((event, index) => (
            <Card key={index} sx={{ my: 1, boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2">{event.date}</Typography>
                <Typography variant="body2">{event.location}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default LocalTipsAndEvents;
