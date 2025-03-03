import React, { useState } from "react";
import { TextField, Typography, Button, Grid2, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LoadingFallback } from "../../../../components";
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";

// Validation schema for changing email and password
const changeInfoValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm new password is required"),
});

const OwnerInfoForm = () => {
  const ownerId = localStorage.getItem("ownerId");
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Make API call to update the owner information
      await axios.put(`${process.env.REACT_APP_API_URL}api/owner/update`, {
        ownerId,
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      showSnackbar("Information Updated Successfully", "success");
    } catch (error) {
      console.error(error);
      if (error?.status === 400) {
        showSnackbar(error?.response?.data?.message, "error");
      } else {
        showSnackbar(
          "There was a problem updating the password. Please try again",
          "error"
        );
      }
    } finally {
      setLoading(false);
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
          margin: "20px 0",
          textAlign: "center",
          mt: { xs: 5, sm: 5, md: 5 },
        }}
      >
        Update Your Information
      </Typography>
      {loading ? (
        <LoadingFallback />
      ) : (
        <Formik
          initialValues={{
            email: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changeInfoValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid2 container spacing={2}>
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
                    Current Password
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="currentPassword"
                    label="Current Password"
                    error={
                      touched.currentPassword && Boolean(errors.currentPassword)
                    }
                    helperText={
                      touched.currentPassword && errors.currentPassword
                    }
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    New Password
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="newPassword"
                    label="New Password"
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    Confirm New Password
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                    Save Changes
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

export default OwnerInfoForm;
