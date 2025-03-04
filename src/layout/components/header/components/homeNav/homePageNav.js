import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../../../components/breadcrumbs/breadCrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language"; // Language icon
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLanguage } from "../../../../../context/LanguageContext";

import Logo from "../../../../../assets/images/logo.png";

const HomeNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const location = useLocation();
  const { translations, changeLanguage } = useLanguage();

  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuLinks = [
    { name: `${translations.NAVBAR.MARKETS}`, link: "markets" },
    {
      name: `${translations.NAVBAR.ABOUT}`,
      link: "about",
    },
    {
      name: `${translations.NAVBAR.CONTACT}`,
      link: "contact",
    },
  ];

  useEffect(() => {
    let lastScroll = window.pageYOffset;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      // Check if user is scrolling down or up
      if (currentScroll > lastScroll) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up - show navbar
        setShowNavbar(true);
      }
      lastScroll = currentScroll;
    };

    // Attach the event listener only in desktop mode
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("name");
    window.location.href = "/"; // Redirect to home
  };
  // Handle Language Change

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "top 0.3s",
        top: showNavbar ? 0 : "-100px", // Adjust hiding position
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: 1,
          }}
        >
          {/* Logo Section */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={Logo} alt="Logo" style={{ width: "150px" }} />
            <Typography
              variant="subtitle1"
              sx={{
                ml: 1,
                color: "#ff0000",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {translations.GENERAL_TEXT.FLEA_MARKETS_FINDER}
            </Typography>
          </Link>

          {isMobile ? (
            <>
              {/* Mobile Menu Icon */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ color: "#15a0db" }} />
              </IconButton>
              {/* Mobile Drawer */}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <List sx={{ width: 250 }}>
                  <ListItem
                    button
                    onClick={handleDrawerToggle}
                    component={Link}
                    to={"/"}
                  >
                    <ListItemText
                      primary={`${translations.NAVBAR.HOME}`}
                      sx={{ color: "#15a0db", fontWeight: 600 }}
                    />
                  </ListItem>
                  {menuLinks.map((text) => (
                    <ListItem
                      button
                      key={text.name}
                      onClick={handleDrawerToggle}
                      component={Link}
                      to={`/${text.link.toLowerCase()}`}
                    >
                      <ListItemText
                        primary={text.name}
                        sx={{ color: "#15a0db", fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                  {/* Language Switcher */}
                  <IconButton
                    color="inherit"
                    sx={{ marginRight: 2 }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <LanguageIcon sx={{ color: "#15a0db" }} />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        changeLanguage("ENU");
                        setAnchorEl(null);
                      }}
                    >
                      🇬🇧 English
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        changeLanguage("FIN");
                        setAnchorEl(null);
                      }}
                    >
                      🇫🇮 Finnish
                    </MenuItem>
                  </Menu>
                  <ListItem button onClick={handleDrawerToggle}>
                    {isAuthenticated ? (
                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#15a0db",
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: 2,
                            width: "100%",
                            boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                            "&:hover": {
                              backgroundColor: "#ff0000",
                              boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                            },
                          }}
                          component={Link}
                          to="/dashboard"
                        >
                          {translations.NAVBAR.OWNER_DASHBOARD}
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#15a0db",
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: 2,
                            marginTop: "10px",
                            width: "100%",
                            boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                            "&:hover": {
                              backgroundColor: "#ff0000",
                              boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                            },
                          }}
                          component={Link}
                          to="/auth"
                        >
                          {translations.NAVBAR.LOGOUT}
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#15a0db",
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: 2,
                            width: "100%",
                            boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                            "&:hover": {
                              backgroundColor: "#ff0000",
                              boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                            },
                          }}
                          component={Link}
                          to="/auth"
                        >
                          {translations.NAVBAR.LOGIN}
                        </Button>

                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#15a0db",
                            marginTop: "10px",
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: 2,
                            width: "100%",
                            boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                            "&:hover": {
                              backgroundColor: "#ff0000",
                              boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                            },
                          }}
                          component={Link}
                          to="/auth"
                        >
                          {translations.NAVBAR.REGISTER}
                        </Button>
                      </Box>
                    )}
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            /* Desktop Navigation Links */
            <Box display="flex" alignItems="center">
              <Link
                to={`/`}
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
                {translations.NAVBAR.HOME}
              </Link>
              {menuLinks.map((text) => (
                <Link
                  key={text.name}
                  to={`/${text.link.toLowerCase()}`}
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
                  {text.name}
                </Link>
              ))}

              {/* Language Switcher */}
              <IconButton
                color="inherit"
                sx={{ marginRight: 2 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <LanguageIcon sx={{ color: "#15a0db" }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    changeLanguage("ENU");
                    setAnchorEl(null);
                  }}
                >
                  🇬🇧 English
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    changeLanguage("FIN");
                    setAnchorEl(null);
                  }}
                >
                  🇫🇮 Finnish
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    changeLanguage("SWE");
                    setAnchorEl(null);
                  }}
                >
                  🇫🇮 Swedish
                </MenuItem>
              </Menu>
              {isAuthenticated ? (
                <Box display="flex">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#15a0db",
                      color: "#fff",
                      padding: "8px 20px",
                      fontSize: "1rem",
                      borderRadius: 2,
                      width: "100%",
                      boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                      "&:hover": {
                        backgroundColor: "#15a0db",
                        boxShadow: "0 4px 8px rgba(21, 160, 219, 0.4)",
                      },
                    }}
                    component={Link}
                    to="/dashboard"
                  >
                    {translations.NAVBAR.OWNER_DASHBOARD}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#d32f2f",
                      padding: "8px 20px",
                      color: "#fff",
                      marginLeft: "10px",
                      fontSize: "1rem",
                      borderRadius: 2,
                      // width: "100%",
                      boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                      "&:hover": {
                        backgroundColor: "#ff0000",
                        boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                      },
                    }}
                    component={Link}
                    onClick={handleLogout}
                  >
                    {translations.NAVBAR.LOGOUT}
                  </Button>
                </Box>
              ) : (
                <Box display="flex">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#15a0db",
                      color: "#fff",
                      padding: "8px 20px",
                      fontSize: "1rem",
                      borderRadius: 2,
                      width: "100%",
                      boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                      "&:hover": {
                        backgroundColor: "#15a0db",
                        boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                      },
                    }}
                    component={Link}
                    to="/auth"
                  >
                    {translations.NAVBAR.LOGIN}
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#15a0db",
                      color: "#fff",
                      padding: "8px 20px",
                      marginLeft: "10px",
                      fontSize: "1rem",
                      borderRadius: 2,
                      width: "100%",
                      boxShadow: "0 3px 5px rgba(21, 160, 219, 0.4)",
                      "&:hover": {
                        backgroundColor: "#15a0db",
                        boxShadow: "0 4px 8px rgba(255, 0, 0, 0.4)",
                      },
                    }}
                    component={Link}
                    to="/auth"
                  >
                    {translations.NAVBAR.REGISTER}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>

        {/* Divider and Breadcrumb */}
        {location.pathname !== "/" && (
          <>
            <Divider sx={{ my: 1 }} /> {/* Divider under the logo */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingY: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Breadcrumb />
            </Box>
            <Divider sx={{ my: 1 }} /> {/* Divider under the breadcrumb */}
          </>
        )}
      </Container>
    </AppBar>
  );
};

export default HomeNavbar;
