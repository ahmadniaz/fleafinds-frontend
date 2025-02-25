import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [tabIndex, setTabIndex] = useState(0); // 0 for Login, 1 for Signup
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleSignupSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/owner/register`,
        values
      );
      console.log(response.data);
      navigate("/dashboard"); // Navigate to dashboard after successful registration
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setOpenSnackbar(true); // Show error message in Snackbar
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/owner/login`,
        values
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Store JWT token
      localStorage.setItem("ownerId", response.data.ownerId); // Store ownerId
      localStorage.setItem("name", response.data.name); // Store owner name
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials");
      setOpenSnackbar(true); // Show error message in Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: "60px",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f4f7fc",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Tabs for switching between Login and Signup */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            marginBottom: "20px",
            "& .MuiTab-root": {
              fontWeight: "bold",
              color: "#333",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "#e0e7ff",
              borderRadius: "20px",
              padding: "6px 20px",
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {/* Render Login Form when tabIndex is 0 */}
        {tabIndex === 0 && (
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#d32f2f"
              sx={{ mb: 3 }}
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
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(to right, #1d4ed8, #2563eb)",
                        color: "#fff",
                        padding: "12px 0",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #2563eb, #3b82f6)",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        )}

        {/* Render Signup Form when tabIndex is 1 */}
        {tabIndex === 1 && (
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#d32f2f"
              sx={{ mb: 3 }}
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
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="name"
                      label="Name"
                      variant="outlined"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(to right, #1d4ed8, #2563eb)",
                        color: "#fff",
                        padding: "12px 0",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #2563eb, #3b82f6)",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        )}
        {/* Snackbar for error messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AuthForm;
