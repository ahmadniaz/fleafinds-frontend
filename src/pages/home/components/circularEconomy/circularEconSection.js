// SustainabilityInfoSection.js
import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";

const SustainabilityInfoSection = () => {
  return (
    <Box
      sx={{ padding: "4rem 2rem", backgroundColor: "#15a0db", color: "#fff" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Supporting the Circular Economy
      </Typography>
      <Grid2 container spacing={3} sx={{ maxWidth: "800px", mx: "auto" }}>
        <Grid2 item xs={12}>
          <Typography variant="body1" textAlign="center">
            Flea markets are key players in sustainable shopping and reducing
            waste. When you shop at flea markets, you're not only finding unique
            items but also supporting a more sustainable future.
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SustainabilityInfoSection;
