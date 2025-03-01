import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SecurityIcon from "@mui/icons-material/Security";

const PageContent = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
        Please read these terms carefully before using our flea market listing
        platform.
      </Typography>

      {/* General Terms */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <GavelIcon />
        </Avatar>
        <Typography variant="h5">General Terms</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Acceptance of Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            By using our platform, you agree to comply with and be bound by
            these terms.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Modification of Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We reserve the right to update these terms at any time. Continued
            use of the site constitutes agreement to the changes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* User Responsibilities */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5">For Users</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">User Conduct</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Users must engage respectfully and lawfully when interacting with
            the platform and market owners.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Account Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Users are responsible for maintaining the confidentiality of their
            account information.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* Owner Responsibilities */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
          <StorefrontIcon />
        </Avatar>
        <Typography variant="h5">For Market Owners</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Accurate Listings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Market owners must provide accurate and up-to-date information about
            their flea markets.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Compliance with Laws</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Market owners must adhere to local regulations and business laws.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* Security & Privacy */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
          <SecurityIcon />
        </Avatar>
        <Typography variant="h5">Privacy & Security</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Data Protection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We prioritize your privacy. Personal data is encrypted and stored
            securely.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Third-Party Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our platform may integrate third-party services. We are not
            responsible for their terms and policies.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default PageContent;
