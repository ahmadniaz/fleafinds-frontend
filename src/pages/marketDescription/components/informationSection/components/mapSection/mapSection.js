import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import styled from "@emotion/styled";

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

const MapSection = ({ marketData }) => {
  return (
    <Grid2 item size={{ xs: 12, md: 6 }}>
      <SectionCard>
        <CardContent>
          <HeaderTypography variant="h5">Location & Map</HeaderTypography>

          {/* Map Container */}
          <MapContainer
            center={[
              marketData?.location?.coordinates[1],
              marketData?.location?.coordinates[0],
            ]}
            zoom={15}
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[
                marketData?.location?.coordinates[1],
                marketData?.location?.coordinates[0],
              ]}
            >
              <Popup>{marketData?.location?.address}</Popup>
            </Marker>
          </MapContainer>

          {/* Address Section */}
          <Box mt={2} display="flex" alignItems="center">
            <LocationOnIcon sx={{ color: "primary.main", marginRight: 1 }} />
            <Box>
              <FieldLabel>Address</FieldLabel>
              <Typography>{marketData?.location?.address}</Typography>
            </Box>
          </Box>

          {/* Directions Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              href={`https://www.openstreetmap.org/directions?mlat=${marketData?.location?.coordinates[1]}&mlon=${marketData?.location?.coordinates[0]}#map=15/${marketData?.location?.coordinates[1]}/${marketData?.location?.coordinates[0]}`}
              target="_blank"
              startIcon={<DirectionsIcon />}
              sx={{
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Get Directions
            </Button>
          </Box>
        </CardContent>
      </SectionCard>
    </Grid2>
  );
};

export default MapSection;
