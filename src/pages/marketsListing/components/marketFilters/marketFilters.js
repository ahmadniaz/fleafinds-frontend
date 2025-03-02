import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    if (cityFromUrl) {
      setCitiesFilter([cityFromUrl]);
    }
  }, [cityFromUrl]);

  useEffect(() => {
    onRatingChange(ratingFilter);
  }, [ratingFilter]);

  const clearFilters = () => {
    setMarketTypeFilter([]);
    setCategoryFilter([]);
    setCitiesFilter([]);
    setRatingFilter("");
    navigate("/markets", { replace: true });
  };

  return (
    <Grid2 item size={{ xs: 12, md: 3, lg: 2 }}>
      <Box
        sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}
      >
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
        <Accordion expanded={cityFromUrl}>
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
    </Grid2>
  );
};

export default MarketFilters;
