import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

const MarketFilters = ({
  fleaMarketCategories,
  fleaMarketTypesInFinland,
  fleaMarketCities,
  onMarketTypeChange,
  onCategoryChange,
  onCitiesChange,
  onRatingChange,
  cityFromUrl,
}) => {
  const [marketTypeFilter, setMarketTypeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [citiesFilter, setCitiesFilter] = useState(
    cityFromUrl ? [cityFromUrl] : []
  );
  const [ratingFilter, setRatingFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    onMarketTypeChange(marketTypeFilter);
  }, [marketTypeFilter]);

  useEffect(() => {
    onCategoryChange(categoryFilter);
  }, [categoryFilter]);

  useEffect(() => {
    onCitiesChange(citiesFilter);
  }, [citiesFilter]);

  useEffect(() => {
    onRatingChange(ratingFilter);
  }, [ratingFilter]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const clearFilters = () => {
    setMarketTypeFilter([]);
    setCategoryFilter([]);
    setCitiesFilter([]);
    setRatingFilter("");
  };

  const filterContent = (
    <Box sx={{ width: 250, padding: 2 }}>
      {/* Close Icon visible only on small screens */}
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ display: { xs: "block", md: "none" }, alignSelf: "flex-end" }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" fontWeight="bold" color="#15a0db">
        Filters
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={clearFilters}
        sx={{ my: 2 }}
      >
        Clear Filters
      </Button>

      {/* Rating Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            onChange={(e) => setRatingFilter(e.target.value)}
            value={ratingFilter}
          >
            <FormControlLabel
              value="4.5"
              control={<Radio />}
              label="4.5 and above"
            />
            <FormControlLabel
              value="4.0"
              control={<Radio />}
              label="4.0 and above"
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 2 }} />

      {/* Market Types */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Market Types</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {fleaMarketTypesInFinland.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={marketTypeFilter.includes(type)}
                    onChange={(e) => {
                      setMarketTypeFilter(
                        e.target.checked
                          ? [...marketTypeFilter, type]
                          : marketTypeFilter.filter((item) => item !== type)
                      );
                    }}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 2 }} />

      {/* Categories */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {fleaMarketCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={categoryFilter.includes(category)}
                    onChange={(e) => {
                      setCategoryFilter(
                        e.target.checked
                          ? [...categoryFilter, category]
                          : categoryFilter.filter((item) => item !== category)
                      );
                    }}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 2 }} />

      {/* Cities */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Cities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {fleaMarketCities.map((city) => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox
                    checked={citiesFilter.includes(city)}
                    onChange={(e) => {
                      setCitiesFilter(
                        e.target.checked
                          ? [...citiesFilter, city]
                          : citiesFilter.filter((item) => item !== city)
                      );
                    }}
                  />
                }
                label={city}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <>
      {/* More Filters Button for Mobile Screens */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: "block", md: "none" },
          backgroundColor: "#15a0db",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "5px",
        }}
      >
        <Typography variant="body2">More Filters</Typography>
      </IconButton>

      {/* Permanent Sidebar on Larger Screens */}
      <Grid2
        item
        size={{ md: 3, lg: 2 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {filterContent}
      </Grid2>

      {/* Drawer for Small Screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {filterContent}
      </Drawer>
    </>
  );
};

export default MarketFilters;
