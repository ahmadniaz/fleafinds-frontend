import React, { useEffect, useState } from "react";
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
  MarketFilters,
  NearbyMarketsModal,
  UserReviews,
} from "./components";
import { HomeNav } from "../../layout/components/header/components";
import { featuredMarkets, reviews } from "../../data/data";
import { MarketCard } from "../../components";
import axios from "axios";

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

const fleaMarketCities = [
  "Helsinki",
  "Espoo",
  "Tampere",
  "Vantaa",
  "Oulu",
  "Turku",
  "Jyväskylä",
  "Lahti",
  "Kuopio",
  "Pori",
];

const MarketListing = () => {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [allMarkets, setAllMarkets] = useState([]);

  useEffect(() => {
    getOwnerMarkets();
  }, []);

  const getOwnerMarkets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/market");
      setAllMarkets(response?.data?.markets);
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const marketsPerPage = 12;
  const totalMarkets = allMarkets?.length;
  const totalPages = Math.ceil(totalMarkets / marketsPerPage);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * marketsPerPage;
  const endIndex = startIndex + marketsPerPage;
  const displayedMarkets = allMarkets?.slice(startIndex, endIndex);

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
      <HeaderSection allMarkets={allMarkets} />

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Featured Markets Slide */}
      <FeaturedMarkets featuredMarkets={featuredMarkets} />

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Filters and Listing Data Section*/}
      <Grid2 container padding={2} spacing={2} mt={4}>
        {/* Left Side Filters*/}
        <MarketFilters
          fleaMarketCategories={fleaMarketCategories}
          fleaMarketTypesInFinland={fleaMarketTypesInFinland}
          fleaMarketCities={fleaMarketCities}
        />
        {/* Listing component*/}
        <Grid2 item size={{ xs: 12, lg: 10, md: 9 }}>
          {/* Search Nearby and Sorting Dropdown */}
          <Grid2 container spacing={1} alignItems="center">
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
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
              />
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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

            {/* Find Nearby Button */}
            <Grid2
              item
              size={{ xs: 12, sm: 4, md: 4, lg: 3 }}
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Button
                onClick={handleModalOpen}
                fullWidth
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
          </Grid2>

          {/* Flea Market Cards */}
          <Grid2 container spacing={4} mt={3}>
            {displayedMarkets.map((market) => (
              <MarketCard key={market?._id} market={market} />
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
      <UserReviews reviews={reviews} />

      {/* Nearby Markets Modal */}
      <NearbyMarketsModal open={isModalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default MarketListing;
