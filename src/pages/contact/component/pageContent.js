import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid2,
  TextField,
  Button,
  Avatar,
  Paper,
  Rating,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FeedbackIcon from "@mui/icons-material/Feedback";

const ContactPageContent = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
        Have questions or need assistance? Reach out to us!
      </Typography>

      <Grid2 container spacing={4}>
        {/* Contact Information */}
        <Grid2 item size={{ xs: 12, md: 5 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <EmailIcon />
              </Avatar>
              <Typography variant="h6">Email</Typography>
            </Box>
            <Typography color="textSecondary">
              support@fleamarket.com
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              my={3}
            >
              <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                <PhoneIcon />
              </Avatar>
              <Typography variant="h6">Phone</Typography>
            </Box>
            <Typography color="textSecondary">+358 123 456 789</Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={3}
            >
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <LocationOnIcon />
              </Avatar>
              <Typography variant="h6">Location</Typography>
            </Box>
            <Typography color="textSecondary">Helsinki, Finland</Typography>
          </Paper>
        </Grid2>

        {/* Contact Form */}
        <Grid2 item size={{ xs: 12, md: 7 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Your Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Your Email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Your Message"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Feedback Section */}
      <Box mt={5}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Give Us Your Feedback
        </Typography>
        <Grid2 container justifyContent="center">
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "info.main", mb: 2 }}>
                <FeedbackIcon />
              </Avatar>
              <Typography variant="h5">We Value Your Feedback</Typography>
              <Typography color="textSecondary" mt={1}>
                Let us know how we can improve your experience!
              </Typography>
              <Rating
                name="user-rating"
                defaultValue={4}
                size="large"
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label="Write your feedback here"
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Feedback
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default ContactPageContent;
