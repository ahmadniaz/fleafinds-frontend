import React, { useState } from "react";
import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import {
  HeaderSection,
  FeaturedMarkets,
  MarketCard,
  MarketFilters,
  NearbyMarketsModal,
  UserReviews,
} from "./components";
import { HomeNav } from "../../layout/components/header/components";
import { fleaMarketsList, featuredMarkets, reviews } from "../../data/data";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Navigation Bar*/}
      <HomeNav />
      {/* Header Section*/}
      <HeaderSection fleaMarketsList={fleaMarketsList} />

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Featured Markets Slide */}
      <FeaturedMarkets featuredMarkets={featuredMarkets} />

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Left Side Filters*/}
      <Grid2 container padding={2} spacing={2} mt={4}>
        <MarketFilters
          fleaMarketCategories={fleaMarketCategories}
          fleaMarketTypesInFinland={fleaMarketTypesInFinland}
        />

        <Grid2 item size={{ xs: 12, md: 10 }}>
          {/* Search Nearby and Sorting Dropdown */}
          <Grid2 container spacing={1} alignItems="center">
            <Grid2 item size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Search Markets by Name"
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
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    // Implement search nearby functionality
                  }
                }}
              />
            </Grid2>
            {/* Find Nearby Button */}
            <Grid2 item size={{ xs: 2 }} display="flex">
              <Button
                onClick={handleModalOpen}
                variant="contained"
                sx={{
                  backgroundColor: "#15a0db",
                  color: "#fff",
                  fontWeight: "bold",
                  p: 2,
                  "&:hover": { backgroundColor: "#ff0000" },
                }}
              >
                Find Nearby Markets
              </Button>
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
      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* User Reviews Slide*/}
      {/* <Grid2 container>
        <Grid2 item size={{ xs: 12 }}> */}
      <UserReviews reviews={reviews} />
      {/* </Grid2>
      </Grid2> */}

      {/* Nearby Markets Modal */}
      <NearbyMarketsModal open={isModalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default MarketListing;
