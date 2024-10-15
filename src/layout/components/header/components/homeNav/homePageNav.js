import React from "react";
import { Container, Box, Grid2, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../../../../../assets/images/logo.png";
import bgFleaMarket from "../../../../../assets/images/fleaMarketbg.jpg";

const HomeNavbar = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${bgFleaMarket})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: 3,
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay with opacity
          zIndex: 1,
        },
      }}
    >
      <Grid2
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ position: "relative", zIndex: 2, height: "auto" }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "250px", height: "auto" }}
          />
          <Typography variant="h6" sx={{ color: "white", ml: 2 }}>
            FleaMarket Finder
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box display="flex" alignItems="center">
          <Link
            to="/"
            style={{
              color: "white",
              marginRight: "16px",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Home
          </Link>
          <Link
            to="/about"
            style={{
              color: "white",
              marginRight: "16px",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: "white",
              marginRight: "16px",
              fontSize: "1.2rem",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Contact
          </Link>

          {/* Log In and Sign Up Buttons */}
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1976d2",
                color: "white",
                fontSize: "1rem",
                mx: 2,
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#1976d2",
                },
              }}
            >
              Log In
            </Button>
          </Link>
        </Box>
      </Grid2>
    </Container>
  );
};

export default HomeNavbar;
