import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import RelatedEventsSection from "../../relatedEvents/relatedEvents";

const CompanyContactInfo = ({ marketData, relatedEvents }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <CardContent>
        {/* Social Media Section */}
        <Typography
          variant="h5"
          sx={{
            color: "#ff0000",
            fontWeight: "bold",
            mb: 2,
            textAlign: "left",
          }}
        >
          Follow Us
        </Typography>
        <Grid2
          container
          spacing={1}
          justifyContent="flex-start"
          alignItems="center"
        >
          {marketData?.socialMedia?.facebook ? (
            <IconButton
              href={marketData?.socialMedia?.facebook}
              target="_blank"
              sx={{
                color: "#3b5998",
                "&:hover": { backgroundColor: "#3b5998", color: "#fff" },
              }}
            >
              <FacebookIcon fontSize="large" />
            </IconButton>
          ) : null}
          {marketData?.socialMedia?.instagram ? (
            <IconButton
              href={marketData?.socialMedia?.instagram}
              target="_blank"
              sx={{
                color: "#E4405F",
                "&:hover": { backgroundColor: "#E4405F", color: "#fff" },
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          ) : null}
          {marketData?.socialMedia?.twitter ? (
            <IconButton
              href={marketData?.socialMedia?.twitter}
              target="_blank"
              sx={{
                color: "#1DA1F2",
                "&:hover": { backgroundColor: "#1DA1F2", color: "#fff" },
              }}
            >
              <TwitterIcon fontSize="large" />
            </IconButton>
          ) : null}
        </Grid2>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Contact Section */}
        <Typography
          variant="h5"
          sx={{
            color: "#ff0000",
            fontWeight: "bold",
            mb: 2,
            textAlign: "left",
          }}
        >
          Contact Us
        </Typography>

        <Grid2 container direction="column" alignItems="flex-start" spacing={1}>
          {/* Phone */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon sx={{ color: "#15a0db" }} />
            <Typography variant="body1">
              <Link
                to={`tel:${marketData?.marketNumber}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {marketData?.marketNumber || "No Data Provided"}
              </Link>
            </Typography>
          </Box>

          {/* Email */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailIcon sx={{ color: "#15a0db" }} />
            <Typography variant="body1">
              <Link
                to={`mailto:${marketData?.marketEmail}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {marketData?.marketEmail || "No Data Provided"}
              </Link>
            </Typography>
          </Box>

          {/* Website */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageIcon sx={{ color: "#15a0db" }} />
            <Typography variant="body1">
              <Link
                to={marketData?.marketWebsite || "#"}
                target="_blank"
                style={{ textDecoration: "none", color: "#15a0db" }}
              >
                {marketData?.marketWebsite || "No Data Provided"}
              </Link>
            </Typography>
          </Box>
        </Grid2>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Related Events */}
        <RelatedEventsSection
          relatedEvents={relatedEvents}
          marketData={marketData}
        />

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Report Button */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<ReportProblemIcon />}
          >
            Report this Flea Market
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyContactInfo;
