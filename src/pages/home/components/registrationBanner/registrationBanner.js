import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const RegistrationBanner = () => {
  const navigate = useNavigate(); // Hook to navigate to the registration page

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the registration page when the button is clicked
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "150px", // Adjust height as needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Light background for contrast
        padding: "20px 0",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff", // White background for the content box
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Slight shadow for a lifted effect
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Do you want to register your Flea market on this platform?
        </Typography>
        <Button
          variant="contained"
          color="error" // Red button
          sx={{ fontWeight: "bold", padding: "10px 20px" }}
          onClick={handleRegisterClick}
        >
          Register Now
        </Button>
      </Container>
    </Box>
  );
};

export default RegistrationBanner;
