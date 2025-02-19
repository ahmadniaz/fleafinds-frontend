import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    duration: 3000,
  });

  const showSnackbar = (message, severity = "info", duration = 3000) => {
    setSnackbar({ open: true, message, severity, duration });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom Hook to use the snackbar
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
