import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, LocationOn } from "@mui/icons-material";
import { Rating } from "@mui/material";

const FeaturedMarketSlider = ({ items }) => {
  const scrollContainerRef = useRef(null);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");

  const slidesToShow = isSmallScreen ? 1 : isMediumScreen ? 3 : 5;

  // Handle manual scroll for arrows
  const scroll = (direction) => {
    const scrollAmount =
      scrollContainerRef?.current?.offsetWidth / slidesToShow;
    scrollContainerRef?.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 5, position: "relative", width: "100%" }}>
      {/* Navigation Arrows */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          background: "rgba(255, 255, 255, 0.7)",
          zIndex: 10,
          "&:hover": { background: "white" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          padding: "10px 0",
        }}
      >
        {items?.map((item) => (
          <Card
            key={item?._id}
            sx={{
              flex: `0 0 calc(100% / ${slidesToShow} - 20px)`,
              minWidth: `calc(100% / ${slidesToShow} - 20px)`,
              maxWidth: 400,
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
              position: "relative",
            }}
          >
            {/* Market Image with Overlay */}
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={item?.logo}
                alt={item?.name}
                height="220"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              {/* Dark Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust transparency here
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              {/* Text on Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {item?.name}
                </Typography>
                <Typography variant="body2">{item?.marketType}</Typography>
              </Box>
            </Box>

            {/* Card Content */}
            <CardContent sx={{ padding: "16px", textAlign: "center" }}>
              {/* Location */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={1}
              >
                <LocationOn
                  sx={{ color: "#ff0000", fontSize: "1.2rem", mr: 0.5 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {item?.location?.address}
                </Typography>
              </Box>

              {/* Ratings */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={1}
              >
                <Rating
                  value={item?.averageRating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  ({item?.reviewCount} reviews)
                </Typography>
              </Box>

              {/* Explore Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "#15a0db",
                  "&:hover": { backgroundColor: "#127bb5" },
                  borderRadius: 2,
                  mt: 1,
                }}
                onClick={() => window.open(item.websiteUrl, "_blank")}
              >
                Explore Market
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Right Navigation Arrow */}
      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          background: "rgba(255, 255, 255, 0.7)",
          zIndex: 10,
          "&:hover": { background: "white" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default FeaturedMarketSlider;
