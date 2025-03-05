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
import { useLanguage } from "../../context/LanguageContext";


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
  const [sortOption, setSortOption] = useState("highest-rated");
  const [filteredMarkets, setFilteredMarkets] = useState(allMarkets);

  // Filter states
  const [marketTypeFilter, setMarketTypeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState(
    cityFromUrl ? [cityFromUrl] : []
  );
  const [ratingFilter, setRatingFilter] = useState("");
  const { translations, changeLanguage } = useLanguage();
  // Handle filter updates
  const handleMarketTypeChange = (types) => setMarketTypeFilter(types);
  const handleCategoryChange = (categories) => setCategoryFilter(categories);
  const handleCitiesChange = (cities) => setCitiesFilter(cities);
  const handleRatingChange = (rating) => setRatingFilter(rating);

  // Categories and Types for Filters
  const fleaMarketCategories = [
    `${translations.CATEGORIES.CLOTHES}`,
    `${translations.CATEGORIES.TOYS}`,
    `${translations.CATEGORIES.FURNITURE}`,
    `${translations.CATEGORIES.BOOKS}`,
    `${translations.CATEGORIES.ANTIQUES}`,
    `${translations.CATEGORIES.ELECTRONICS}`,
    `${translations.CATEGORIES.HOME_DECOR}`,
    `${translations.CATEGORIES.JEWELRY_AND_ACCESSORIES}`,
    `${translations.CATEGORIES.SPORTS_EQUIPMENT}`,
    `${translations.CATEGORIES.KITCHENWARE}`,
    `${translations.CATEGORIES.MUSICAL_INSTRUMENT}`,
    `${translations.CATEGORIES.GARDENING_TOOLS}`,
    `${translations.CATEGORIES.COLLECTIBLES}`,
    `${translations.CATEGORIES.HANDMADE_CRAFTS}`,
    `${translations.CATEGORIES.BICYCLES_AND_SCOOTERS}`,
  ];

  const fleaMarketTypesInFinland = [
    `${translations.FILTERS.TYPE1}`,
    `${translations.FILTERS.TYPE2}`,
    `${translations.FILTERS.TYPE3}`,
    `${translations.FILTERS.TYPE4}`,
    `${translations.FILTERS.TYPE5}`,
  ];

  const fleaMarketCities = [
    `${translations.CITIES_LIST.CITY1}`,
    `${translations.CITIES_LIST.CITY2}`,
    `${translations.CITIES_LIST.CITY3}`,
    `${translations.CITIES_LIST.CITY4}`,
    `${translations.CITIES_LIST.CITY5}`,
    `${translations.CITIES_LIST.CITY6}`,
    `${translations.CITIES_LIST.CITY7}`,
    `${translations.CITIES_LIST.CITY8}`,
    `${translations.CITIES_LIST.CITY9}`,
    `${translations.CITIES_LIST.CITY10}`,
  ];
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
                label={`${translations.MARKET_SORT.SEARCH_FIELD}`}
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

            <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <FormControl fullWidth>
                <InputLabel>{translations.MARKET_SORT.SORT_BY}</InputLabel>
                <Select value={sortOption} onChange={handleSortChange}>
                  <MenuItem value="highest-rated">{translations.MARKET_SORT.SORT1}</MenuItem>
                  <MenuItem value="lowest-rated">{translations.MARKET_SORT.SORT2}</MenuItem>
                  <MenuItem value="most-reviews">{translations.MARKET_SORT.SORT3}</MenuItem>
                  <MenuItem value="least-reviews">{translations.MARKET_SORT.SORT4}</MenuItem>
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
                {translations.MARKET_SORT.NEARBY_BUTTON}
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
                  {translations.MARKET_SORT.NOT_FOUND}
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
