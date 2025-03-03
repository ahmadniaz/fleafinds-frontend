import { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Rating,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const UserReviewsSection = ({
  reviews,
  setAllReviews,
  averageRating,
  marketData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState(null); // Track which review is being replied to
  const [replyText, setReplyText] = useState(""); // Reply content
  const reviewsPerPage = 5;

  const ownerId = localStorage.getItem("ownerId"); // Get ownerId from localStorage
  const isOwner = marketData?.owner === ownerId; // Check if current user is the owner

  // Pagination setup
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Rating breakdown
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

  // Handle reply submission
  const handleReplySubmit = async (reviewId) => {
    if (!replyText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}api/review/reply/${reviewId}`,
        { replyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Debugging: Check the full updated review object
      console.log(response?.data.review, "Updated Review");

      // Update reviews list to include the new reply
      setAllReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId
            ? { ...review, replies: response.data.review.replies }
            : review
        )
      );

      // Reset the reply form and text after submission
      setReplyingTo(null); // Close the reply form
      setReplyText(""); // Clear the reply text
    } catch (error) {
      console.error("Error submitting reply:", error.response?.data || error);
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

          {/* Owner Reply Button */}
          {isOwner && (
            <Button
              variant="text"
              color="primary"
              sx={{ marginTop: "5px" }}
              onClick={() =>
                setReplyingTo(replyingTo === review._id ? null : review._id)
              }
            >
              {replyingTo === review._id ? "Cancel" : "Reply"}
            </Button>
          )}

          {/* Reply Form (Shown only to Owner) */}
          {replyingTo === review._id && isOwner && (
            <Box sx={{ marginTop: "10px" }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Write your reply..."
                variant="outlined"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "5px" }}
                onClick={() => handleReplySubmit(review._id)}
              >
                Submit Reply
              </Button>
            </Box>
          )}

          {/* Display Replies */}
          {review.replies && review.replies.length > 0 && (
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Owner Reply:
              </Typography>
              {review.replies.map((reply, index) => (
                <Typography key={index} variant="body2">
                  {reply.replyText}
                </Typography>
              ))}
            </Box>
          )}

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
