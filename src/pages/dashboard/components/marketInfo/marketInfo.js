import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CloudUpload } from "@mui/icons-material";
import MarketImagesSection from "./components/marketImagesSection";
import SocialMediaSection from "./components/socialMediaSection";

// Validation schema for the dashboard form
const validationSchema = Yup.object({
  marketName: Yup.string().required("Market name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  categories: Yup.string().required("Categories are required"),
  socialMedia: Yup.object({
    facebook: Yup.string().url("Invalid URL"),
    instagram: Yup.string().url("Invalid URL"),
    twitter: Yup.string().url("Invalid URL"),
  }),
  openingHours: Yup.string().required("Opening hours are required"),
  priceList: Yup.string().required("Price information is required"),
});

const MarketInfoForm = () => {
  const [imagePreviews, setImagePreviews] = useState(Array(10).fill(null));
  const [logoPreview, setLogoPreview] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleTypeChange = (event) => setSelectedType(event.target.value);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  // Determine if the screen size is small (mobile view)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth={isSmallScreen ? "sm" : "lg"}
      sx={{
        marginLeft: isSmallScreen ? 0 : "270px",
        backgroundColor: "#f9f9f9",
        padding: { xs: "15px", sm: "30px" },
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        mt: { xs: 3, sm: 3, md: 3 },
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ margin: "15px 0", textAlign: "center" }}
      >
        Market Information
      </Typography>

      {/* AppBar with Profile Menu */}
      {isSmallScreen ? null : (
        <AppBar
          position="static"
          sx={{
            marginBottom: "15px",
            backgroundColor: "#3f51b5",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar alt="Profile" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )}

      <Formik
        initialValues={{
          marketName: "",
          description: "",
          location: "",
          categories: "",
          openingHours: "",
          priceList: "",
          socialMedia: {
            facebook: "",
            instagram: "",
            twitter: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          console.log("Form submitted with values:", values)
        }
      >
        {({ errors, touched }) => (
          <Form>
            <Grid2 container spacing={2}>
              {/* Market Name */}
              <Grid2 item size={{ xs: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="marketName"
                  label="Market Name"
                  error={touched.marketName && Boolean(errors.marketName)}
                  helperText={touched.marketName && errors.marketName}
                />
              </Grid2>

              {/* Market Type */}
              <Grid2 item size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <Select
                    value={selectedType}
                    onChange={handleTypeChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Market Type" }}
                  >
                    <MenuItem value="">
                      <em>Select Market Type</em>
                    </MenuItem>
                    {fleaMarketTypesInFinland.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {/* Logo Upload */}
              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    position: "relative",
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Upload Market Logo
                    </Typography>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: "none" }}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        left: "10%",
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                      }}
                    >
                      <CloudUpload />
                    </IconButton>
                  </label>
                </Box>
              </Grid2>

              {/* Description */}
              <Grid2 item size={{ xs: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid2>

              {/* Location */}
              <Grid2 item size={{ xs: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="location"
                  label="Location"
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />
              </Grid2>

              {/* Categories */}
              <Grid2 item size={{ xs: 12 }}>
                <FormGroup row>
                  {fleaMarketCategories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          name="categories"
                          value={category}
                          onChange={handleChange}
                        />
                      }
                      label={category}
                    />
                  ))}
                </FormGroup>
              </Grid2>

              {/* Market Images */}
              <Grid2 item size={{ xs: 12 }}>
                <MarketImagesSection
                  handleImageUpload={handleImageUpload}
                  imagePreviews={imagePreviews}
                />
              </Grid2>

              {/* Opening Hours */}
              <Grid2 item size={{ xs: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="openingHours"
                  label="Opening Days and Hours"
                  placeholder="e.g., Mon-Fri: 10-18, Sat-Sun: 10-15"
                  error={touched.openingHours && Boolean(errors.openingHours)}
                  helperText={touched.openingHours && errors.openingHours}
                />
              </Grid2>

              {/* Price List */}
              <Grid2 item size={{ xs: 12 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="priceList"
                  label="Price List"
                  multiline
                  rows={4}
                  error={touched.priceList && Boolean(errors.priceList)}
                  helperText={touched.priceList && errors.priceList}
                />
              </Grid2>

              {/* Social Media Links */}
              <Grid2 item size={{ xs: 12 }} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Social Media Links
                </Typography>
                <SocialMediaSection errors={errors} touched={touched} />
              </Grid2>

              {/* Submit Button */}
              <Grid2 item size={{ xs: 12 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "10px" }}
                >
                  Submit Market Information
                </Button>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default MarketInfoForm;
