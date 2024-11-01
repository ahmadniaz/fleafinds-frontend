// CustomSlider.js
import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

const ReviewsSlider = ({ items, slidesToShow, speed = 20 }) => {
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
            cursor: "pointer",
          },
          "@keyframes scroll": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: `translateX(-${100 / slidesToShow}%)` },
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            sx={{
              flex: "0 0 calc(100% / slidesToShow)",
              mx: 1,
              boxShadow: 3,
              borderRadius: 2,
              minWidth: 300,
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
                  }}
                >
                  {item.name.charAt(0)} {/* First letter of username */}
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
                {Array.from({ length: item.rating }, (_, index) => (
                  <span key={index} role="img" aria-label="star">
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
