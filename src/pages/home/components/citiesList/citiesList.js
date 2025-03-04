import React, { useState } from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import CityCard from "./components/cityCard";
import SearchBar from "./components/citySearch";
import Turku from "../../../../assets/images/turku.jpeg";
import Helsinki from "../../../../assets/images/helsinki.jpeg";
import Vaasa from "../../../../assets/images/vaasa.jpeg";
import { useLanguage } from "../../../../context/LanguageContext";

const CitiesList = ({ citiesRef }) => {
  const [citySearch, setCitySearch] = useState("");
  const { translations } = useLanguage();
  const cityInfo = [
    {
      name: `${translations.CITIES_LIST.CITY1}`,
      description: `${translations.CITIES_LIST.DESC1}`,
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY2}`,
      description: `${translations.CITIES_LIST.DESC2}`,
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY3}`,
      description: `${translations.CITIES_LIST.DESC3}`,
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY4}`,
      description: `${translations.CITIES_LIST.DESC4}`,
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY5}`,
      description: `${translations.CITIES_LIST.DESC5}`,
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY6}`,
      description: `${translations.CITIES_LIST.DESC6}`,
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY7}`,
      description: `${translations.CITIES_LIST.DESC7}`,
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY8}`,
      description: `${translations.CITIES_LIST.DESC8}`,
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY9}`,
      description: `${translations.CITIES_LIST.DESC9}`,
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY10}`,
      description: `${translations.CITIES_LIST.DESC10}`,
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
        {translations.CITIES_LIST.TITLE}
      </Typography>
      <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
        {translations.CITIES_LIST.SUBTITLE}
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
            {translations.CITIES_LIST.NOTFOUND}
          </Typography>
        )}
      </Grid2>
    </Box>
  );
};

export default CitiesList;
