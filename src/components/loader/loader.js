import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingFallback = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ marginTop: "20px" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
