import React from "react";
import {
  Box,
  Typography,
  Grid2,
  CardContent,
  Button,
  Rating,
  Card,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import styled from "@emotion/styled";

// Styled components for elegance

const SectionCard = styled(Card)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  marginBottom: "30px",
  overflow: "hidden",
});

const TitleSection = ({ marketData, reviewFormRef, allReviews }) => {
  const totalRating =
    allReviews && allReviews?.reduce((sum, review) => sum + review?.rating, 0);

  // Calculate average rating
  const averageRating = (totalRating / allReviews?.length).toFixed(1);
  // Function to scroll to the review form
  const scrollToReviewForm = () => {
    reviewFormRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <SectionCard>
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="Market Logo"
                src={marketData?.logo?.url}
                style={{
                  width: "200px",
                  border: "2px solid #15a0db",
                }}
              />
            </Box>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 4 }}>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography
                variant="h4"
                sx={{ color: "#ff0000", fontWeight: "bold" }}
              >
                {marketData?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Rating
                  value={averageRating}
                  precision={0.1}
                  readOnly
                  sx={{ color: "#ff0000" }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: 1 }}
                >
                  ({allReviews?.length} reviews)
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#15a0db", marginTop: 1 }}
              >
                {marketData?.marketType}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 item size={{ xs: 12, sm: 4 }} alignSelf="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={() => scrollToReviewForm()}
                startIcon={<RateReviewIcon />}
              >
                Add a Review
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </SectionCard>
  );
};

export default TitleSection;
