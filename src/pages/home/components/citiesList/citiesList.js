import React from "react";
import { TextField, Button, Box, Typography, Grid2 } from "@mui/material";
import CityCard from "./components/cityCard";
import Turku from "../../../../assets/images/turku.jpeg";
import Helsinki from "../../../../assets/images/helsinki.jpeg";
import Vaasa from "../../../../assets/images/vaasa.jpeg";

const CitiesList = () => {
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

  return (
    <Grid2 container spacing={1} direction="column">
      <Box textAlign="center">
        <Typography variant="h4" color="#f00404">
          Looking for Flea Markets in your City?
        </Typography>

        <Typography variant="h6" color="#15a0db">
          Select your current City to find nearby Flea markets
        </Typography>
      </Box>

      <Box>
        <Grid2 container spacing={1}>
          {cityInfo.map((city, index) => (
            <Grid2 xs={12} sm={6} md={4} lg={4} key={index}>
              <CityCard
                name={city.name}
                description={city.description}
                image={city.image}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Grid2>
  );
};

export default CitiesList;
