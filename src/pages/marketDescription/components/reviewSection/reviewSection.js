import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Grid2,
  Divider,
} from "@mui/material";
import UserReviewsSection from "./components/userReviews";
import CompanyContactInfo from "./components/companyContactInfo";
import { Formik, Form, Field } from "formik";
import { LoadingFallback } from "../../../../components";

const ReviewAndSocialMediaSection = ({
  reviews,
  marketData,
  secRef,
  submitReview,
  loading,
}) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  // Calculate average rating
  const averageRating = (totalRating / reviews.length).toFixed(1);

  // Initialize rating breakdown object (default 0)
  const ratingsBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  // Count occurrences of each rating
  reviews.forEach((review) => {
    ratingsBreakdown[review.rating] += 1;
  });

  // Convert counts to percentages
  Object.keys(ratingsBreakdown).forEach((rating) => {
    ratingsBreakdown[rating] = (
      (ratingsBreakdown[rating] / reviews?.length) *
      100
    ).toFixed(1);
  });

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "20px", md: "40px" },
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid2 container spacing={4}>
        {/* Left Section: Reviews */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12, lg: 8 }}>
          {/* Review Section */}

          {/* Write a Review Form */}
          {loading ? (
            <LoadingFallback />
          ) : (
            <Box sx={{ marginTop: "40px" }} ref={secRef}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Write a review
              </Typography>

              <Formik
                initialValues={{
                  rating: 0,
                  comment: "",
                  name: "",
                  email: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  submitReview(values);
                  resetForm();
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    {/* Overall Rating */}
                    <Box sx={{ marginBottom: "20px" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginBottom: "10px" }}
                      >
                        Your overall rating
                      </Typography>
                      <Rating
                        name="rating"
                        value={values.rating}
                        onChange={(event, newValue) =>
                          setFieldValue("rating", newValue)
                        }
                      />
                    </Box>

                    {/* Review Comment */}
                    <Box sx={{ marginBottom: "20px" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginBottom: "10px" }}
                      >
                        Your review
                      </Typography>
                      <Field
                        as={TextField}
                        name="comment"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Write your review here"
                        variant="outlined"
                      />
                    </Box>

                    {/* Name Field */}
                    <Box sx={{ marginBottom: "20px" }}>
                      <Typography variant="subtitle1">Name</Typography>
                      <Field
                        as={TextField}
                        name="name"
                        fullWidth
                        placeholder="Enter your name"
                        variant="outlined"
                      />
                    </Box>

                    {/* Email Field */}
                    <Box sx={{ marginBottom: "20px" }}>
                      <Typography variant="subtitle1">
                        E-mail address
                      </Typography>
                      <Field
                        as={TextField}
                        name="email"
                        fullWidth
                        placeholder="Enter your email"
                        variant="outlined"
                      />
                    </Box>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: "#ff0000", color: "#fff" }}
                    >
                      Submit a review
                    </Button>

                    {/* Note */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontWeight="bold"
                      sx={{ marginTop: "10px" }}
                    >
                      Note: The review must be based on your own customer
                      experience with the company. Each review is reviewed
                      before publication. Read more about our review policy.
                    </Typography>
                  </Form>
                )}
              </Formik>
            </Box>
          )}

          <Divider sx={{ p: 2 }} />

          <UserReviewsSection reviews={reviews} averageRating={averageRating} />
        </Grid2>

        {/* Right Section: Social Media Links */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12, lg: 3 }}>
          <CompanyContactInfo marketData={marketData} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ReviewAndSocialMediaSection;
