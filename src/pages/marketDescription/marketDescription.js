import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
  Rating,
  Fade,
  Modal,
  Chip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ReviewAndSocialMediaSection from "./reviewSection/reviewSection";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { HomeNav } from "../../layout/components/header/components";
import Image1 from "../../assets/images/helsinki.jpeg";
import Image2 from "../../assets/images/fleaMarketbg.jpg";
import Image3 from "../../assets/images/turku.jpeg";
import Image4 from "../../assets/images/vaasa.jpeg";
import Image5 from "../../assets/images/fleaMarketLogo.jpg";

// Styled components for elegance
const Container = styled(Box)({
  backgroundColor: "#f4f6f8",
  padding: "40px",
  minHeight: "100vh",
});

const SectionCard = styled(Card)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  marginBottom: "30px",
  overflow: "hidden",
});

const HeaderTypography = styled(Typography)({
  color: "#15a0db",
  fontWeight: "bold",
  textAlign: "center",
  paddingBottom: "20px",
  borderBottom: "2px solid #ff0000",
});

const FieldLabel = styled(Typography)({
  fontWeight: "bold",
  color: "#555",
});

// Make sure to set the default icon for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl; // Fix for marker icon not displaying
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MarketDescriptionPage = () => {
  const testMarketData = {
    marketName: "Finnish Flea Market",
    description:
      "A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies. A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies.A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies.",
    logo: Image2,
    location: {
      latitude: 60.1695,
      longitude: 24.9354,
      address: "123 Market Street, Helsinki, Finland",
    },
    rating: 4.1,
    reviewCount: 19,
    categories: ["Antiques", "Clothing", "Handmade Goods", "Art", "Furniture"],
    openingHours: "Saturdays and Sundays, 9 AM - 4 PM",
    priceList: "Spaces starting from €20 per day.",
    socialMedia: {
      facebook: "https://facebook.com/example",
      instagram: "https://instagram.com/example",
      twitter: "https://twitter.com/example",
    },
    images: [
      Image1,
      Image2,
      Image3,
      Image4,
      Image5,
      Image1,
      Image3,
      Image2,
      Image4,
      Image5,
    ],
    marketType: "Outdoor Flea Market",
    contact: {
      phone: "+358 123 4567",
      email: "info@finnishfleamarket.com",
      website: "https://finnishfleamarket.com",
    },
    faqs: [
      {
        question: "What are the opening hours?",
        answer: "Saturdays and Sundays, 9 AM - 4 PM.",
      },
      {
        question: "Is there parking available?",
        answer: "Yes, there is ample parking nearby.",
      },
    ],
    events: [
      {
        title: "Summer Festival",
        date: "August 5, 2024",
        description: "Join us for our annual summer festival!",
      },
    ],
    reviews: [
      {
        comment:
          "A wonderful flea market where products move quickly! Professional and cordial staff.",
        rating: 5,
        name: "Pirkko Salo",
        date: "24/09/2024",
      },

      {
        comment: "A wonderful experience! Professional staff.",
        rating: 4,
        name: "Hello Salo",
        date: "21/09/2024",
      },
    ],
  };

  const ratingsBreakdown = {
    5: 100,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // const [review, setReview] = useState({ name: "", rating: 0, comment: "" });
  const [reviews] = useState(testMarketData.reviews);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpenModal = (img) => {
    setSelectedImg(img);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImg(null);
  };

  // const handleReviewSubmit = () => {
  //   setReviews([...reviews, review]);
  //   setReview({ name: "", rating: 0, comment: "" });
  //   setDialogOpen(false);
  // };

  const reviewFormRef = useRef(null);

  // Function to scroll to the review form
  const scrollToReviewForm = () => {
    reviewFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HomeNav />

      <Container>
        {/* Title Section */}
        <SectionCard>
          <CardContent>
            <Grid2 container spacing={3}>
              <Grid2 item size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="Market Logo"
                    src={testMarketData.logo}
                    style={{
                      width: "200px",
                      border: "2px solid #15a0db",
                    }}
                  />
                </Box>
              </Grid2>

              <Grid2 item size={{ xs: 12, sm: 4 }}>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "#ff0000", fontWeight: "bold" }}
                  >
                    {testMarketData.marketName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1,
                    }}
                  >
                    <Rating
                      value={testMarketData.rating}
                      precision={0.1}
                      readOnly
                      sx={{ color: "#ff0000" }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginLeft: 1 }}
                    >
                      ({testMarketData.reviewCount} reviews)
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#15a0db", marginTop: 1 }}
                  >
                    {testMarketData.marketType}
                  </Typography>
                </Box>
              </Grid2>

              <Grid2 item size={{ xs: 12, sm: 4 }} alignSelf="center">
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  mt={2}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                    onClick={() => scrollToReviewForm()}
                    startIcon={<RateReviewIcon />}
                  >
                    Add a Review
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          </CardContent>
        </SectionCard>

        {/* Information Sections */}
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionCard>
              <CardContent>
                <HeaderTypography variant="h5">Market Details</HeaderTypography>

                <Box
                  mb={2}
                  mt={3}
                  sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "12px",
                    borderRadius: "4px",
                  }}
                >
                  <FieldLabel>Description</FieldLabel>
                  <Typography
                    sx={{ lineHeight: "1.6", fontSize: "1rem", color: "#555" }}
                  >
                    {testMarketData.description}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <FieldLabel>Categories</FieldLabel>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}
                  >
                    {testMarketData.categories.map((category, index) => (
                      <Chip
                        key={index}
                        label={category}
                        size="small"
                        sx={{ backgroundColor: "#ff0000", color: "#fff" }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                    mt: 2,
                  }}
                >
                  <FieldLabel display="flex">
                    <AccessTimeIcon /> Opening Hours
                  </FieldLabel>
                  <Typography mt={1}>{testMarketData.openingHours}</Typography>
                </Box>

                <Box mt={2}>
                  <FieldLabel>Price List</FieldLabel>
                  <Typography>{testMarketData.priceList}</Typography>
                </Box>

                <Box mt={2}>
                  <FieldLabel display="flex">
                    <EventIcon /> Events
                  </FieldLabel>
                  {testMarketData.events.map((event, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        padding: "10px",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        mt: 1,
                      }}
                    >
                      <Typography fontWeight="bold">{event.title}</Typography>
                      <Typography>{event.date}</Typography>
                      <Typography>{event.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </SectionCard>
          </Grid2>

          {/* Location Information Section */}
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionCard>
              <CardContent>
                <HeaderTypography variant="h5">Location & Map</HeaderTypography>

                <MapContainer
                  center={[
                    testMarketData.location.latitude,
                    testMarketData.location.longitude,
                  ]}
                  zoom={15}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      testMarketData.location.latitude,
                      testMarketData.location.longitude,
                    ]}
                  >
                    <Popup>{testMarketData.location.address}</Popup>
                  </Marker>
                </MapContainer>

                <Box mt={2}>
                  <FieldLabel>Address</FieldLabel>
                  <Typography>{testMarketData.location.address}</Typography>
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`https://www.openstreetmap.org/directions?mlat=${testMarketData.location.latitude}&mlon=${testMarketData.location.longitude}#map=15/${testMarketData.location.latitude}/${testMarketData.location.longitude}`}
                    target="_blank"
                  >
                    Get Directions
                  </Button>
                </Box>
              </CardContent>
            </SectionCard>
          </Grid2>
        </Grid2>

        {/* Image Gallery Section */}
        <>
          <Card>
            <CardContent>
              <HeaderTypography variant="h5">Gallery</HeaderTypography>
              <Grid2 container spacing={2} p={2}>
                {testMarketData.images.map((img, index) => (
                  <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Box position="relative">
                      <Box
                        component="img"
                        src={img}
                        loading="lazy"
                        sx={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                          cursor: "pointer",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)", // Scale effect on hover
                          },
                        }}
                        alt={`Market Image ${index + 1}`}
                      />

                      {/* Overlay with Eye Icon */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          bgcolor: "rgba(0, 0, 0, 0.6)", // Dark overlay
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "&:hover": {
                            opacity: 1, // Show overlay on hover
                          },
                        }}
                      >
                        <IconButton onClick={() => handleOpenModal(img)}>
                          <VisibilityIcon
                            sx={{ fontSize: 40, color: "white" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </CardContent>
          </Card>

          {/* Modal for Previewing Images */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Box
                  component="img"
                  src={selectedImg}
                  sx={{
                    width: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                  alt="Selected Image"
                />
              </Box>
            </Fade>
          </Modal>
        </>

        {/* Reviews Section */}

        <ReviewAndSocialMediaSection
          secRef={reviewFormRef}
          reviews={reviews}
          totalReviews={44}
          ratingsBreakdown={ratingsBreakdown}
          testMarketData={testMarketData}
        />
      </Container>
    </>
  );
};

export default MarketDescriptionPage;
