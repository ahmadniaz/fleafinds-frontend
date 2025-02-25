import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  useMediaQuery,
  Divider,
  Grid2,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumbs/breadCrumbs";
import { MarketCard } from "../../../../components";
import axios from "axios";

const HomeSection = ({ setActiveForm, setUpdateMarket }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const token = localStorage.getItem("token"); // Get token from storage
  const [ownerMarkets, setOwnerMarkets] = useState([]);

  useEffect(() => {
    getOwnerMarkets();
    setUpdateMarket(null);
  }, []);

  const getOwnerMarkets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/market/owner",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is passed correctly
          },
        }
      );
      setOwnerMarkets(response?.data?.markets);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const handleUpdateIconClick = (market) => {
    console.log(market, "MARKET");
    setUpdateMarket(market);
    setActiveForm("marketInfo");
  };

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
      {/* Add Flea Market Card */}
      <Card
        sx={{
          width: "300px",
          height: "224px",
          display: "flex",
          mt: 2,
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
      <Divider sx={{ my: 1 }} /> {/* Divider under the logo */}
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
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Grid2 container spacing={4} mt={3}>
          {ownerMarkets?.length > 0 &&
            ownerMarkets?.map((market) => (
              <MarketCard
                key={market?._id}
                market={market}
                handleUpdateIconClick={handleUpdateIconClick}
              />
            ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default HomeSection;
