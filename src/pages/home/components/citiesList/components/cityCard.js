import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const CityCard = ({ name, description, image }) => {
  return (
    <Card sx={{ margin: "10px", borderRadius: 4, boxShadow: 3 }}>
      {/* Background Image */}
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
        sx={{
          position: "relative",
        }}
      />

      {/* City Name on top of Image */}
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "10px",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
      </Box>

      {/* Description below the image */}
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityCard;
