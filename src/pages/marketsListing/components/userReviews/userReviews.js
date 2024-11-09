// UserReviews.js
import React from "react";
import { Box, Typography } from "@mui/material";
import ReviewsSlider from "./component/reviewSlider";

const UserReviews = ({ reviews }) => {
  // Transform reviews data into the format expected by CustomSlider
  const reviewItems = reviews.map((review) => ({
    id: review.user,
    image: "", // Leave empty for now
    name: review.user, // Use a nickname or initials
    marketName: review.marketName, // Include market name
    description: review.comment,
    rating: review.rating, // Include the star rating
    date: review.date, // Include the review date
  }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#15a0db", fontWeight: "bold", textAlign: "center" }}
      >
        User Reviews
      </Typography>
      <ReviewsSlider items={reviewItems} />
    </Box>
  );
};

export default UserReviews;
