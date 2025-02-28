import React, { useState } from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import CityCard from "./components/cityCard";
import SearchBar from "./components/citySearch";
import Turku from "../../../../assets/images/turku.jpeg";
import Helsinki from "../../../../assets/images/helsinki.jpeg";
import Vaasa from "../../../../assets/images/vaasa.jpeg";

const CitiesList = ({ citiesRef }) => {
  const [citySearch, setCitySearch] = useState("");
  const cityInfo = [
    {
      name: "Helsinki",
      description: "Discover popular flea markets in the capital, Helsinki.",
      image: Helsinki,
    },
    {
      name: "Espoo",
      description: "Explore hidden treasures in flea markets across Espoo.",
      image: Turku,
    },
    {
      name: "Tampere",
      description: "Find the best flea markets in the industrial hub, Tampere.",
      image: Vaasa,
    },
    {
      name: "Vantaa",
      description: "Vantaa's flea markets offer unique finds from the locals.",
      image: Helsinki,
    },
    {
      name: "Oulu",
      description: "Discover second-hand gems at flea markets in Oulu.",
      image: Turku,
    },
    {
      name: "Turku",
      description: "Find the best flea markets in Turku.",
      image: Vaasa,
    },
    {
      name: "Jyväskylä",
      description: "Explore the vibrant flea markets in Jyväskylä.",
      image: Helsinki,
    },
    {
      name: "Lahti",
      description: "Lahti's flea markets offer a variety of local treasures.",
      image: Turku,
    },
    {
      name: "Kuopio",
      description: "Unearth hidden gems in Kuopio's lively flea markets.",
      image: Vaasa,
    },
    {
      name: "Pori",
      description: "Explore the coastal city's best flea markets in Pori.",
      image: Helsinki,
    },
  ];

  const handleSearch = (event) => {
    setCitySearch(event.target.value);
  };

  const filteredCities = cityInfo.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <Box
      ref={citiesRef}
      id="cities-section"
      sx={{
        padding: "60px 0",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="#d32f2f" sx={{ mb: 3 }}>
        Find Flea Markets in Your City
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        Select your city below to discover nearby flea markets
      </Typography>

      <Box sx={{ mb: 5 }}>
        <SearchBar handleSearch={handleSearch} citySearch={citySearch} />
      </Box>

      <Grid2 container spacing={4} justifyContent="center">
        {filteredCities?.length > 0 ? (
          filteredCities?.map((city, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <CityCard
                name={city.name}
                description={city.description}
                image={city.image}
              />
            </Grid2>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No flea markets found in the searched city.
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default CitiesList;
