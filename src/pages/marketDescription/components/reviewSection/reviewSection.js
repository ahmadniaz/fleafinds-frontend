import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Grid2,
} from "@mui/material";
import UserReviewsSection from "./components/userReviews";
import CompanyContactInfo from "./components/companyContactInfo";
import { Formik, Form, Field } from "formik";
import { LoadingFallback } from "../../../../components";
import { useLanguage } from "../../../../context/LanguageContext";

const ReviewAndSocialMediaSection = ({
  reviews,
  marketData,
  setAllReviews,
  secRef,
  submitReview,
  loading,
  relatedEvents,
}) => {
  const ownerId = localStorage.getItem("ownerId"); // Get ownerId from localStorage
  const isOwner = marketData?.owner === ownerId; // Check if current user is the owner
  const totalRating =
    reviews && reviews?.reduce((sum, review) => sum + review?.rating, 0);

  // Calculate average rating
  const averageRating = (totalRating / reviews?.length).toFixed(1);

  // Initialize rating breakdown object (default 0)
  const ratingsBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const { translations } = useLanguage();

  // Count occurrences of each rating
  reviews?.forEach((review) => {
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
        padding: { xs: "10px", sm: "20px" },
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
            <>
              {isOwner ? null : (
                <Box sx={{ marginTop: "40px" }} ref={secRef}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: "20px" }}
                  >
                    {translations.MARKET_DESCRIPTION.WRITE_REVIEW}
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
                            {translations.MARKET_DESCRIPTION.YOUR_OVERALL_RATING}
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
                            {translations.MARKET_DESCRIPTION.YOUR_REVIEW}
                          </Typography>
                          <Field
                            as={TextField}
                            name="comment"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder={`${translations.MARKET_DESCRIPTION.WRITE_YOUR_REVIEW_HERE}`}
                            variant="outlined"
                          />
                        </Box>

                        {/* Name Field */}
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography variant="subtitle1">{translations.MARKET_DESCRIPTION.REVIEWER_NAME}</Typography>
                          <Field
                            as={TextField}
                            name="name"
                            fullWidth
                            placeholder={`${translations.MARKET_DESCRIPTION.ENTER_YOUR_NAME}`}
                            variant="outlined"
                          />
                        </Box>

                        {/* Email Field */}
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography variant="subtitle1">
                          {translations.MARKET_DESCRIPTION.REVIEWER_EMAIL}
                          </Typography>
                          <Field
                            as={TextField}
                            name="email"
                            fullWidth
                            placeholder={`${translations.MARKET_DESCRIPTION.ENTER_YOUR_EMAIL}`}
                            variant="outlined"
                          />
                        </Box>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ backgroundColor: "#ff0000", color: "#fff" }}
                        >
                          {translations.MARKET_DESCRIPTION.SUBMIT_REVIEW}
                        </Button>

                        {/* Note */}
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          fontWeight="bold"
                          sx={{ marginTop: "10px" }}
                        >
                          {translations.MARKET_DESCRIPTION.NOTE_TEXT}
                        </Typography>
                      </Form>
                    )}
                  </Formik>
                </Box>
              )}
            </>
          )}

          {reviews && reviews?.length > 0 ? (
            <UserReviewsSection
              reviews={reviews}
              averageRating={averageRating}
              marketData={marketData}
              setAllReviews={setAllReviews}
            />
          ) : (
            <Box sx={{ p: 3 }}>
              <Typography>{translations.MARKET_DESCRIPTION.NO_REVIEWS_YET}</Typography>
            </Box>
          )}
        </Grid2>

        {/* Right Section: Social Media Links */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12, lg: 3 }}>
          <CompanyContactInfo
            marketData={marketData}
            relatedEvents={relatedEvents}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ReviewAndSocialMediaSection;
