import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CityCard = ({ name, description, image }) => {
  return (
    <>
      <Link to={"/markets-listing"} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            width: "400px",
            height: "270px",
            margin: "10px",
            borderRadius: 4,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden", // Ensures the overlay stays within the card boundaries
            cursor: "pointer", // Mouse turns into hand
            "&:hover .imageOverlay": {
              transform: "translateY(-100%)", // Move the overlay to its original position (full cover)
            },
          }}
        >
          {/* Background Image with overlay */}
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={name}
              sx={{ position: "relative", zIndex: 1 }}
            />
            {/* Dark overlay with shutter effect */}
            <Box
              className="imageOverlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "140px",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                zIndex: 2,
                transform: "translateY(0)", // Start from below the image (shutter down)
                transition: "transform 0.3s ease", // Smooth "shutter" effect
              }}
            />
          </Box>

          {/* City Name on top of Image */}
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px",
              position: "relative", // Ensure the text is above the overlay
              zIndex: 3,
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
      </Link>
    </>
  );
};

export default CityCard;
