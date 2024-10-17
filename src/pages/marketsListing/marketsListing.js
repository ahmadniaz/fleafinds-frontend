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
} from "@mui/material";
import MarketCard from "./components/marketCards";
import MarketFilters from "./components/marketFilters";
import { Breadcrumb } from "../../components";
import { HomeNav } from "../../layout/components/header/components";
import FleaMarket from "../../assets/images/fleaMarketLogo.jpg";

// Sample flea market data (Replace with real data)
const fleaMarkets = [
  {
    id: 1,
    name: "Helsinki Flea Market",
    image: FleaMarket,
    rating: 4.6,
    reviewCount: 45,
    type: "Indoor Flea Market",
    location: "Helsinki",
  },
  {
    id: 2,
    name: "Turku Flea Market",
    image: FleaMarket,
    rating: 4.1,
    reviewCount: 25,
    type: "Secondhand Store",
    location: "Turku",
  },
  {
    id: 3,
    name: "Oulu Flea Market",
    image: FleaMarket,
    rating: 4.9,
    reviewCount: 35,
    type: "Donation Market",
    location: "Oulu",
  },
  {
    id: 4,
    name: "Oulu Flea Market",
    image: FleaMarket,
    rating: 4.2,
    reviewCount: 35,
    type: "Indoor Flea Market",
    location: "Oulu",
  },
  {
    id: 5,
    name: "Oulu Flea Market",
    image: FleaMarket,
    rating: 3.1,
    reviewCount: 19,
    type: "Pop-up Market",
    location: "Oulu",
  },
  // Add more flea markets...
];

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

// Flea Market Listing Page
const MarketListing = () => {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <HomeNav />

      <Grid2 container padding={2} spacing={2}>
        {/* Left Filters Section */}

        <MarketFilters
          fleaMarketCategories={fleaMarketCategories}
          fleaMarketTypesInFinland={fleaMarketTypesInFinland}
        />

        {/* Flea Market Listings Section */}
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
            {fleaMarkets.map((market) => (
              <MarketCard market={market} />
            ))}
          </Grid2>

          {/* Pagination */}
          <Pagination
            count={10} // Assume 10 pages for demonstration
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
