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
  const { translations, changeLanguage } = useLanguage();
  const cityInfo = [
    {
      name: `${translations.CITIES_LIST.CITY1}`,
      description: "",
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY2}`,
      description: "",
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY3}`,
      description: "",
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY4}`,
      description: "",
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY5}`,
      description: "",
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY6}`,
      description: "",
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY7}`,
      description: "",
      image: Helsinki,
    },
    {
      name: `${translations.CITIES_LIST.CITY8}`,
      description: "",
      image: Turku,
    },
    {
      name: `${translations.CITIES_LIST.CITY9}`,
      description: "",
      image: Vaasa,
    },
    {
      name: `${translations.CITIES_LIST.CITY10}`,
      description: "",
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
