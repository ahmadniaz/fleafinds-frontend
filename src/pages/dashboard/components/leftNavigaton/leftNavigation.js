import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../context/LanguageContext";

const LeftNavigation = ({ activeForm, setActiveForm }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { translations } = useLanguage();

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        mt: 6,
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={Logo}
          alt="Logo"
          width="200px"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          margin: "20px 0",
          textAlign: "center",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        {translations.DASHBOARD.DASHBOARD}
      </Typography>

      <List>
        <ListItem
          button
          onClick={() => setActiveForm("home")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "home" ? "primary.main" : "",
          }}
        >
          <ListItemText primary={`${translations.DASHBOARD.HOME}`} />
        </ListItem>

        <ListItem
          button
          onClick={() => setActiveForm("marketInfo")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "marketInfo" ? "primary.main" : "",
          }}
        >
          <ListItemText primary={`${translations.DASHBOARD.MARKET_INFO}`} />
        </ListItem>

        <ListItem
          button
          onClick={() => setActiveForm("ownerInfo")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "ownerInfo" ? "primary.main" : "",
          }}
        >
          <ListItemText primary={`${translations.DASHBOARD.OWNER_INFO}`} />
        </ListItem>

        <ListItem
          button
          onClick={() => setActiveForm("events")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeForm === "events" ? "primary.main" : "",
          }}
        >
          <ListItemText primary={`${translations.DASHBOARD.CREATE_EVENT_SHORT}`} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      {/* AppBar for Mobile View */}
      <AppBar
        position="fixed"
        sx={{
          display: { md: "none" },
          zIndex: 1201, // Ensure the AppBar is above other content
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {translations.DASHBOARD.FLEAFIND_DASHBOARD}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile (xs and sm) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Sidebar for Desktop (md and up) */}
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          width: 250,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#f5f5f5",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        {drawerContent}
      </Box>
    </Box>
  );
};

export default LeftNavigation;
