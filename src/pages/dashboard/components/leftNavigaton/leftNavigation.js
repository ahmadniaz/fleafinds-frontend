import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Logo from "../../../../assets/images/logo.png";

const LeftNavigation = ({ activeForm, setActiveForm }) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        {/* Logo */}
        <Box display="flex">
          <img src={Logo} alt="Logo" width="200px" />
        </Box>
      </Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ margin: "20px 0", textAlign: "center" }}
      >
        Dashboard
      </Typography>

      {/* Navigation List */}
      <List>
        <ListItem
          button
          onClick={() => setActiveForm("home")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "home" ? "primary.main" : "",
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          onClick={() => setActiveForm("marketInfo")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "marketInfo" ? "primary.main" : "",
          }}
        >
          <ListItemText primary="Market Information" />
        </ListItem>
        <ListItem
          button
          onClick={() => setActiveForm("ownerInfo")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "ownerInfo" ? "primary.main" : "",
          }}
        >
          <ListItemText primary="Owner Information" />
        </ListItem>
      </List>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          href="#"
          sx={{ marginRight: "20px", fontWeight: "bold" }}
        >
          Visit Website
        </Button>
      </Box>
    </Box>
  );
};

export default LeftNavigation;
