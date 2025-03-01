import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Grid2,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const FaqComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
        Find answers to common questions about our flea market listing website.
      </Typography>

      <Grid2 container spacing={4}>
        {/* User FAQs */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5">For Users</Typography>
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                How can I find a flea market near me?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can use our map feature to locate flea markets near you.
                Simply enable location access, and we will show you markets
                within your selected radius.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Is the website free to use?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, browsing flea markets and using the search features is
                completely free. Some premium features may require a small fee.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                How do I contact a flea market owner?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Each listing includes the owner's contact details. You can
                message them directly from the market page.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid2>

        {/* Owner FAQs */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
              <StorefrontIcon />
            </Avatar>
            <Typography variant="h5">For Market Owners</Typography>
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                How do I register my flea market?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can sign up for an account and register your flea market
                through the owner dashboard, which works on both mobile and
                desktop.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Can I update my market details later?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, you can edit your market's details anytime from your
                personalized dashboard.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Are there any listing fees?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Basic listings are free. However, premium features like better
                visibility and advertisements have a small cost.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid2>
      </Grid2>

      <Divider sx={{ my: 4 }} />

      {/* General Questions */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
          <HelpOutlineIcon />
        </Avatar>
        <Typography variant="h5">General Questions</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Is the website available in multiple languages?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! Our platform supports multiple languages to ensure
            accessibility for all users.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Is my personal data secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We take security seriously. Your personal data is encrypted and
            stored securely.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Who can I contact for support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can reach out to our support team via the contact page. We’re
            happy to assist you!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FaqComponent;
