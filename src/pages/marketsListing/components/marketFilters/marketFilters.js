import React, { useState } from "react";
import {
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  Grid2,
  RadioGroup,
  Radio,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const MarketFilters = ({ fleaMarketCategories, fleaMarketTypesInFinland }) => {
  const [openRating, setOpenRating] = useState(false);
  const [openMarketTypes, setOpenMarketTypes] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [marketTypeFilter, setMarketTypeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const handleToggle = (filter) => {
    switch (filter) {
      case "rating":
        setOpenRating((prev) => !prev);
        break;
      case "marketTypes":
        setOpenMarketTypes((prev) => !prev);
        break;
      case "categories":
        setOpenCategories((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <Grid2 item size={{ xs: 12, lg: 2, md: 3 }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          border: "1px solid #15a0db",
          display: { sm: "block" }, // Hide on small screens
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="#15a0db">
          Filters
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            marginBottom: 2,
          }}
        />

        {/* Rating Filter */}
        <Box marginBottom={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#ff0000"
            sx={{ cursor: "pointer", display: "flex" }}
            onClick={() => handleToggle("rating")}
          >
            Rating
            {openRating ? (
              <ExpandLess sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            ) : (
              <ExpandMore sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            )}
          </Typography>
          <Collapse in={openRating}>
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
          </Collapse>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            marginBottom: 2,
          }}
        />

        {/* Flea Market Types Filter */}
        <Box marginBottom={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#ff0000"
            sx={{ cursor: "pointer", display: "flex" }}
            onClick={() => handleToggle("marketTypes")}
          >
            Flea Market Types
            {openMarketTypes ? (
              <ExpandLess sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            ) : (
              <ExpandMore sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            )}
          </Typography>
          <Collapse in={openMarketTypes}>
            <FormGroup>
              {fleaMarketTypesInFinland.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={marketTypeFilter.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMarketTypeFilter([...marketTypeFilter, type]);
                        } else {
                          setMarketTypeFilter(
                            marketTypeFilter.filter((item) => item !== type)
                          );
                        }
                      }}
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
          </Collapse>
        </Box>

        {/* Divider Line */}
        <Box
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            marginBottom: 2,
          }}
        />

        {/* Categories Filter */}
        <Box marginBottom={2}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#ff0000"
            sx={{ cursor: "pointer", display: "flex" }}
            onClick={() => handleToggle("categories")}
          >
            Categories
            {openCategories ? (
              <ExpandLess sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            ) : (
              <ExpandMore sx={{ fontSize: "1.5rem", marginLeft: 1 }} />
            )}
          </Typography>
          <Collapse in={openCategories}>
            <FormGroup>
              {fleaMarketCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={categoryFilter.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategoryFilter([...categoryFilter, category]);
                        } else {
                          setCategoryFilter(
                            categoryFilter.filter((item) => item !== category)
                          );
                        }
                      }}
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
          </Collapse>
        </Box>
      </Box>
    </Grid2>
  );
};

export default MarketFilters;
