import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Modal,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { haversineDistance } from "../../../../utils/nearbyDistance";
import { createSlug } from "../../../../utils/slug";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import locatMarker from "../../../../assets/images/locatMarker.png";
import { useLanguage } from "../../../../context/LanguageContext";

// Custom styles for the modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  maxHeight: "100vh", // Maximum height for the modal
  overflowY: "auto", // Enable vertical scrolling
};

// Setting default icons for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Create a red icon for the user marker
const customIcon = new L.Icon({
  iconUrl: locatMarker,
  iconRetinaUrl: locatMarker,
  iconSize: [25, 41], // Adjust size as needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const NearbyMarketsModal = ({ open, handleClose, markets }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [radius, setRadius] = useState(5); // Default radius
  const [nearbyMarkets, setNearbyMarkets] = useState([]);
  const [noMarketsFound, setNoMarketsFound] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const { translations, changeLanguage } = useLanguage();

  // Function to reset the state values
  const resetValues = () => {
    setUserLocation(null);
    setLoadingLocation(false);
    setRadius(5);
    setNearbyMarkets([]);
    setNoMarketsFound(false);
  };

  // Function to fetch address from latitude and longitude
  const fetchAddress = async (lat, long) => {
    try {
      await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleGetLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        setUserLocation(location);
        await fetchAddress(location.lat, location.long);
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Settings to improve accuracy
    );
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleSearchNearbyMarkets = () => {
    if (!userLocation) {
      setError(`${translations.NEARBY_SEARCH.ERROR_MESSAGE}`); // Set error message
      return; // Exit the function early
    }

    const marketsWithinRadius = markets.filter((market) => {
      const distance = haversineDistance(
        userLocation.lat,
        userLocation.long,
        market?.location?.coordinates[1],
        market?.location?.coordinates[0]
      );
      return distance <= radius;
    });
    setNearbyMarkets(marketsWithinRadius);
    setNoMarketsFound(marketsWithinRadius.length === 0);
  };

  const handleModalClose = () => {
    handleClose();
    resetValues();
  };

  const modalSize =
    nearbyMarkets?.length > 0
      ? { width: "90%", maxWidth: 800 }
      : { width: "90%", maxWidth: 600 };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={{ ...modalStyle, ...modalSize }}>
        <Typography variant="h6" sx={{ color: "#15a0db", mb: 2 }}>
        {translations.NEARBY_SEARCH.TITLE}
        </Typography>

        {/* Location Button */}
        <Button
          onClick={handleGetLocation}
          variant="contained"
          sx={{
            mb: 2,
            backgroundColor: "#15a0db",
            "&:hover": { backgroundColor: "#ff0000" },
          }}
          disabled={loadingLocation}
        >
          {loadingLocation ? (
            <CircularProgress size={24} />
          ) : (
            `${translations.NEARBY_SEARCH.LOCATION_BUTTON}`
          )}
        </Button>

        {/* Display current location coordinates */}
        {userLocation && (
          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
            {translations.NEARBY_SEARCH.LOCATION} Latitude {userLocation.lat.toFixed(4)}, Longitude{" "}
            {userLocation.long.toFixed(4)}
          </Typography>
        )}

        {/* Radius Selection */}
        <Typography variant="body2" sx={{ mb: 1 }}>
        {translations.NEARBY_SEARCH.RADIUS_TITLE}
        </Typography>
        <RadioGroup
          row
          value={radius}
          onChange={handleRadiusChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel value={5} control={<Radio />} label="5 km" />
          <FormControlLabel value={10} control={<Radio />} label="10 km" />
          <FormControlLabel value={15} control={<Radio />} label="15 km" />
        </RadioGroup>

        {/* Search Button */}
        <Button
          onClick={handleSearchNearbyMarkets}
          variant="contained"
          sx={{
            backgroundColor: "#15a0db",
            "&:hover": { backgroundColor: "#ff0000" },
          }}
          fullWidth
        >
          {translations.NEARBY_SEARCH.SEARCH_BUTTON}
        </Button>

        {/* Error Message Display */}
        {error && (
          <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* Nearby Markets List and Map */}
        {noMarketsFound && (
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mt: 2,
              textAlign: "center",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {translations.NEARBY_SEARCH.NOT_FOUND_ERROR}
          </Typography>
        )}

        {nearbyMarkets?.length > 0 && (
          <>
            <List sx={{ mt: 2 }}>
              {nearbyMarkets.map((market) => (
                <ListItem key={market?._id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      const slug = createSlug(market?.name);
                      navigate(`/markets/${slug}`, {
                        state: { marketData: market },
                      });
                    }}
                    sx={{ cursor: "pointer" }} // Change cursor to pointer
                  >
                    <ArrowForwardIcon
                      sx={{ marginRight: 1, color: "#15a0db" }}
                    />
                    <Typography sx={{ color: "#15a0db" }}>
                      {market?.name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <MapContainer
              center={[userLocation.lat, userLocation.long]}
              zoom={10}
              style={{ height: "400px", width: "100%", marginTop: 2 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {/* User Marker and Radius Circle */}
              <Marker
                position={[userLocation.lat, userLocation.long]}
                icon={customIcon}
              >
                <Popup>{translations.NEARBY_SEARCH.YOU_ARE_HERE}</Popup>
              </Marker>
              <Circle
                center={[userLocation.lat, userLocation.long]}
                radius={radius * 1000}
                pathOptions={{
                  color: "#ff0000",
                  fillColor: "#15a0db",
                  fillOpacity: 0.5,
                }}
              />
              {/* Flea Market Markers */}
              {nearbyMarkets?.map((market) => (
                <Marker
                  key={market?._id}
                  position={[
                    market?.location?.coordinates[1],
                    market?.location?.coordinates[0],
                  ]}
                >
                  <Popup>{market.name}</Popup>
                </Marker>
              ))}
              {/* <UpdateMapBounds
                userLocation={userLocation}
                nearbyMarkets={nearbyMarkets}
                radius={radius}
              /> */}
            </MapContainer>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default NearbyMarketsModal;
