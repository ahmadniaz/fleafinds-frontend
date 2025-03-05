import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { HomeNav } from "../../layout/components/header/components";
import { useSnackbar } from "../../components/snackbar/customSnackBar";
import { useLocation } from "react-router-dom";
import {
  TitleSection,
  InfoSection,
  GallerySection,
  ReviewSection,
} from "./components";
import { LoadingFallback } from "../../components";
import axios from "axios";
import Footer from "../../layout/components/footer/footer";
import { useLanguage } from "../../context/LanguageContext";

// Styled components for elegance
const Container = styled(Box)({
  backgroundColor: "#f4f6f8",
  padding: { xs: "0px", sm: "0px", md: "40px" },
  minHeight: "100vh",
});

const MarketDescriptionPage = () => {
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const [marketData, setMarketData] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const { translations } = useLanguage();

  useEffect(() => {
    getAllEvents();
    if (marketData) {
      const filteredEvents = allEvents?.filter((event) =>
        event.markets.includes(marketData._id)
      );
      setRelatedEvents(filteredEvents);
    }
  }, [marketData]);

  const getAllEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/event`
      );
      setAllEvents(response?.data?.events);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setLoading(false);
    }
  };

  const getAllReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/review/${location?.state?.marketData?._id}`
      );
      setAllReviews(response?.data?.reviews);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  useEffect(() => {
    if (location.state && location.state.marketData) {
      setMarketData(location.state.marketData);
    }
    getAllReviews();
  }, []);

  const submitReview = async (values) => {
    setLoading(true);
    try {
      const marketId = marketData?._id;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/review`,
        {
          marketId,
          ...values,
        }
      );

      if (response?.statusText === "Created" || response?.status === 201) {
        showSnackbar(`${translations.SNACKBARS.REVIEW_SUBMITTED}`, "success");
        getAllReviews();
      }
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data || error.message
      );
      showSnackbar(`${translations.SNACKBARS.REVIEW_SUBMIT_ERROR}`, "success");
      showSnackbar(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const reviewFormRef = useRef(null);

  return (
    <>
      {!marketData ? (
        <LoadingFallback />
      ) : (
        <>
          <HomeNav />
          <Container>
            {/* Title Section */}
            <TitleSection
              marketData={marketData}
              reviewFormRef={reviewFormRef}
              allReviews={allReviews}
            />
            {/* Information Sections */}
            <InfoSection marketData={marketData} />
            {/* Image Gallery Section */}
            <GallerySection marketData={marketData} />

            {/* Reviews Section */}
            <ReviewSection
              secRef={reviewFormRef}
              reviews={allReviews}
              setAllReviews={setAllReviews}
              marketData={marketData}
              submitReview={submitReview}
              loading={loading}
              relatedEvents={relatedEvents}
            />
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default MarketDescriptionPage;
