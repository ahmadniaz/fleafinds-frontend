import React, { useState } from "react";
import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarketCard from "./components/marketCards";
import MarketFilters from "./components/marketFilters";
import { Breadcrumb } from "../../components";
import { HomeNav } from "../../layout/components/header/components";
import { fleaMarketsList } from "../../data/data";

// Categories and Types for Filters
const fleaMarketCategories = [
  "Clothes",
  "Toys",
  "Furniture",
  "Books",
  "Antiques",
  "Electronics",
  "Home Decor",
  "Jewelry & Accessories",
  "Sports Equipment",
  "Kitchenware",
  "Musical Instruments",
  "Gardening Tools",
  "Collectibles",
  "Handmade Crafts",
  "Bicycles & Scooters",
];

const fleaMarketTypesInFinland = [
  "Indoor Flea Market",
  "Outdoor Flea Market",
  "Secondhand Store",
  "Donation Market",
  "Pop-up Market",
];

const MarketListing = () => {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");

  const marketsPerPage = 12;
  const totalMarkets = fleaMarketsList.length;
  const totalPages = Math.ceil(totalMarkets / marketsPerPage);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * marketsPerPage;
  const endIndex = startIndex + marketsPerPage;
  const displayedMarkets = fleaMarketsList.slice(startIndex, endIndex);

  // Make sure to set the default icon for Leaflet markers
  delete L.Icon.Default.prototype._getIconUrl; // Fix for marker icon not displaying
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <>
      <HomeNav />
      <Grid2 container padding={2} spacing={2}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            Turku Flea Markets List
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Showing {totalMarkets} flea markets in Turku.
          </Typography>
          <Typography variant="body2">
            Explore popular flea markets in Turku. You can browse, filter by
            category, and find their locations on the map.
          </Typography>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6 }}>
          <MapContainer
            center={[60.4518, 22.2666]} // Coordinates of Turku, Finland
            zoom={12}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {fleaMarketsList.map((market) => (
              <Marker
                key={market.id}
                position={[market.location.lat, market.location.long]}
              >
                <Popup>{market.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid2>
      </Grid2>

      <Grid2 container padding={2} spacing={2}>
        <MarketFilters
          fleaMarketCategories={fleaMarketCategories}
          fleaMarketTypesInFinland={fleaMarketTypesInFinland}
        />

        <Grid2 item size={{ xs: 12, md: 10 }}>
          {/* Breadcrumb Navigation */}
          <Box mb={2}>
            <Breadcrumb />
          </Box>

          {/* Search Bar and Sorting Dropdown */}
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item size={{ xs: 8 }}>
              <TextField
                fullWidth
                label="Search by name"
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#15a0db",
                    },
                  },
                }}
              />
            </Grid2>
            <Grid2 item size={{ xs: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#15a0db",
                      },
                    },
                  }}
                >
                  <MenuItem value="highest-rated">Highest Rated</MenuItem>
                  <MenuItem value="lowest-rated">Lowest Rated</MenuItem>
                  <MenuItem value="most-reviews">Most Reviews</MenuItem>
                  <MenuItem value="least-reviews">Least Reviews</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Flea Market Cards */}
          <Grid2 container spacing={4} mt={3}>
            {displayedMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </Grid2>

          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default MarketListing;
