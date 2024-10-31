import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Button,
  TextField,
  Grid2,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ReviewAndSocialMediaSection = ({
  reviews,
  totalReviews,
  ratingsBreakdown,
  testMarketData,
  secRef,
}) => {
  return (
    <Box
      sx={{
        padding: "40px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid2 container spacing={4}>
        {/* Left Section: Reviews */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12, lg: 8 }}>
          {/* Review Section */}
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
            <Box
              display="flex"
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "10px", color: "#15a0db" }}
              >
                5.0
              </Typography>
              <Typography variant="subtitle1">
                A total of {totalReviews} reviews
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

            {/* Customer Reviews */}
            {reviews.map((review, index) => (
              <Box key={index} sx={{ marginTop: "20px", marginBottom: "30px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: "5px" }}
                >
                  {review.comment}
                </Typography>
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{ marginBottom: "5px" }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ marginBottom: "5px", fontWeight: "bold" }}
                >
                  {review.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {review.date}
                </Typography>
                <Divider sx={{ marginTop: "15px" }} />
              </Box>
            ))}

            {/* Write a Review Form */}
            <Box sx={{ marginTop: "40px" }} ref={secRef}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Write a review
              </Typography>

              <Formik
                initialValues={{ rating: 0, comment: "", name: "", email: "" }}
                onSubmit={(values, { resetForm }) => {
                  console.log("Review submitted", values);
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
          </Box>
        </Grid2>

        {/* Right Section: Social Media Links */}
        <Grid2 item size={{ xs: 12, md: 6, sm: 12, lg: 3 }}>
          <Card
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <CardContent>
              {/* Follow Us Section */}
              <Typography
                variant="h5"
                sx={{
                  color: "#ff0000",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "left",
                }}
              >
                Follow Us
              </Typography>
              <Grid2
                container
                direction="column"
                alignItems="baseline"
                spacing={2}
              >
                {testMarketData.socialMedia.facebook && (
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#3b5998",
                      color: "#3b5998",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#3b5998", color: "#fff" },
                    }}
                    href={testMarketData.socialMedia.facebook}
                    target="_blank"
                    startIcon={<FacebookIcon />}
                  >
                    Facebook
                  </Button>
                )}
                {testMarketData.socialMedia.instagram && (
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#E4405F",
                      color: "#E4405F",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#E4405F", color: "#fff" },
                    }}
                    href={testMarketData.socialMedia.instagram}
                    target="_blank"
                    startIcon={<InstagramIcon />}
                  >
                    Instagram
                  </Button>
                )}
                {testMarketData.socialMedia.twitter && (
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#1DA1F2",
                      color: "#1DA1F2",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#1DA1F2", color: "#fff" },
                    }}
                    href={testMarketData.socialMedia.twitter}
                    target="_blank"
                    startIcon={<TwitterIcon />}
                  >
                    Twitter
                  </Button>
                )}
              </Grid2>

              {/* Divider */}
              <Divider sx={{ marginY: "20px" }} />

              {/* Contact Us Section */}
              <Typography
                variant="h5"
                sx={{
                  color: "#ff0000",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "left",
                }}
              >
                Contact Us
              </Typography>

              <Grid2
                container
                direction="column"
                alignItems="baseline"
                spacing={2}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                  <Typography variant="body1">+358 123 4567</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                  <Typography variant="body1">
                    info@finnishfleamarket.com
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LanguageIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                  <Typography variant="body1">
                    <Link href="https://finnishfleamarket.com" target="_blank">
                      finnishfleamarket.com
                    </Link>
                  </Typography>
                </Box>
              </Grid2>
              {/* Divider */}
              <Divider sx={{ marginY: "20px" }} />
              {/* Report Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  target="_blank"
                  startIcon={<ReportProblemIcon />}
                >
                  Report this Flea Market
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ReviewAndSocialMediaSection;
