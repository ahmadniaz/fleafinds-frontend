// CustomSlider.js
import React, { useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";

const ReviewsSlider = ({ items, speed = 5 }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");

  // Define slidesToShow based on screen size
  const slidesToShow = isSmallScreen ? 1 : isMediumScreen ? 3 : 4;

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

    // Reset scroll position for infinite loop
    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    // Auto-scroll at a fixed speed
    const scrollInterval = setInterval(() => {
      scrollContainer.scrollLeft += 1;
    }, adjustedSpeed);

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(scrollInterval);
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
      }}
      ref={scrollContainerRef}
    >
      <Box
        sx={{
          display: "flex",
          "&:hover": {
            animationPlayState: "paused",
            cursor: "pointer",
          },
        }}
      >
        {/* Original and cloned items for seamless scrolling */}
        {[...items, ...items].map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            sx={{
              flex: `0 0 calc(100% / ${slidesToShow})`, // Responsive width
              minWidth: `calc(100% / ${slidesToShow})`, // Minimum width for each card
              maxWidth: 400, // Optional max-width for large screens
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              {/* Market Name */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#15a0db",
                  marginBottom: 1,
                  textAlign: "center",
                }}
              >
                {item.marketName}
              </Typography>

              {/* Divider */}
              <Divider sx={{ marginBottom: 1 }} />

              {/* User Avatar and Name */}
              <Box display="flex" alignItems="center" marginBottom={1}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#15a0db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    marginRight: 2,
                    fontSize: isSmallScreen ? "0.8rem" : "1rem", // Responsive font size
                  }}
                >
                  {item.name.charAt(0)}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
              </Box>

              {/* Review Description */}
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {item.description}
              </Typography>

              {/* Star Rating */}
              <Box display="flex" alignItems="center" marginBottom={1}>
                {Array.from({ length: item.rating }, (_, idx) => (
                  <span key={idx} role="img" aria-label="star">
                    ⭐
                  </span>
                ))}
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {item.rating} out of 5
                </Typography>
              </Box>

              {/* Review Date */}
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewsSlider;
