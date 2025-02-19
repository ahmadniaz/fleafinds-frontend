import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./theme"; // Import your custom theme
import { SnackbarProvider } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Normalize CSS styles */}
    <SnackbarProvider>
      <App /> {/* Your main app component */}
    </SnackbarProvider>
  </ThemeProvider>
);
