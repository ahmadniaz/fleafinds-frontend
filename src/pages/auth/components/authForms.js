import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Grid2,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // For validation
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../../components";

// Validation schemas for Signup and Login
const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthForm = () => {
  const navigate = useNavigate();
  const handleSignupSubmit = (values) => {
    // Signup API call logic
    console.log("Signup values:", values);
    navigate("/dashboard"); // Uncomment to redirect to the dashboard after signup
  };

  const handleLoginSubmit = (values) => {
    // Login API call logic
    console.log("Login values:", values);
    navigate("/dashboard"); // Uncomment to redirect to the dashboard after login
  };

  return (
    <Container maxWidth="lg">
      <Breadcrumb />
      <Box
        sx={{
          marginTop: "50px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        {/* Left Column - Signup Form */}
        <Box sx={{ flex: 1, padding: "20px" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#d32f2f"
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            Create Your Account
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignupSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid2 container spacing={2}>
                  <Grid2 item size={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="name"
                      label="Name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid2>
                  <Grid2 item size={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid2>
                  <Grid2 item size={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid2>
                  <Grid2 item size={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ padding: "10px 0", fontWeight: "bold" }}
                    >
                      Sign Up
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>

        {/* Vertical Separator with Prominent Border */}
        <Box
          sx={{
            width: "2px", // Width of the separator
            backgroundColor: "#1976d2", // Color of the border
            margin: "0 20px",
          }}
        />

        {/* Right Column - Login Form */}
        <Box sx={{ flex: 1, padding: "20px" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#d32f2f"
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            Login to Your Account
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid2 container spacing={2}>
                  <Grid2 item size={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid2>
                  <Grid2 item size={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid2>
                  <Grid2 item size={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ padding: "10px 0", fontWeight: "bold" }}
                    >
                      Login
                    </Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
