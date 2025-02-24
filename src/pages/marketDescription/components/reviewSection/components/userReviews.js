import { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Rating,
  Divider,
  Button,
} from "@mui/material";

const UserReviewsSection = ({ reviews, averageRating }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Slice reviews for the current page
  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Calculate rating breakdown
  const totalReviews = reviews.length;
  const ratingsBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((review) => {
    ratingsBreakdown[review.rating] += 1;
  });

  Object.keys(ratingsBreakdown).forEach((rating) => {
    ratingsBreakdown[rating] = (
      (ratingsBreakdown[rating] / totalReviews) *
      100
    ).toFixed(1);
  });

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        mt: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#ff0000",
        }}
      >
        User Reviews
      </Typography>

      {/* Overall Rating and Review Breakdown */}
      <Box display="flex" alignItems="center" sx={{ marginBottom: "10px" }}>
        <Typography variant="h6" sx={{ marginRight: "10px", color: "#15a0db" }}>
          {averageRating}
        </Typography>
        <Typography variant="subtitle1">
          A total of {reviews?.length} reviews
        </Typography>
      </Box>

      {/* Rating Bars */}
      {[5, 4, 3, 2, 1].map((rating, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          sx={{ marginBottom: "5px" }}
        >
          <Typography variant="body2">{rating} stars</Typography>
          <LinearProgress
            variant="determinate"
            value={ratingsBreakdown[rating] || 0}
            sx={{
              flexGrow: 1,
              height: "15px",
              marginLeft: "10px",
              marginRight: "10px",
              backgroundColor: "#f0f0f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#15a0db",
              },
            }}
          />
          <Typography variant="body2">
            {ratingsBreakdown[rating] || 0}%
          </Typography>
        </Box>
      ))}

      <Divider sx={{ p: 2 }} />

      {/* Customer Reviews */}
      {displayedReviews.map((review, index) => (
        <Box key={index} sx={{ mt: 3, marginBottom: "30px" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "5px" }}
          >
            {review?.comment}
          </Typography>
          <Rating
            value={review?.rating}
            readOnly
            size="small"
            sx={{ marginBottom: "5px" }}
          />
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            {review?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(review?.createdAt).toLocaleDateString()}
          </Typography>
          <Divider sx={{ marginTop: "15px" }} />
        </Box>
      ))}

      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography variant="body2">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserReviewsSection;
