import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import fleaMarket from "../../../../assets/images/fleaMarketLogo.jpg";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumbs/breadCrumbs";

const HomeSection = ({ setActiveForm }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const fleaMarkets = [
    {
      id: 1,
      name: "My Flea Market 1",
      location: "Turku",
      imageUrl: fleaMarket,
    },
    {
      id: 2,
      name: "My Flea Market 2",
      location: "Oulu",
      imageUrl: fleaMarket,
    },
    {
      id: 3,
      name: "My Flea Market 3",
      location: "Tampere",
      imageUrl: fleaMarket,
    },
    {
      id: 4,
      name: "My Flea Market 4",
      location: "Tampere",
      imageUrl: fleaMarket,
    },
  ];

  return (
    <Box
      sx={{
        marginLeft: isSmallScreen ? 0 : "250px", // Removes margin on smaller screens
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Breadcrumb */}
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

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        mt={isSmallScreen ? 5 : 0}
        textAlign={isSmallScreen ? "center" : ""}
      >
        Your Flea Markets
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {fleaMarkets.map((market) => (
          <Card
            key={market.id}
            sx={{
              width: "300px",
              position: "relative",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
              "&:hover .actionButtons": {
                display: "flex",
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={market.imageUrl}
              alt={market.name}
              sx={{
                objectFit: "contain",
                objectPosition: "top",
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {market.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {market.location}
              </Typography>
            </CardContent>
            <Box
              className="actionButtons"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "none",
                flexDirection: "column",
                padding: "10px",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "0 8px 0 8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <IconButton
                sx={{ marginBottom: "5px" }}
                onClick={() => console.log("Edit", market.id)}
              >
                <Edit fontSize="small" />
              </IconButton>

              <IconButton
                sx={{ marginBottom: "5px" }}
                onClick={() => window.open(market.websiteUrl, "_blank")}
              >
                <Visibility fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => console.log("Delete", market.id)}
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        ))}
        {/* Add Flea Market Card */}
        <Card
          sx={{
            width: "300px",
            height: "224px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => setActiveForm("marketInfo")}
        >
          <Typography variant="h6" fontWeight="bold">
            + Add New Flea Market
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default HomeSection;
