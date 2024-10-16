import React, { useState } from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Rating,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
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
    type: "Indoor Flea Market",
    location: "Turku",
  },
  {
    id: 3,
    name: "Oulu Flea Market",
    image: FleaMarket,
    rating: 4.9,
    reviewCount: 35,
    type: "Indoor Flea Market",
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

      <Grid2 container padding={2}>
        {/* Left Filters Section */}
        <Grid2 item size={{ xs: 12, md: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          {/* Rating Filter */}
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Rating</Typography>
            <RadioGroup>
              <FormControlLabel
                value="4.5+"
                control={<Radio />}
                label="4.5 and above"
              />
              <FormControlLabel
                value="4.0+"
                control={<Radio />}
                label="4.0 and above"
              />
            </RadioGroup>
          </Box>

          {/* Categories Filter */}
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Categories</Typography>
            <FormGroup>
              {fleaMarketCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={<Checkbox name="categories" />}
                  label={category}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Flea Market Types Filter */}
          <Box marginBottom={2}>
            <Typography variant="subtitle1">Flea Market Types</Typography>
            <FormGroup>
              {fleaMarketTypesInFinland.map((type) => (
                <FormControlLabel
                  key={type}
                  control={<Checkbox name="marketType" />}
                  label={type}
                />
              ))}
            </FormGroup>
          </Box>
        </Grid2>

        {/* Flea Market Listings Section */}
        <Grid2 item size={{ xs: 12, md: 9 }}>
          {/* Breadcrumb Navigation */}
          <Box mb={2}>
            <Breadcrumb />
          </Box>

          {/* Search Bar and Sorting Dropdown */}
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item size={{ xs: 8 }}>
              <TextField fullWidth label="Search by name" variant="outlined" />
            </Grid2>
            <Grid2 item size={{ xs: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortOption} onChange={handleSortChange}>
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
              <Grid2 item size={{ xs: 12, md: 6, sm: 3 }} key={market.id}>
                <Card
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={market.image}
                    alt={market.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {market.name}
                    </Typography>
                    <Rating
                      value={market.rating}
                      precision={0.1}
                      readOnly
                      sx={{ display: "flex", alignItems: "center" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {market.rating} stars ({market.reviewCount} reviews)
                    </Typography>
                    <Chip label={market.type} color="primary" size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {market.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          {/* Pagination */}
          <Pagination
            count={10} // Assume 10 pages for demonstration
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 4 }}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default MarketListing;
