import React from "react";
import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

const MapContainer = styled(Box)({
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
});

const MarketDescriptionPage = () =>
  // {
  //   marketName,
  //   description,
  //   location,
  //   categories,
  //   openingHours,
  //   priceList,
  //   socialMedia,
  //   images,
  //   marketType,
  // }
  {
    const testMarketData = {
      marketName: "Finnish Flea Market",
      description:
        "A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies.",
      location: {
        latitude: 60.1695, // Replace with actual latitude
        longitude: 24.9354, // Replace with actual longitude
        address: "123 Market Street, Helsinki, Finland",
      },
      categories: [
        "Antiques",
        "Clothing",
        "Handmade Goods",
        "Art",
        "Furniture",
      ],
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
        // Add more image URLs as needed
      ],
      marketType: "Outdoor Flea Market",
    };

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    });

    return (
      <Container>
        {/* Title Section */}
        <SectionCard>
          <CardContent>
            <Typography
              variant="h4"
              sx={{ color: "#ff0000", textAlign: "center" }}
            >
              {testMarketData.marketName}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: "#15a0db" }}
            >
              {testMarketData.marketType}
            </Typography>
          </CardContent>
        </SectionCard>

        {/* Information Sections */}
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionCard>
              <CardContent>
                <HeaderTypography variant="h5">Market Details</HeaderTypography>

                {/* Description */}
                <Box mb={2}>
                  <FieldLabel>Description</FieldLabel>
                  <Typography>{testMarketData.description}</Typography>
                </Box>

                {/* Categories */}
                <Box mb={2}>
                  <FieldLabel>Categories</FieldLabel>
                  <Typography>
                    {testMarketData.categories.join(", ")}
                  </Typography>
                </Box>

                {/* Opening Hours */}
                <Box mb={2}>
                  <FieldLabel>Opening Hours</FieldLabel>
                  <Typography>{testMarketData.openingHours}</Typography>
                </Box>

                {/* Price List */}
                <Box mb={2}>
                  <FieldLabel>Price List</FieldLabel>
                  <Typography>{testMarketData.priceList}</Typography>
                </Box>
              </CardContent>
            </SectionCard>
          </Grid2>

          <Grid2 item size={{ xs: 12, md: 6 }}>
            <SectionCard>
              <CardContent>
                <HeaderTypography variant="h5">Location & Map</HeaderTypography>

                {/* Google Map */}
                {isLoaded ? (
                  <MapContainer>
                    <GoogleMap
                      center={{
                        lat: testMarketData.location.latitude,
                        lng: testMarketData.location.longitude,
                      }}
                      zoom={15}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                      <Marker
                        position={{
                          lat: testMarketData.location.latitude,
                          lng: testMarketData.location.longitude,
                        }}
                      />
                    </GoogleMap>
                  </MapContainer>
                ) : (
                  <Typography>Loading Map...</Typography>
                )}

                {/* Address */}
                <Box mt={2}>
                  <FieldLabel>Address</FieldLabel>
                  <Typography>{testMarketData.location.address}</Typography>
                </Box>
              </CardContent>
            </SectionCard>
          </Grid2>
        </Grid2>

        {/* Image Gallery Section */}
        <SectionCard>
          <CardContent>
            <HeaderTypography variant="h5">Gallery</HeaderTypography>
            <Grid2 container spacing={2}>
              {testMarketData.images.map((img, index) => (
                <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Box
                    component="img"
                    src={img}
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    }}
                    alt={`Market Image ${index + 1}`}
                  />
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </SectionCard>

        {/* Social Media Links */}
        <SectionCard>
          <CardContent>
            <HeaderTypography variant="h5">Follow Us</HeaderTypography>
            <Grid2 container justifyContent="center" spacing={2}>
              {testMarketData.socialMedia.facebook && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#3b5998",
                    color: "#3b5998",
                    "&:hover": { backgroundColor: "#3b5998", color: "#fff" },
                  }}
                  href={testMarketData.socialMedia.facebook}
                  target="_blank"
                >
                  Facebook
                </Button>
              )}
              {testMarketData.socialMedia.instagram && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#E4405F",
                    color: "#E4405F",
                    "&:hover": { backgroundColor: "#E4405F", color: "#fff" },
                  }}
                  href={testMarketData.socialMedia.instagram}
                  target="_blank"
                >
                  Instagram
                </Button>
              )}
              {testMarketData.socialMedia.twitter && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#1DA1F2",
                    color: "#1DA1F2",
                    "&:hover": { backgroundColor: "#1DA1F2", color: "#fff" },
                  }}
                  href={testMarketData.socialMedia.twitter}
                  target="_blank"
                >
                  Twitter
                </Button>
              )}
            </Grid2>
          </CardContent>
        </SectionCard>
      </Container>
    );
  };

export default MarketDescriptionPage;
