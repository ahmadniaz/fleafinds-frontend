// FeaturedMarketSlider.js
import React, { useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";

const FeaturedMarketSlider = ({ items, speed = 5 }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");

  // Define slidesToShow based on screen size for responsive behavior
  const slidesToShow = isSmallScreen ? 1 : isMediumScreen ? 2 : 4;

  // Adjust speed based on screen size
  const adjustedSpeed = isSmallScreen
    ? speed / 3
    : isMediumScreen
    ? speed * 0.75
    : speed;

  // Reference to the scroll container
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Scroll reset to create an infinite loop
    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // Reset to start
      }
    };

    // Set an interval to scroll at a fixed speed
    const scrollInterval = setInterval(() => {
      scrollContainer.scrollLeft += 1;
    }, adjustedSpeed);

    // Add scroll event listener to handle reset
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(scrollInterval); // Clean up on component unmount
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [adjustedSpeed]);

  return (
    <Box
      sx={{
        mt: 4,
        overflow: "hidden",
        position: "relative",
        width: "100%",
        p: 3,
        whiteSpace: "nowrap",
      }}
      ref={scrollContainerRef}
    >
      <Box
        sx={{
          display: "flex",
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {/* Original and cloned items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            sx={{
              flex: `0 0 calc(100% / ${slidesToShow})`, // Adjusts based on slidesToShow for responsiveness
              minWidth: `calc(100% / ${slidesToShow})`, // Minimum width for each slide
              maxWidth: 400, // Limits max width for better readability on larger screens
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              height="200"
              sx={{
                objectFit: "cover",
                width: "100%",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: "#ff0000",
                  fontSize: isSmallScreen ? "1rem" : "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isSmallScreen ? "0.8rem" : "1rem",
                  color: "#555",
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedMarketSlider;
