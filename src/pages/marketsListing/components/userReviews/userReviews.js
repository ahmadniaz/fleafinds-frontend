import React from "react";
import { Box, Typography } from "@mui/material";
import ReviewsSlider from "./component/reviewSlider";

const UserReviews = ({ reviews, markets }) => {
  if (!reviews?.length) return null; // Don't render if no reviews exist

  // Sort reviews: Prioritize top ratings, then sort by most recent
  const sortedReviews = reviews
    .sort(
      (a, b) =>
        b.rating - a.rating || new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 10); // Show only 10 reviews

  // Transform data into expected format for the slider
  const reviewItems = sortedReviews?.map((review) => ({
    id: review?._id,
    marketLogo: review?.marketId?.logo,
    marketId: review?.marketId?._id, // Store market ID for linking
    name: review?.name,
    marketName: review?.marketId?.name,
    description: review?.comment,
    rating: review?.rating,
    date: new Date(review?.createdAt).toLocaleDateString(), // Format date
  }));

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#15a0db", fontWeight: "bold" }}>
        User Reviews
      </Typography>
      <ReviewsSlider items={reviewItems} markets={markets} />
    </Box>
  );
};

export default UserReviews;
