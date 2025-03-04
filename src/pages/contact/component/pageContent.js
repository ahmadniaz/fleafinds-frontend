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
import { useLanguage } from "../../../context/LanguageContext";

const ContactPageContent = () => {
  const { translations, changeLanguage } = useLanguage();
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {translations.CONTACT_CONTAINER.TITLE}
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
        {translations.CONTACT_CONTAINER.SUBTITLE}
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
              <Typography variant="h6">{translations.CONTACT_CONTAINER.EMAIL}</Typography>
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
              <Typography variant="h6">{translations.CONTACT_CONTAINER.PHONE}</Typography>
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
              <Typography variant="h6">{translations.CONTACT_CONTAINER.LOCATION}</Typography>
            </Box>
            <Typography color="textSecondary">Helsinki, Finland</Typography>
          </Paper>
        </Grid2>

        {/* Contact Form */}
        <Grid2 item size={{ xs: 12, md: 7 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
            {translations.CONTACT_CONTAINER.MESSAGE_TITLE}
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label={translations.CONTACT_CONTAINER.M_TEXTFIELD1}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label={translations.CONTACT_CONTAINER.M_TEXTFIELD2}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label={translations.CONTACT_CONTAINER.M_TEXTFIELD3}
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
                {translations.CONTACT_CONTAINER.MESSAGE_BUTTON}
              </Button>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Feedback Section */}
      <Box mt={5}>
        <Typography variant="h4" textAlign="center" gutterBottom>
        {translations.CONTACT_CONTAINER.FEEDBACK_TITLE}
        </Typography>
        <Grid2 container justifyContent="center">
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "info.main", mb: 2 }}>
                <FeedbackIcon />
              </Avatar>
              <Typography variant="h5">{translations.CONTACT_CONTAINER.FEEDBACK_SUBTITLE}</Typography>
              <Typography color="textSecondary" mt={1}>
              {translations.CONTACT_CONTAINER.FEEDBACK_SUBTITLE2}
              </Typography>
              <Rating
                name="user-rating"
                defaultValue={4}
                size="large"
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label={translations.CONTACT_CONTAINER.FEEDBACK_TEXTFIELD}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              {translations.CONTACT_CONTAINER.FEEDBACK_BUTTON}
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default ContactPageContent;
