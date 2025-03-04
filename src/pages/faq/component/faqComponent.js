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
import { useLanguage } from "../../../context/LanguageContext";

const FaqComponent = () => {
  const { translations, changeLanguage } = useLanguage();
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {translations.FAQ_CONTAINER.TITLE}
      </Typography>
      <Typography variant="h6" color="textSecondary" textAlign="center" mb={4}>
      {translations.FAQ_CONTAINER.SUBTITLE}
      </Typography>

      <Grid2 container spacing={4}>
        {/* User FAQs */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5">{translations.FAQ_CONTAINER.USERS_TITLE}</Typography>
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
              {translations.FAQ_CONTAINER.USER_Q1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.USER_ANS1}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{translations.FAQ_CONTAINER.USER_Q2}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.USER_ANS2}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
              {translations.FAQ_CONTAINER.USER_Q3}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.USER_ANS3}
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
            <Typography variant="h5">{translations.FAQ_CONTAINER.OWNERS_TITLE}</Typography>
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
              {translations.FAQ_CONTAINER.OWNER_Q1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.OWNER_ANS1}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
              {translations.FAQ_CONTAINER.OWNER_Q2}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.OWNER_ANS2}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{translations.FAQ_CONTAINER.OWNER_Q3}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {translations.FAQ_CONTAINER.OWNER_ANS3}
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
        <Typography variant="h5">{translations.FAQ_CONTAINER.GENERAL_TITLE}</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
          {translations.FAQ_CONTAINER.GEN_Q1}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.FAQ_CONTAINER.GEN_ANS1}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.FAQ_CONTAINER.GEN_Q2}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.FAQ_CONTAINER.GEN_ANS2}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{translations.FAQ_CONTAINER.GEN_Q3}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {translations.FAQ_CONTAINER.GEN_ANS3}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FaqComponent;
