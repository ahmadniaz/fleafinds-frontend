import React from "react";
import {
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Grid2,
} from "@mui/material";

const MarketFilters = ({ fleaMarketCategories, fleaMarketTypesInFinland }) => {
  return (
    <Grid2 item size={{ xs: 12, md: 2 }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          border: `1px solid #15a0db`,
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="#15a0db">
          Filters
        </Typography>

        {/* Rating Filter */}
        <Box marginBottom={2}>
          <Typography variant="subtitle1" fontWeight="bold" color="#ff0000">
            Rating
          </Typography>
          <RadioGroup>
            <FormControlLabel
              value="4.5+"
              control={<Radio sx={{ color: "#15a0db" }} />}
              label="4.5 and above"
            />
            <FormControlLabel
              value="4.0+"
              control={<Radio sx={{ color: "#15a0db" }} />}
              label="4.0 and above"
            />
          </RadioGroup>
        </Box>

        {/* Flea Market Types Filter */}
        <Box marginBottom={2}>
          <Typography variant="subtitle1" fontWeight="bold" color="#ff0000">
            Flea Market Types
          </Typography>
          <FormGroup>
            {fleaMarketTypesInFinland.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    name="marketType"
                    sx={{
                      color: "#15a0db",
                      "&.Mui-checked": { color: "#15a0db" },
                    }}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Categories Filter */}
        <Box marginBottom={2}>
          <Typography variant="subtitle1" fontWeight="bold" color="#ff0000">
            Categories
          </Typography>
          <FormGroup>
            {fleaMarketCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    name="categories"
                    sx={{
                      color: "#15a0db",
                      "&.Mui-checked": { color: "#15a0db" },
                    }}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Grid2>
  );
};

export default MarketFilters;
