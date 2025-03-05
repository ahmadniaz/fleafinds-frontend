import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CityCard = ({ name, description, image, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/markets?city=${encodeURIComponent(url)}`);
  };

  return (
    <Card
      sx={{
        width: "400px",
        height: "270px",
        margin: "10px",
        borderRadius: 4,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .imageOverlay": {
          transform: "translateY(-100%)",
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          sx={{ position: "relative", zIndex: 1 }}
        />
        <Box
          className="imageOverlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "140px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            transform: "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "10px",
          position: "relative",
          zIndex: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
      </Box>

      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityCard;
