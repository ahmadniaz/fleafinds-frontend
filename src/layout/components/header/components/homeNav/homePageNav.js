import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/images/logo.png";

const HomeNavbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", paddingY: 1 }}
        >
          {/* Logo Section */}
          <Link
            to="/"
            style={{
              // display: "flex",
              // alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: "200px" }} />
            <Typography
              variant="subtitle1"
              sx={{
                ml: 1,
                color: "#ff0000",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Flear Markets Finder
            </Typography>
          </Link>

          {/* Navigation Links */}
          <Box display="flex" alignItems="center">
            {["Home", "About", "Contact"].map((text) => (
              <Link
                key={text}
                to={`/${text.toLowerCase()}`}
                style={{
                  color: "#15a0db",
                  marginRight: "16px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ff0000")}
                onMouseLeave={(e) => (e.target.style.color = "#15a0db")}
              >
                {text}
              </Link>
            ))}

            {/* Log In Button */}
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#15a0db",
                  color: "#fff",
                  fontSize: "1rem",
                  borderRadius: 2,
                  boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                  "&:hover": {
                    backgroundColor: "#ff0000",
                    boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                  },
                }}
              >
                Owner Register/Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavbar;
