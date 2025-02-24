import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingFallback = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay
        zIndex: 9999,
      }}
    >
      <CircularProgress size={50} />
      <Typography variant="h6" mt={2}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
