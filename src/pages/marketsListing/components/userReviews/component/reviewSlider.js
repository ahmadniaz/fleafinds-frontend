import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createSlug } from "../../../../../utils/slug";

const ReviewsSlider = ({ items, markets, speed = 5 }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const slidesToShow = isSmallScreen ? 1 : isMediumScreen ? 3 : 4;
  const adjustedSpeed = isSmallScreen
    ? speed / 3
    : isMediumScreen
    ? speed * 0.75
    : speed;

  const scrollContainerRef = useRef(null);
  const [expanded, setExpanded] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name) => {
    if (!name) return "?"; // Fallback for undefined names
    const words = name.trim().split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0] // First letters of first & second word
      : words[0][0]; // Only the first letter for single-word names
  };

  const navigate = useNavigate(); // Initialize navigate function

  const handleMarketClick = (item) => {
    const slug = createSlug(item?.marketName);
    const marketDesc = markets.filter(
      (market) => market?._id === item?.marketId
    );

    navigate(`/markets/${slug}`, { state: { marketData: marketDesc[0] } });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    };

    let scrollInterval;
    if (!isHovered) {
      scrollInterval = setInterval(() => {
        scrollContainer.scrollLeft += 1;
      }, adjustedSpeed);
    }

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [adjustedSpeed, isHovered]);

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
      <Box sx={{ display: "flex", cursor: "pointer" }}>
        {items.map((item, index) => (
          <Card
            key={`${item?.id}-${index}`}
            sx={{
              flex: `0 0 calc(100% / ${slidesToShow})`,
              minWidth: `calc(100% / ${slidesToShow})`,
              maxWidth: 400,
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent>
              {/* Market Logo and Name */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
                onClick={() => handleMarketClick(item)}
              >
                {/* Market Logo */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    mr: 1,
                  }}
                >
                  <img
                    src={item?.marketLogo?.url || "/default-logo.png"} // Ensure you have a default image
                    alt="Market Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Market Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#15a0db",
                    textAlign: "center",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {item?.marketName}
                </Typography>
              </Box>

              <Divider sx={{ marginBottom: 2 }} />

              {/* User Info, Review, Rating, and Date */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {/* User Info */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      mr: 2,
                      fontSize: "1rem",
                    }}
                  >
                    {getInitials(item?.name).toUpperCase()}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {item?.name}
                  </Typography>
                </Box>

                {/* Review Text */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    textAlign: "justify",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                  }}
                >
                  {expanded[item.id]
                    ? item?.description
                    : `${item?.description?.substring(0, 200)}...`}
                  {item?.description?.length > 200 && (
                    <span
                      style={{
                        color: "#15a0db",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                    >
                      {expanded[item.id] ? " Show Less" : " Read More"}
                    </span>
                  )}
                </Typography>

                {/* Star Rating with Number */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {item.rating.toFixed(1)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {Array.from(
                      { length: Math.floor(item.rating) },
                      (_, idx) => (
                        <span key={idx} role="img" aria-label="star">
                          ⭐
                        </span>
                      )
                    )}
                    {item.rating % 1 !== 0 && (
                      <span role="img" aria-label="half-star">
                        ⭐
                      </span>
                    )}
                  </Box>
                </Box>

                {/* Review Date */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textAlign: "right", display: "block" }}
                >
                  {item?.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewsSlider;
