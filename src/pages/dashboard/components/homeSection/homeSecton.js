import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Divider,
  Grid2,
  Pagination,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumbs/breadCrumbs";
import { MarketCard, EventCard, SkeletonLoader } from "../../../../components";
import CreateActionCard from "./component/createActionCard";
import axios from "axios";
import { useLanguage } from "../../../../context/LanguageContext";
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";

const HomeSection = ({
  setActiveForm,
  setUpdateMarket,
  setUpdateEvent,
  setOwnerAllMarkets,
}) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");
  const [ownerMarkets, setOwnerMarkets] = useState([]);
  const [ownerEvents, setOwnerEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketPage, setMarketPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const itemsPerPage = 6;
  const { translations } = useLanguage();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    getOwnerMarkets();
    getOwnerEvents();
    setUpdateMarket(null);
    setUpdateEvent(null);
  }, []);

  const getOwnerMarkets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/market/owner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOwnerMarkets(response?.data?.markets);
      setOwnerAllMarkets(response?.data?.markets);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false);
    }
  };

  const getOwnerEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/event/owner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOwnerEvents(response?.data?.events);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMarket = (market) => {
    setUpdateMarket(market);
    setActiveForm("marketInfo");
  };

  const handleDeleteIconClick = async (marketId) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/market/${marketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (resp.status === 200) {
        showSnackbar("Market Deleted Successfully", "success");
        getOwnerMarkets();
      }
    } catch (error) {
      console.log(error, "ERROR");
      showSnackbar("Unable to Delete Market. Please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = (event) => {
    setUpdateEvent(event);
    setActiveForm("events");
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

      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <CreateActionCard
            text={`${translations.DASHBOARD.ADD_MARKET}`}
            onClick={() => setActiveForm("marketInfo")}
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <CreateActionCard
            text={`${translations.DASHBOARD.CREATE_EVENT}`}
            onClick={() => setActiveForm("events")}
          />
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 1 }} />

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        mt={isSmallScreen ? 5 : 0}
        textAlign={isSmallScreen ? "center" : ""}
      >
        {translations.DASHBOARD.YOUR_MARKETS}
      </Typography>

      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <Grid2 container spacing={4}>
          {ownerMarkets && ownerMarkets?.length > 0 ? (
            ownerMarkets
              .slice((marketPage - 1) * itemsPerPage, marketPage * itemsPerPage)
              .map((market) => (
                <MarketCard
                  key={market._id}
                  market={market}
                  handleUpdateIconClick={handleUpdateMarket}
                  handleDeleteIconClick={handleDeleteIconClick}
                />
              ))
          ) : (
            <Typography variant="body1" color="secondary.main">
              {translations.DASHBOARD.NO_MARKETS}
            </Typography>
          )}
        </Grid2>
      )}
      <Pagination
        count={Math.ceil(ownerMarkets.length / itemsPerPage)}
        page={marketPage}
        onChange={(e, value) => setMarketPage(value)}
        sx={{ mt: 2, alignSelf: "center" }}
      />

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        mt={5}
        textAlign={isSmallScreen ? "center" : ""}
      >
        {translations.DASHBOARD.YOUR_EVENTS}
      </Typography>

      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <Grid2 container spacing={4}>
          {ownerEvents && ownerEvents?.length > 0 ? (
            ownerEvents
              .slice((eventPage - 1) * itemsPerPage, eventPage * itemsPerPage)
              .map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  handleUpdateIconClick={handleUpdateEvent}
                />
              ))
          ) : (
            <Typography variant="body1" color="secondary.main">
              {translations.DASHBOARD.NO_EVENTS}
            </Typography>
          )}
        </Grid2>
      )}
      <Pagination
        count={Math.ceil(ownerEvents.length / itemsPerPage)}
        page={eventPage}
        onChange={(e, value) => setEventPage(value)}
        sx={{ mt: 2, alignSelf: "center" }}
      />
    </Box>
  );
};

export default HomeSection;
