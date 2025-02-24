import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const CompanyContactInfo = ({ marketData }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <CardContent>
        {/* Follow Us Section */}
        <Grid2 container spacing={2}>
          <Grid2 item size={{ xs: 12, md: 12, sm: 6, lg: 12 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#ff0000",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: {
                  xs: "center",
                  sm: "left",
                  md: "left",
                  lg: "left",
                },
              }}
            >
              Follow Us
            </Typography>
            <Grid2
              container
              direction={{ xs: "row", sm: "column", md: "column" }}
              justifyContent={"center"}
              alignItems="baseline"
              spacing={2}
            >
              {marketData?.socialMedia?.facebook && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#3b5998",
                    color: "#3b5998",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#3b5998",
                      color: "#fff",
                    },
                  }}
                  href={marketData?.socialMedia?.facebook}
                  target="_blank"
                  startIcon={<FacebookIcon />}
                >
                  Facebook
                </Button>
              )}
              {marketData?.socialMedia?.instagram && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#E4405F",
                    color: "#E4405F",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#E4405F",
                      color: "#fff",
                    },
                  }}
                  href={marketData?.socialMedia?.instagram}
                  target="_blank"
                  startIcon={<InstagramIcon />}
                >
                  Instagram
                </Button>
              )}
              {/* {marketData.socialMedia.twitter && (
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#1DA1F2",
                          color: "#1DA1F2",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#1DA1F2",
                            color: "#fff",
                          },
                        }}
                        href={marketData.socialMedia.twitter}
                        target="_blank"
                        startIcon={<TwitterIcon />}
                      >
                        Twitter
                      </Button>
                    )} */}
            </Grid2>
          </Grid2>

          {/* Contact Us Section */}
          <Grid2 item size={{ xs: 12, md: 12, sm: 6, lg: 12 }} mt={{ md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#ff0000",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: {
                  xs: "center",
                  sm: "left",
                  md: "left",
                  lg: "left",
                },
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
              }}
            >
              Contact Us
            </Typography>

            <Grid2
              container
              direction="column"
              alignItems="baseline"
              spacing={2}
              sx={{ paddingX: { xs: 1, sm: 2, md: 0 } }} // Responsive padding for smaller screens
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                  +358 123 4567
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                  info@finnishfleamarket.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LanguageIcon sx={{ color: "#15a0db", marginRight: "8px" }} />
                <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                  <Link href="https://finnishfleamarket.com" target="_blank">
                    finnishfleamarket.com
                  </Link>
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Divider */}
        <Divider sx={{ marginY: "20px" }} />
        {/* Report Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            target="_blank"
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
