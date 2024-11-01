// FeaturedMarketSlider.js
import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const FeaturedMarketSlider = ({ items, slidesToShow = 3, speed = 30 }) => {
  return (
    <Box
      sx={{
        mt: 4,
        overflow: "hidden",
        position: "relative",
        width: "100%",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          animation: `scroll ${speed}s linear infinite`,
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes scroll": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: `translateX(-${100 / slidesToShow}%)` },
          },
        }}
      >
        {/* Duplicate items to create infinite loop */}
        {[...items, ...items].map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            sx={{
              flex: "0 0 calc(100% / slidesToShow)",
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 300, // Ensures cards have a minimum width for better visuals
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              height="200"
            />
            <CardContent>
              <Typography variant="h6" sx={{ color: "#ff0000" }}>
                {item.name}
              </Typography>
              <Typography variant="body2">{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedMarketSlider;
