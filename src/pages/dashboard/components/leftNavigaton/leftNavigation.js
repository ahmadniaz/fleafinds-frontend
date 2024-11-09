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
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const LeftNavigation = ({ activeForm, setActiveForm }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

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
        Dashboard
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
            FleaFind Dashboard
          </Typography>
          {/* Profile Icon for Small Screens */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
            }}
          >
            <PersonIcon />
          </IconButton>
          {/* Profile Button for Larger Screens */}

          <Button
            color="inherit"
            startIcon={<PersonIcon />}
            onClick={handleProfileMenuOpen}
            sx={{
              display: { xs: "none", sm: "none", md: "inline-flex" },
              fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" },
            }}
          >
            Profile
          </Button>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>

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
