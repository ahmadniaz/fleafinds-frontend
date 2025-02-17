import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Grid2,
  IconButton,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  useMediaQuery,
  Divider,
  FormHelperText,
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
  city: Yup.string().required("City is required"),
  location: Yup.string().required("Location is required"),
  categories: Yup.array().min(1, "At least one category is required"), // Update to handle array
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
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

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

  const fleaMarketCitiesInFinland = [
    "Helsinki",
    "Espoo",
    "Tampere",
    "Vantaa",
    "Oulu",
    "Turku",
    "Jyväskylä",
    "Lahti",
    "Kuopio",
    "Pori",
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

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/markets", {
        name: values.marketName,
        description: values.description,
        city: values.city,
        location: values.location,
        categories: selectedCategories,
        openingHours: values.openingHours,
        priceList: values.priceList,
        socialMedia: values.socialMedia,
        logo: logoPreview,
        images: imagePreviews,
      });

      console.log(values, logoPreview, imagePreviews, "CREATE API");

      console.log("Market created successfully:", response.data);
      // handle success (e.g., navigate, show notification, etc.)
    } catch (error) {
      console.error(
        "Error creating market:",
        error.response ? error.response.data : error.message
      );
      // handle error (e.g., show error notification)
    }
  };

  // Determine if the screen size is small (mobile view)

  return (
    <Container
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
      <Divider sx={{ mt: 1, mb: 2 }} /> {/* Divider under the breadcrumb */}
      <Formik
        initialValues={{
          marketName: "",
          description: "",
          city: "",
          location: "",
          categories: [], // Use an array for categories
          openingHours: "",
          priceList: "",
          socialMedia: {
            facebook: "",
            instagram: "",
            twitter: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <Grid2 container spacing={2}>
              {/* Market Name */}
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Name
                </Typography>
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
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="marketType"
                    value={values.marketType}
                    onChange={handleChange}
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
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Logo/Display Picture
                </Typography>
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
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Description
                </Typography>
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

              {/* City */}
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  City
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "City" }}
                  >
                    <MenuItem value="">
                      <em>Select the City</em>
                    </MenuItem>
                    {fleaMarketCitiesInFinland.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {/* Location */}
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Location
                </Typography>
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
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Categories
                </Typography>
                <FormGroup row>
                  {fleaMarketCategories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          name="categories"
                          value={category}
                          checked={values.categories.includes(category)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            const updatedCategories = checked
                              ? [...values.categories, value]
                              : values.categories.filter(
                                  (item) => item !== value
                                );
                            setFieldValue("categories", updatedCategories);
                          }}
                        />
                      }
                      label={category}
                    />
                  ))}
                </FormGroup>
                {touched.categories && errors.categories && (
                  <FormHelperText error>{errors.categories}</FormHelperText>
                )}
              </Grid2>

              {/* Market Images */}
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Market Images
                </Typography>
                <MarketImagesSection
                  handleImageUpload={handleImageUpload}
                  imagePreviews={imagePreviews}
                />
              </Grid2>

              {/* Opening Hours */}
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Opening Hours
                </Typography>
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
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Pricing List
                </Typography>
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
