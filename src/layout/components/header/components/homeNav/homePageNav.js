import React from "react";
import { Container, Box, Grid2 } from "@mui/material";
import Logo from "../../../../../assets/images/logo.png";
import bgFleaMarket from "../../../../../assets/images/fleaMarketbg.jpg";

const HomeNavbar = () => {
  return (
    <Container
      maxWidth="false"
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay with opacity
          zIndex: 1,
          margin: 0,
        },
      }}
    >
      <Box>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative", zIndex: 2, height: "100%" }}
        >
          <Box display="flex">
            <img src={Logo} alt="Logo" />
          </Box>
        </Grid2>
      </Box>
    </Container>
  );
};

export default HomeNavbar;
