import React from "react";
import { Container, Grid2, Box, Button, TextField, Link } from "@mui/material";
import Logo from "../../../../../assets/images/logo.png";

const MainNavbar = () => {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={1}>
          {/* Logo Section: 6 columns */}
          <Grid2 item xs={6}>
            <Box display="flex">
              <img src={Logo} alt="Logo" width="200px" height="100px" />
            </Box>
          </Grid2>

          {/* Links Section: 6 columns */}
          <Grid2 item xs={6}>
            <Box display="flex">
              {/* Search Bar: 3 columns */}
              <Grid2 item>
                <TextField variant="outlined" placeholder="Search" fullWidth />
              </Grid2>

              {/* Signup Button: 3 columns */}
              <Grid2 item>
                <Button variant="contained" color="primary" fullWidth>
                  Sign Up
                </Button>
              </Grid2>

              {/* Links: 2 columns each */}
              <Grid2 item>
                <Link href="/about" underline="none">
                  About
                </Link>
              </Grid2>
              <Grid2 item>
                <Link href="/contact" underline="none">
                  Contact
                </Link>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default MainNavbar;
