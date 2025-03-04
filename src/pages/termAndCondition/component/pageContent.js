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
import { useLanguage } from "../../../context/LanguageContext";

const PageContent = () => {
  const { translations, changeLanguage } = useLanguage();
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {translations.TC_CONTAINER.TITLE}
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
      {translations.TC_CONTAINER.SUBTITLE}
      </Typography>

      {/* General Terms */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <GavelIcon />
        </Avatar>
        <Typography variant="h5">{translations.TC_CONTAINER.GENERAL_TITLE}</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.ACC_TERMS_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.ACC_TERMS_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.MOD_TERMS_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.MOD_TERMS_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* User Responsibilities */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h5">{translations.TC_CONTAINER.USERS_TITLE}</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.CONDUCT_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.CONDUCT_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.SECURITY_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.SECURITY_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* Owner Responsibilities */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
          <StorefrontIcon />
        </Avatar>
        <Typography variant="h5">{translations.TC_CONTAINER.OWNERS_TITLE}</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.ACC_LISTING_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.ACC_LISTING_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.COMPLIANCE_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.COMPLIANCE_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 4 }} />

      {/* Security & Privacy */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
          <SecurityIcon />
        </Avatar>
        <Typography variant="h5">{translations.TC_CONTAINER.PRIVACY_TITLE}</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.DATA_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.DATA_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.TC_CONTAINER.THIRD_PARTY_TITLE}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.TC_CONTAINER.THIRD_PARTY_TEXT}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default PageContent;
