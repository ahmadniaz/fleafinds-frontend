import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../../../../assets/images/logo.png";

const HomeNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuLinks = ["Home", "About", "Contact"];

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
                      Owner Register/Login
                    </Button>
                  </ListItem>
                </List>
              </Drawer>
            </>
          ) : (
            /* Desktop Navigation Links */
            <Box display="flex" alignItems="center">
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeNavbar;
