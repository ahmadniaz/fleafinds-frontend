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
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../../../../components/breadcrumbs/breadCrumbs";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../../../../assets/images/logo.png";

const HomeNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuLinks = ["About", "Contact"];

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
              Flea Markets Finder
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
                      primary="Home"
                      sx={{ color: "#15a0db", fontWeight: 600 }}
                    />
                  </ListItem>
                  {menuLinks.map((text) => (
                    <ListItem
                      button
                      key={text}
                      onClick={handleDrawerToggle}
                      component={Link}
                      to={`/${text.toLowerCase()}`}
                    >
                      <ListItemText
                        primary={text}
                        sx={{ color: "#15a0db", fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                  <ListItem button onClick={handleDrawerToggle}>
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
                      Owner Dashboard
                    </Button>
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
                Home
              </Link>
              {menuLinks.map((text) => (
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
                  Owner Dashboard
                </Button>
              </Link>
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
