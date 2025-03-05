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
  Divider,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";
import * as Yup from "yup";
import { CloudUpload, Cancel } from "@mui/icons-material";
import MarketImagesSection from "./components/marketImagesSection";
import SocialMediaSection from "./components/socialMediaSection";
import { LoadingFallback } from "../../../../components";
import MarketContactSection from "./components/marketContactSection";
import { useLanguage } from "../../../../context/LanguageContext";

const MarketInfoForm = ({ setActiveForm, marketData, setUpdateMarket }) => {
  const [imagePreviews, setImagePreviews] = useState(Array(10).fill(null));
  const [logoPreview, setLogoPreview] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const showSnackbar = useSnackbar();
  const { translations } = useLanguage();

  // Validation schema for the dashboard form
  //previously this was outside of the const MarketInfoForm
  const validationSchema = Yup.object({
    marketName: Yup.string().required(
      `${translations.FIELD_ERRORS.MARKET_NAME}`
    ),
    marketType: Yup.string().required(`${translations.FIELD_ERRORS.TYPE}`),
    city: Yup.string().required(`${translations.FIELD_ERRORS.MARKET_CITY}`),
    location: Yup.string().required(
      `${translations.FIELD_ERRORS.MARKET_LOCATION}`
    ),
    categories: Yup.array()
      .min(1, `${translations.FIELD_ERRORS.MARKET_CATEGORY_MIN}`)
      .required(`${translations.FIELD_ERRORS.MARKET_CATEGORY}`),
    openingHours: Yup.string().required(
      `${translations.FIELD_ERRORS.MARKET_HOURS}`
    ),
    marketNumber: Yup.string().matches(
      /^\+?\d{10,15}$/,
      `${translations.FIELD_ERRORS.MARKET_CONTACT_NUMBER}`
    ),
    marketEmail: Yup.string().email(
      `${translations.FIELD_ERRORS.MARKET_EMAIL}`
    ),
    marketWebsite: Yup.string().matches(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      `${translations.FIELD_ERRORS.MARKET_URL}`
    ),
  });

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
    formData.append("upload_preset", "fleafind_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddnhd2ue9/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      const publicId = response.data.public_id; // Get public_id for deletion

      setImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = { url: imageUrl, publicId }; // Store both URL & public_id
        return newPreviews;
      });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleImageRemove = async (index) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      const publicId = newPreviews[index]?.publicId;

      if (publicId) {
        axios
          .post(
            `https://api.cloudinary.com/v1_1/ddnhd2ue9/image/destroy`,
            {
              public_id: publicId,
            },
            {
              auth: {
                username: process.env.REACT_APP_CLOUDINARY_KEY,
                password: process.env.REACT_APP_CLOUDINARY_SECRET,
              },
            }
          )
          .then(() => console.log("Image deleted from Cloudinary"))
          .catch((error) => console.error("Failed to delete image", error));
      }

      newPreviews[index] = null; // Remove from state
      return newPreviews;
    });
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fleafind_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddnhd2ue9/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      const publicId = response.data.public_id; // Get public_id for deletion

      setLogoPreview({ url: imageUrl, publicId });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleLogoRemove = async () => {
    if (logoPreview?.publicId) {
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/ddnhd2ue9/image/destroy`,
          {
            public_id: logoPreview.publicId,
          },
          {
            auth: {
              username: "YOUR_CLOUDINARY_API_KEY",
              password: "YOUR_CLOUDINARY_API_SECRET",
            },
          }
        )
        .then(() => console.log("Logo deleted from Cloudinary"))
        .catch((error) => console.error("Failed to delete logo", error));
    }

    setLogoPreview(null);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const noImageUploaded = imagePreviews.every((image) => image === null);
    if (!logoPreview) {
      showSnackbar(
        `Logo is required. If you dont have logo just upload display picture of market`,
        "error"
      );
    }
    if (noImageUploaded) {
      showSnackbar(`At least upload one image for the market.`, "error");
    }
    if (logoPreview && noImageUploaded) {
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
        formData.append("categories", JSON.stringify(values.categories));
        formData.append("openingHours", values.openingHours);
        formData.append("priceList", values.priceList);
        formData.append("socialMedia", JSON.stringify(values.socialMedia));
        formData.append("marketNumber", values.marketNumber);
        formData.append("marketEmail", values.marketEmail);
        formData.append("marketWebsite", values.marketWebsite);

        if (logoPreview) {
          formData.append(
            "logo",
            JSON.stringify({
              url: logoPreview?.url, // If it's a string URL, use it directly
              publicId: logoPreview?.publicId, // Ensure the publicId is included
            })
          );
        }

        // Handle images
        if (imagePreviews?.length > 0) {
          imagePreviews.forEach((image, index) => {
            if (image) {
              formData.append(
                "images",
                JSON.stringify({
                  url: image.url,
                  publicId: image.publicId,
                })
              );
            }
          });
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure multipart/form-data
        };

        const url = marketData
          ? `${process.env.REACT_APP_API_URL}api/market/update/${marketData?._id}`
          : `${process.env.REACT_APP_API_URL}api/market`;

        await axios({
          method: marketData ? "put" : "post",
          url,
          data: formData,
          headers,
        });

        setLoading(false);
        showSnackbar(
          marketData
            ? `${translations.MARKET_REGISTRATION.MARKET_UPDATED}`
            : `${translations.MARKET_REGISTRATION.MARKET_CREATED}`,
          "success"
        );
        resetForm();
        setUpdateMarket(null);
        setLogoPreview(null);
        setImagePreviews([]);
        setActiveForm("home");
      } catch (error) {
        setLoading(false);
        if (error?.status === 400) {
          showSnackbar(error?.response?.data?.message, "error");
        } else {
          showSnackbar(
            "There was a problem creating the Market. Please try again",
            "error"
          );
        }

        console.error(
          "Error creating market:",
          error.response ? error.response.data : error.message
        );
      }
    }
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
          alert(`${translations.FIELD_ERRORS.LOCATION_NOT_FOUND}`);
        }
      } catch (error) {
        console.error("Error geocoding location:", error);
        setLatitude(null);
        setLongitude(null);
      }
    }
  };

  const normalizedLogoPreview =
    typeof logoPreview === "string" ? logoPreview : logoPreview?.url;

  // Determine if the screen size is small (mobile view)

  return (
    <>
      {loading ? (
        <LoadingFallback />
      ) : (
        <Container
          sx={{
            marginLeft: { xs: 0, sm: 0, md: "270px" }, // Responsive margin
            padding: { xs: "10px", sm: "20px", md: "30px" }, // Responsive padding
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: { xs: "100%", sm: "90%" }, // Responsive width
            marginX: "auto", // Center the form
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ margin: "15px 0", textAlign: "center" }}
          >
            {marketData
              ? `${translations.MARKET_REGISTRATION.UPDATE_MARKET_INFO}`
              : `${translations.MARKET_REGISTRATION.CREATE_NEW_MARKET}`}
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
              marketNumber: marketData?.marketNumber || "",
              marketEmail: marketData?.marketEmail || "",
              marketWebsite: marketData?.marketWebsite || "",
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
                      {translations.MARKET_REGISTRATION.MARKET_NAME}
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      name="marketName"
                      label={`${translations.MARKET_REGISTRATION.MARKET_NAME}`}
                      error={touched.marketName && Boolean(errors.marketName)}
                      helperText={touched.marketName && errors.marketName}
                    />
                  </Grid2>

                  {/* Market Type */}
                  <Grid2 item size={{ xs: 12 }}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {translations.MARKET_REGISTRATION.MARKET_TYPE}
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
                        inputProps={{
                          "aria-label": `${translations.MARKET_REGISTRATION.MARKET_TYPE}`,
                        }}
                      >
                        <MenuItem value="">
                          <em>
                            {" "}
                            {
                              translations.MARKET_REGISTRATION
                                .SELECT_MARKET_TYPE
                            }{" "}
                          </em>
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
                      {translations.MARKET_REGISTRATION.MARKET_LOGO}
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
                      {normalizedLogoPreview ? (
                        <img
                          src={normalizedLogoPreview}
                          alt="Logo"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          {translations.MARKET_REGISTRATION.UPLOAD_MARKET_LOGO}
                        </Typography>
                      )}

                      {/* Close (remove) button */}
                      {normalizedLogoPreview && (
                        <IconButton
                          onClick={handleLogoRemove}
                          sx={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "primary.main",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#b71c1c",
                            },
                          }}
                        >
                          <Cancel />
                        </IconButton>
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
                      {translations.MARKET_REGISTRATION.MARKET_DESCRIPTION}
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      name="description"
                      label={`${translations.MARKET_REGISTRATION.DESCRIPTION}`}
                      multiline
                      rows={4}
                    />
                  </Grid2>

                  {/* City */}
                  <Grid2 item size={{ xs: 12 }}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {translations.MARKET_REGISTRATION.CITY}
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
                        inputProps={{
                          "aria-label": `${translations.MARKET_REGISTRATION.CITY}`,
                        }}
                      >
                        <MenuItem value="">
                          <em>
                            {" "}
                            {translations.MARKET_REGISTRATION.SELECT_CITY}{" "}
                          </em>
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
                      {translations.MARKET_REGISTRATION.MARKET_LOCATION}
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      name="location"
                      label={`${translations.MARKET_REGISTRATION.ENTER_LOCATION}`}
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
                      {translations.MARKET_REGISTRATION.CATEGORIES}
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
                      {translations.MARKET_REGISTRATION.MARKET_IMAGES}
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
                      {translations.MARKET_REGISTRATION.OPENING_HOURS}
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      name="openingHours"
                      label={`${translations.MARKET_REGISTRATION.OPENING_DAYS_HOURS}`}
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
                      {translations.MARKET_REGISTRATION.PRICING_LIST}
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      name="priceList"
                      label={translations.MARKET_REGISTRATION.PRICING_LIST}
                      multiline
                      rows={4}
                    />
                  </Grid2>

                  {/* Social Media Links */}
                  <Grid2 item size={{ xs: 12 }} mt={3}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {translations.MARKET_REGISTRATION.SOCIAL_MEDIA}
                    </Typography>
                    <SocialMediaSection errors={errors} touched={touched} />
                  </Grid2>

                  {/* Market Contact Info*/}
                  <Grid2 item size={{ xs: 12 }} mt={3}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {translations.MARKET_REGISTRATION.CONTACT_INFO}
                    </Typography>
                    <MarketContactSection touched={touched} errors={errors} />
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
                      {marketData
                        ? `${translations.MARKET_REGISTRATION.UPDATE}`
                        : `${translations.MARKET_REGISTRATION.SUBMIT_INFO}`}
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
