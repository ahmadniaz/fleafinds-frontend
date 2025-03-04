import React from "react";
import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import styled from "@emotion/styled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useLanguage } from "../../../../../../context/LanguageContext";

const SectionCard = styled(Card)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  marginBottom: "30px",
  overflow: "hidden",
});

const HeaderTypography = styled(Typography)({
  color: "#15a0db",
  fontWeight: "bold",
  textAlign: "center",
  paddingBottom: "20px",
  borderBottom: "2px solid #ff0000",
});

const FieldLabel = styled(Typography)({
  fontWeight: "bold",
  color: "#555",
});

const Description = ({ marketData }) => {
  const { translations } = useLanguage();
  return (
    <Grid2 item size={{ xs: 12, md: 6 }}>
      <SectionCard>
        <CardContent>
          <HeaderTypography variant="h5">{translations.MARKET_DESCRIPTION.MARKET_DETAILS}</HeaderTypography>

          <Box
            mb={2}
            mt={3}
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            <FieldLabel>{translations.MARKET_DESCRIPTION.DETAILS}</FieldLabel>
            <Typography
              sx={{ lineHeight: "1.6", fontSize: "1rem", color: "#555" }}
            >
              {marketData?.description}
            </Typography>
          </Box>

          <Box mb={2}>
            <FieldLabel>{translations.MARKET_DESCRIPTION.CATEGORIES}</FieldLabel>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
              {marketData?.categories?.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  size="small"
                  sx={{ backgroundColor: "#ff0000", color: "#fff" }}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              mt: 2,
            }}
          >
            <FieldLabel display="flex">
              <AccessTimeIcon /> {translations.MARKET_DESCRIPTION.OPENING_HOURS}
            </FieldLabel>
            <Typography mt={1}>{marketData?.openingHours}</Typography>
          </Box>

          <Box mt={2}>
            <FieldLabel>{translations.MARKET_DESCRIPTION.PRICING_LIST}</FieldLabel>
            <Typography>{marketData?.priceList}</Typography>
          </Box>

          {/* <Box mt={2}>
            <FieldLabel display="flex">
              <EventIcon /> Events
            </FieldLabel>
            {marketData?.events?.map((event, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                  mt: 1,
                }}
              >
                <Typography fontWeight="bold">{event.title}</Typography>
                <Typography>{event.date}</Typography>
                <Typography>{event.description}</Typography>
              </Box>
            ))}
          </Box> */}
        </CardContent>
      </SectionCard>
    </Grid2>
  );
};

export default Description;
