import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid2,
  Select,
  MenuItem,
  IconButton,
  Container,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { CloudUpload, Cancel } from "@mui/icons-material";
import * as Yup from "yup";
import axios from "axios";
import { LoadingFallback } from "../../../../components";
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";

// Validation schema for the event creation form
const eventValidationSchema = Yup.object({
  eventName: Yup.string().required("Event name is required"),
  eventDescription: Yup.string().required("Event description is required"),
  eventDate: Yup.date().required("Event date is required"),
  eventTime: Yup.string().required("Event time is required"),
  eventLocation: Yup.string().required("Event location is required"),
  eventCategory: Yup.string().required("Event category is required"),
});

const EventForm = ({
  setActiveForm,
  ownerAllMarkets,
  updateEventData,
  setUpdateEvent,
}) => {
  console.log(updateEventData, "UPDATE");
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [eventImage, setEventImage] = useState(null);
  const [selectedMarkets, setSelectedMarkets] = useState(
    updateEventData?.markets || [] // Initialize selectedMarkets from updateEventData if available
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (updateEventData) {
      setEventImage(updateEventData?.eventImage);
    }
  }, [updateEventData]);

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

      setEventImage({ url: imageUrl, publicId });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleImageRemove = async () => {
    if (eventImage?.publicId) {
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/ddnhd2ue9/image/destroy`,
          {
            public_id: eventImage.publicId,
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

    setEventImage(null);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        eventImage: JSON.stringify(eventImage), // No need to stringify if sending JSON
        marketIds: selectedMarkets, // Ensure this is an array
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Correct content type for JSON
      };

      const url = updateEventData
        ? `${process.env.REACT_APP_API_URL_LOCAL}api/event/update/${updateEventData?._id}`
        : `${process.env.REACT_APP_API_URL_LOCAL}api/event`;

      await axios({
        method: updateEventData ? "put" : "post",
        url,
        data: payload, // Corrected from `body` to `data`
        headers,
      });

      setLoading(false);
      showSnackbar(
        updateEventData
          ? "Event Updated Successfully"
          : "Event Created Successfully",
        "success"
      );
      resetForm();
      setUpdateEvent(null);
      setEventImage(null);
      setActiveForm("home");
    } catch (error) {
      console.error("Error submitting form:", error);
      showSnackbar(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarketChange = (event) => {
    const value = event.target.value;
    if (value.includes("all")) {
      setSelectedMarkets(
        selectedMarkets.length === ownerAllMarkets?.length
          ? []
          : ownerAllMarkets?.map((m) => m._id)
      );
    } else {
      setSelectedMarkets(value);
    }
  };

  return (
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
        variant="h4"
        fontWeight="bold"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#333",
        }}
      >
        {updateEventData ? "Update Event" : "Create a New Event"}
      </Typography>
      {loading ? (
        <LoadingFallback />
      ) : (
        <Formik
          initialValues={{
            eventName: updateEventData?.name || "",
            eventDescription: updateEventData?.description || "",
            eventDate: updateEventData?.date
              ? new Date(updateEventData.date).toISOString().split("T")[0] // Convert to YYYY-MM-DD format
              : "",
            eventTime: updateEventData?.time || "",
            eventLocation: updateEventData?.location || "",
            eventCategory: updateEventData?.eventType || "",
          }}
          validationSchema={eventValidationSchema}
          // onSubmit={(data, { resetForm }) => handleSubmit(data, { resetForm })}
          onSubmit={(data, { resetForm }) => handleSubmit(data, { resetForm })}
        >
          {({ setFieldValue, touched, errors }) => (
            <Form>
              <Grid2 container spacing={2}>
                {/* Event Name */}
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Name
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventName"
                    label="Event Name"
                    error={touched.eventName && Boolean(errors.eventName)}
                    helperText={touched.eventName && errors.eventName}
                  />
                </Grid2>

                {/* Event Market */}
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Select Market for the Event
                  </Typography>
                  <Select
                    fullWidth
                    multiple
                    name="markets"
                    label="Select Market for the Event"
                    value={selectedMarkets}
                    onChange={(event) => handleMarketChange(event)}
                    renderValue={(selected) =>
                      selected.length === ownerAllMarkets?.length
                        ? "All Markets"
                        : selected
                            .map(
                              (id) =>
                                ownerAllMarkets.find((m) => m._id === id)?.name
                            )
                            .join(", ")
                    }
                  >
                    <MenuItem value="all">
                      <Checkbox
                        checked={
                          selectedMarkets.length === ownerAllMarkets?.length
                        }
                      />
                      <ListItemText primary="All Markets" />
                    </MenuItem>
                    {ownerAllMarkets?.map((market) => (
                      <MenuItem key={market._id} value={market._id}>
                        <Checkbox
                          checked={selectedMarkets.includes(market._id)}
                        />
                        <ListItemText primary={market.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </Grid2>

                {/* Event Image Upload */}
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Image
                  </Typography>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      position: "relative",
                      textAlign: "center",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    {eventImage ? (
                      <img
                        src={eventImage?.url}
                        alt="Event"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Upload Event Image
                      </Typography>
                    )}

                    {/* Close (remove) button */}
                    {eventImage && (
                      <IconButton
                        onClick={handleImageRemove}
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "#d32f2f",
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
                      id="event-image-upload"
                    />
                    <label htmlFor="event-image-upload">
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

                {/* Event Description */}
                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Description
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventDescription"
                    label="Event Description"
                    multiline
                    rows={4}
                    error={
                      touched.eventDescription &&
                      Boolean(errors.eventDescription)
                    }
                    helperText={
                      touched.eventDescription && errors.eventDescription
                    }
                  />
                </Grid2>

                {/* Event Date */}
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Date
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventDate"
                    label="Event Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.eventDate && Boolean(errors.eventDate)}
                    helperText={touched.eventDate && errors.eventDate}
                  />
                </Grid2>

                {/* Event Time */}
                <Grid2 item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Time
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventTime"
                    label="Event Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.eventTime && Boolean(errors.eventTime)}
                    helperText={touched.eventTime && errors.eventTime}
                  />
                </Grid2>

                {/* Event Location */}
                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Location
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="eventLocation"
                    label="Event Location"
                    error={
                      touched.eventLocation && Boolean(errors.eventLocation)
                    }
                    helperText={touched.eventLocation && errors.eventLocation}
                  />
                </Grid2>

                {/* Event Category */}
                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Event Category
                  </Typography>
                  <Field
                    as={Select}
                    fullWidth
                    name="eventCategory"
                    label="Event Category"
                    displayEmpty
                    error={
                      touched.eventCategory && Boolean(errors.eventCategory)
                    }
                    helperText={touched.eventCategory && errors.eventCategory}
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    <MenuItem value="Market">Market</MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Art">Art</MenuItem>
                  </Field>
                </Grid2>

                {/* Submit Button */}
                <Grid2
                  item
                  size={{ xs: 12 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ padding: "10px 20px", fontWeight: "bold" }}
                    disabled={loading}
                  >
                    {updateEventData ? "Update" : "Create Event"}
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default EventForm;
