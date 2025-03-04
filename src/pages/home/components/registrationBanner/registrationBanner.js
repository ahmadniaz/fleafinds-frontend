import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../context/LanguageContext";

const RegistrationBanner = () => {
  const navigate = useNavigate();
  const { translations, changeLanguage } = useLanguage();
  const handleRegisterClick = () => {
    navigate("/auth");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f5",
        padding: "40px 0",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px 40px",
          borderRadius: "12px",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {translations.REGISTRATION_BANNER.QUESTION}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: "bold",
            padding: "12px 24px",
            boxShadow: "0px 8px 16px rgba(255, 0, 0, 0.3)",
          }}
          onClick={handleRegisterClick}
        >
          {translations.REGISTRATION_BANNER.BUTTON}
        </Button>
      </Container>
    </Box>
  );
};

export default RegistrationBanner;
