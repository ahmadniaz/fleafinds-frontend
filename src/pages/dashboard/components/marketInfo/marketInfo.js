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
    // "Car Boot Sale",
    "Secondhand Store",
    "Donation Market",
    // "Antique Market",
    // "Handicraft Market",
    "Pop-up Market",
  ];

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  console.log(selectedCategories, "selected categories");

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
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginLeft: "270px",
        backgroundColor: "#f9f9f9",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ margin: "20px 0", textAlign: "center" }}
      >
        Market Information Form
      </Typography>

      {/* AppBar with Visit Website button and profile toggle */}
      <AppBar
        position="static"
        sx={{ marginBottom: "20px", backgroundColor: "#3f51b5" }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={handleProfileMenuOpen} sx={{ padding: "0" }}>
            <Avatar alt="Profile Picture" />
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

      <Formik
        initialValues={{
          marketName: "",
          description: "",
          location: "",
          categories: "",
          socialMedia: {
            facebook: "",
            instagram: "",
            twitter: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          // Add your submit logic here
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid2 container spacing={2}>
              {/* Market Name */}
              <Grid2 item size={12} mt={3}>
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

              {/* Market Name */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Select your flea market type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={selectedType}
                    onChange={handleTypeChange}
                    label="Select your flea market type"
                  >
                    {fleaMarketTypesInFinland.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {/* Logo Upload */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Upload Market Logo / Display Picture
                </Typography>
                <Grid2 container spacing={2}>
                  <Grid2 item size={{ xs: 6, sm: 4, md: 3 }}>
                    <Box
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        position: "relative",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt={`Logo`}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No Image Uploaded
                        </Typography>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleLogoUpload(event)}
                        style={{ display: "none" }}
                        id={`logo-upload`}
                      />
                      <label htmlFor={`logo-upload`}>
                        <IconButton
                          component="span"
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            left: "10%",
                            padding: "5px",
                            transform: "translateX(-50%)",
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#b71c1c",
                            },
                          }}
                        >
                          <CloudUpload />
                        </IconButton>
                      </label>
                    </Box>
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* Description */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Description
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

              {/* Location */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Location
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
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Categories (Select all that apply)
                </Typography>
                <FormGroup>
                  <Grid2 container spacing={2}>
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
                  </Grid2>
                </FormGroup>
              </Grid2>

              {/* Image Uploads */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Upload Market Images (up to 10)
                </Typography>
                <MarketImagesSection
                  handleImageUpload={handleImageUpload}
                  imagePreviews={imagePreviews}
                />
              </Grid2>

              {/* Social Media Links */}
              <Grid2 item size={12} mt={3}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Social Media Links
                </Typography>
                <SocialMediaSection errors={errors} touched={touched} />
              </Grid2>

              {/* Submit and Preview Buttons */}
              <Grid2
                item
                size={12}
                mt={3}
                sx={{ textAlign: "center", marginTop: "20px" }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: "10px" }}
                >
                  Preview
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
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
