import React, { useEffect, useState } from "react";
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
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";
import * as Yup from "yup";
import { CloudUpload } from "@mui/icons-material";
import MarketImagesSection from "./components/marketImagesSection";
import SocialMediaSection from "./components/socialMediaSection";
import { LoadingFallback } from "../../../../components";

// Validation schema for the dashboard form
const validationSchema = Yup.object({
  marketName: Yup.string().required("Market name is required"),
  description: Yup.string().required("Description is required"),
  marketType: Yup.string().required("Market Type is required"),
  city: Yup.string().required("City is required"),
  location: Yup.string().required("Location is required"),
  categories: Yup.array()
    .min(1, "At least one category is required")
    .required("Categories are required"),
  openingHours: Yup.string().required("Opening hours are required"),
  priceList: Yup.string().required("Price information is required"),
});

const MarketInfoForm = ({ setActiveForm, marketData, setUpdateMarket }) => {
  const [imagePreviews, setImagePreviews] = useState(Array(10).fill(null));
  const [logoPreview, setLogoPreview] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");
  const showSnackbar = useSnackbar();

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
  useEffect(() => {
    if (marketData) {
      setLogoPreview(marketData?.logo || null);
      setImagePreviews(marketData?.images || Array(10).fill(null));
      setSelectedCategories(marketData?.categories || []);
      setLatitude(marketData?.location?.coordinates[1] || null);
      setLongitude(marketData?.location?.coordinates[0] || null);
    }
  }, [marketData]);

  const handleCategoryChange = (event, setFieldValue, values) => {
    const { value } = event.target;
    const updatedCategories = values.categories.includes(value)
      ? values.categories.filter((category) => category !== value)
      : [...values.categories, value];

    setFieldValue("categories", updatedCategories);
  };

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fleafind_preset"); // Set in Cloudinary settings

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddnhd2ue9/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url; // Get URL from Cloudinary response

      setImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = imageUrl; // Store Cloudinary URL instead of Blob
        return newPreviews;
      });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleImageRemove = (index) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[index] = null; // Remove the image from the array
      return newPreviews;
    });
  };

  const handleLocationChange = async (event) => {
    const location = event.target.value;

    // Make a request to Nominatim geocoding API to get latitude and longitude for the location
    if (location) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const result = response.data[0];
        if (result) {
          setLatitude(result.lat);
          setLongitude(result.lon);
        } else {
          setLatitude(null);
          setLongitude(null);
          alert("Location not found");
        }
      } catch (error) {
        console.error("Error geocoding location:", error);
        setLatitude(null);
        setLongitude(null);
      }
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fleafind_preset"); // Set in Cloudinary settings

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddnhd2ue9/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url; // Get URL from Cloudinary response

      setLogoPreview(imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.marketName);
      formData.append("marketType", values.marketType);
      formData.append("description", values.description);
      formData.append("city", values.city);
      formData.append("location", values.location);
      formData.append("latitude", latitude); // Add latitude to form data
      formData.append("longitude", longitude); // Add longitude to form data
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("openingHours", values.openingHours);
      formData.append("priceList", values.priceList);
      formData.append("socialMedia", JSON.stringify(values.socialMedia));

      if (logoPreview) {
        formData.append("logo", logoPreview);
      }

      imagePreviews.forEach((image, index) => {
        if (image) {
          formData.append(`images`, image);
        }
      });

      if (marketData) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}api/market/update/${marketData?._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setLoading(false);
        showSnackbar("Market Updated Successfully", "success");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/market`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
        showSnackbar("Market Created Successfully", "success");
      }
      resetForm();
      setUpdateMarket(null);
      // Optionally, you can reset the preview state as well
      setLogoPreview(null);
      setImagePreviews([]);
      setActiveForm("home");
    } catch (error) {
      setLoading(false);
      console.error(
        "Error creating market:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Determine if the screen size is small (mobile view)

  return (
    <>
      {loading ? (
        <LoadingFallback />
      ) : (
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
            {marketData ? "Update Market Information" : "Create New Market"}
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} /> {/* Divider under the breadcrumb */}
          <Formik
            initialValues={{
              marketName: marketData?.name || "",
              marketType: marketData?.marketType || "",
              description: marketData?.description || "",
              city: marketData?.city || "",
              location: marketData?.location?.address || "",
              categories: marketData?.categories || [], // Use an array for categories
              openingHours: marketData?.openingHours || "",
              priceList: marketData?.priceList || "",
              socialMedia: {
                facebook: marketData?.socialMedia?.facebook || "",
                instagram: marketData?.socialMedia?.instagram || "",
                twitter: marketData?.socialMedia?.twitter || "",
              },
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { resetForm }) =>
              handleFormSubmit(data, { resetForm })
            }
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
                    <FormControl
                      fullWidth
                      error={touched.marketType && Boolean(errors.marketType)}
                    >
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
                      {touched.marketType && errors.marketType && (
                        <FormHelperText>{errors.marketType}</FormHelperText>
                      )}
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
                    <FormControl
                      fullWidth
                      error={touched.city && Boolean(errors.city)}
                    >
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
                      {touched.city && errors.city && (
                        <FormHelperText>{errors.city}</FormHelperText>
                      )}
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
                      label="Enter Location"
                      value={values.location}
                      onChange={(e) => {
                        handleChange(e);
                        handleLocationChange(e); // Trigger Nominatim API on change
                      }}
                      onBlur={handleBlur}
                      error={Boolean(touched.location && errors.location)}
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
                              onChange={(e) =>
                                handleCategoryChange(e, setFieldValue, values)
                              }
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
                      handleImageRemove={handleImageRemove}
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
                      error={
                        touched.openingHours && Boolean(errors.openingHours)
                      }
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
                      {marketData ? "Update" : "Submit Market Information"}
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Container>
      )}
    </>
  );
};

export default MarketInfoForm;
