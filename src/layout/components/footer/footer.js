import React from "react";
import {
  Box,
  Container,
  Grid2,
  Typography,
  Divider,
  Link as MaterialLink,
  TextField,
  Button,
} from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const Footer = () => {
  const { translations } = useLanguage();
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #cc0000, #15a0db)",
        color: "#fff",
        paddingY: 6,
        marginTop: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid2 container spacing={4} justifyContent="space-between">
          {/* Logo & Socials */}
          <Grid2 item size={{ xs: 12, md: 3 }}>
            {/* Logo Section */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              {translations.FOOTER.TEXT}
            </Typography>
            <Box display="flex" gap={2} mt={2}>
              <MaterialLink href="#" color="inherit" underline="none">
                <FacebookIcon fontSize="large" />
              </MaterialLink>
              <MaterialLink href="#" color="inherit" underline="none">
                <InstagramIcon fontSize="large" />
              </MaterialLink>
              <MaterialLink href="#" color="inherit" underline="none">
                <TwitterIcon fontSize="large" />
              </MaterialLink>
              <MaterialLink href="#" color="inherit" underline="none">
                <YouTubeIcon fontSize="large" />
              </MaterialLink>
            </Box>
          </Grid2>

          {/* Quick Links */}
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              {translations.FOOTER.LINKS_TITLE}
            </Typography>
            <Box mt={3}>
              {[
                { label: `${translations.FOOTER.LINK1}`, path: "/about" },
                { label: `${translations.FOOTER.LINK2}`, path: "/faqs" },
                { label: `${translations.FOOTER.LINK3}`, path: "/terms" },
                { label: `${translations.FOOTER.LINK4}`, path: "/contact" },
              ].map((item) => (
                <Typography key={item.label} variant="body2" sx={{ mt: 1 }}>
                  <MaterialLink
                    component={Link}
                    to={item.path}
                    color="inherit"
                    underline="hover"
                  >
                    {item.label}
                  </MaterialLink>
                </Typography>
              ))}
            </Box>
          </Grid2>

          {/* Newsletter Subscription */}
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              {translations.FOOTER.SUBSC_TITLE}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              {translations.FOOTER.SUBSC_TEXT}
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              <TextField
                variant="outlined"
                size="small"
                placeholder={`${translations.FOOTER.TEXTFIELD}`}
                sx={{ bgcolor: "#fff", borderRadius: 1, flex: 1 }}
              />
              <Button variant="contained" color="primary">
                {translations.FOOTER.BUTTON}
              </Button>
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.5)" }} />

        {/* Copyright & Legal Info */}
        <Box textAlign="center">
          <Typography variant="body2" color="inherit">
            © 2025 FleaFind
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
