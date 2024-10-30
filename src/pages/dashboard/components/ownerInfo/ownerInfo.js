import React from "react";
import { Box, TextField, Typography, Button, Grid2 } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation schema for Owner Information form
const ownerInfoValidationSchema = Yup.object({
  ownerName: Yup.string().required("Owner's name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const OwnerInfoForm = () => {
  return (
    <Box
      sx={{
        marginLeft: { xs: 0, sm: 0, md: "270px" }, // Responsive margin
        padding: { xs: "10px", sm: "20px", md: "30px" }, // Responsive padding
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        width: { xs: "100%", sm: "90%" }, // Responsive width
        // maxWidth: "600px", // Max width for larger screens
        marginX: "auto", // Center the form
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          margin: "20px 0",
          textAlign: "center",
          mt: { xs: 5, sm: 5, md: 5 },
        }}
      >
        Owner Contact Information Form
      </Typography>
      <Formik
        initialValues={{
          ownerName: "",
          email: "",
          phone: "",
          address: "",
        }}
        validationSchema={ownerInfoValidationSchema}
        onSubmit={(values) => {
          console.log("Owner Info submitted with values:", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Owner Name
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  name="ownerName"
                  label="Owner's Name"
                  error={touched.ownerName && Boolean(errors.ownerName)}
                  helperText={touched.ownerName && errors.ownerName}
                />
              </Grid2>

              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Email Address
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid2>

              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Mobile Number
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  name="phone"
                  label="Phone"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid2>

              <Grid2 item size={{ xs: 12 }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Contact Address
                </Typography>
                <Field
                  as={TextField}
                  fullWidth
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid2>

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
                >
                  Save
                </Button>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OwnerInfoForm;
