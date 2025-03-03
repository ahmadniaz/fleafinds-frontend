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
  Typography,
} from "@mui/material";
import {
  HeaderSection,
  FeaturedMarkets,
  MarketFilters,
  NearbyMarketsModal,
  UserReviews,
} from "./components";
import { HomeNav } from "../../layout/components/header/components";
import { MarketCard, SkeletonLoader } from "../../components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Footer } from "../../layout/components";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityFromUrl = params.get("city");
  const [page, setPage] = useState(1);
  const [allMarkets, setAllMarkets] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [marketsLoading, setMarketsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState(allMarkets);

  // Filter states
  const [marketTypeFilter, setMarketTypeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState(
    cityFromUrl ? [cityFromUrl] : []
  );
  const [ratingFilter, setRatingFilter] = useState("");

  // Handle filter updates
  const handleMarketTypeChange = (types) => setMarketTypeFilter(types);
  const handleCategoryChange = (categories) => setCategoryFilter(categories);
  const handleCitiesChange = (cities) => setCitiesFilter(cities);
  const handleRatingChange = (rating) => setRatingFilter(rating);

  useEffect(() => {
    if (cityFromUrl) {
      setCitiesFilter([cityFromUrl]);
    }
  }, [cityFromUrl]);

  useEffect(() => {
    getOwnerMarkets();
    getAllReviews();
  }, []);

  const getOwnerMarkets = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/market`
      );
      setAllMarkets(response?.data?.markets);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setMarketsLoading(false);
    }
  };

  const getAllReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/review`
      );
      setAllReviews(response?.data?.reviews);
    } catch (error) {
      console.log(error, "ERROR");
    } finally {
      setReviewsLoading(false);
    }
  };

  const marketsPerPage = 12;
  const totalMarkets = allMarkets?.length;
  const totalPages = Math.ceil(totalMarkets / marketsPerPage);

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

  // Handle Sorting
  const handleSortChange = (event) => setSortOption(event.target.value);

  // Handle Search
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Apply Filters and Sorting
  useEffect(() => {
    let filtered = allMarkets;

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter((market) =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Market Type Filter
    if (marketTypeFilter.length > 0) {
      filtered = filtered.filter((market) =>
        marketTypeFilter.includes(market.marketType)
      );
    }

    // Category Filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((market) =>
        market.categories.some((category) => categoryFilter.includes(category))
      );
    }

    // Cities Filter
    if (citiesFilter.length > 0) {
      filtered = filtered.filter((market) =>
        citiesFilter.includes(market.city)
      );
    }

    // Rating Filter
    if (ratingFilter) {
      filtered = filtered.filter(
        (market) => market.averageRating >= parseFloat(ratingFilter)
      );
    }

    // Sorting (Use slice() before sorting to prevent state mutation)
    if (sortOption === "highest-rated") {
      filtered = [...filtered].sort(
        (a, b) => b.averageRating - a.averageRating
      );
    } else if (sortOption === "lowest-rated") {
      filtered = [...filtered].sort(
        (a, b) => a.averageRating - b.averageRating
      );
    } else if (sortOption === "most-reviews") {
      filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === "least-reviews") {
      filtered = [...filtered].sort((a, b) => a.reviewCount - b.reviewCount);
    }

    setFilteredMarkets(filtered);
  }, [
    searchTerm,
    marketTypeFilter,
    categoryFilter,
    citiesFilter,
    ratingFilter,
    sortOption,
    allMarkets,
  ]);

  return (
    <>
      {/* Navigation Bar*/}
      <HomeNav />
      {/* Header Section*/}
      <HeaderSection cityFromUrl={cityFromUrl} allMarkets={allMarkets} />

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Featured Markets Slide */}
      {marketsLoading ? (
        <SkeletonLoader type="card" count={4} />
      ) : (
        <FeaturedMarkets featuredMarkets={allMarkets} />
      )}

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* Filters and Listing Data Section*/}
      <Grid2 container padding={2} spacing={2} mt={4}>
        {/* Left Side Filters*/}

        <MarketFilters
          fleaMarketCategories={fleaMarketCategories}
          fleaMarketTypesInFinland={fleaMarketTypesInFinland}
          fleaMarketCities={fleaMarketCities}
          onMarketTypeChange={handleMarketTypeChange}
          onCategoryChange={handleCategoryChange}
          onCitiesChange={handleCitiesChange}
          onRatingChange={handleRatingChange}
          cityFromUrl={cityFromUrl}
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
                onChange={handleSearchChange}
              />
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortOption}
                  onChange={handleSortChange}
                  displayEmpty
                  defaultValue="" // Ensures no value is selected by default
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
          <Grid2 container spacing={4} mt={3} justifyContent="center">
            {marketsLoading ? (
              <SkeletonLoader type="card" count={12} />
            ) : filteredMarkets.length > 0 ? (
              filteredMarkets.map((market) => (
                <MarketCard key={market._id} market={market} />
              ))
            ) : (
              <Grid2 item xs={12} textAlign="center">
                <Typography variant="h6" color="textSecondary">
                  No flea markets found. Try adjusting your filters or search
                  criteria.
                </Typography>
              </Grid2>
            )}
          </Grid2>

          {/* Pagination */}
          {filteredMarkets?.length > 0 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{ mt: 3, display: "flex", justifyContent: "right" }}
            />
          )}
        </Grid2>
      </Grid2>

      {/* Divider Between Sections */}
      <Divider sx={{ marginY: 3, borderColor: "#f0f0f0", borderWidth: 1 }} />

      {/* User Reviews Slide*/}
      {reviewsLoading ? (
        <SkeletonLoader type="card" count={4} />
      ) : (
        <UserReviews reviews={allReviews} markets={displayedMarkets} />
      )}
      {/* Nearby Markets Modal */}
      <NearbyMarketsModal
        open={isModalOpen}
        handleClose={handleModalClose}
        markets={displayedMarkets}
      />
      <Footer />
    </>
  );
};

export default MarketListing;
