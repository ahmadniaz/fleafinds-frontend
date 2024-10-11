import React from "react";
import { Container, Grid2, Box } from "@mui/material";
import Logo from "../../../../../assets/images/logo.png";

const HomeNavbar = () => {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container justifyContent="center">
          <Box display="flex">
            <img src={Logo} alt="Logo" />
          </Box>
        </Grid2>
      </Box>
    </Container>
  );
};

export default HomeNavbar;
