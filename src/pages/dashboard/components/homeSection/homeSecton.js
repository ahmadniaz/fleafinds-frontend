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
import { MarketCard, SkeletonLoader } from "../../../../components";
import axios from "axios";

const HomeSection = ({ setActiveForm, setUpdateMarket }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");
  const [ownerMarkets, setOwnerMarkets] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    getOwnerMarkets();
    setUpdateMarket(null);
  }, []);

  const getOwnerMarkets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/market/owner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      setOwnerMarkets(response?.data?.markets);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  const handleUpdateIconClick = (market) => {
    setUpdateMarket(market);
    setActiveForm("marketInfo");
  };

  const handleDeleteIconClick = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/market/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getOwnerMarkets();
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  return (
    <Box
      sx={{
        marginLeft: isSmallScreen ? 0 : "250px",
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
          <Divider sx={{ my: 1 }} />
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
      <Divider sx={{ my: 1 }} />

      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        mt={isSmallScreen ? 5 : 0}
        textAlign={isSmallScreen ? "center" : ""}
      >
        Your Flea Markets
      </Typography>

      {/* Loading Skeleton */}
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <Box sx={{ gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <Grid2 container spacing={4} mt={3}>
            {ownerMarkets?.length > 0 &&
              ownerMarkets?.map((market) => (
                <MarketCard
                  key={market?._id}
                  market={market}
                  handleUpdateIconClick={handleUpdateIconClick}
                  handleDeleteIconClick={handleDeleteIconClick}
                />
              ))}
          </Grid2>
        </Box>
      )}
    </Box>
  );
};

export default HomeSection;
