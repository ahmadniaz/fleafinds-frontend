import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "../../../components/snackbar/customSnackBar";
import { LoadingFallback } from "../../../components";
import { useLanguage } from "../../../context/LanguageContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0); // 0 for Login, 1 for Signup
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { loginTab, registerTab } = location?.state;

  useEffect(() => {
    if (loginTab) {
      setTabIndex(loginTab);
    } else if (registerTab) {
      setTabIndex(registerTab);
    } else {
      setTabIndex(0);
    }
  }, [loginTab, registerTab]);
  const { translations } = useLanguage();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // Validation schemas for Signup and Login
  const signupValidationSchema = Yup.object({
    name: Yup.string().required(`${translations.FIELD_ERRORS.OWNER_NAME}`),
    email: Yup.string()
      .email(`${translations.FIELD_ERRORS.OWNER_INVALID_EMAIL}`)
      .required(`${translations.FIELD_ERRORS.OWNER_EMAIL}`),
    password: Yup.string()
      .min(6, `${translations.FIELD_ERRORS.OWNER_PASSWORD_MIN}`)
      .required(`${translations.FIELD_ERRORS.OWNER_PASSWORD}`),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email(`${translations.FIELD_ERRORS.OWNER_INVALID_EMAIL}`)
      .required(`${translations.FIELD_ERRORS.OWNER_EMAIL}`),
    password: Yup.string()
      .min(6, `${translations.FIELD_ERRORS.OWNER_PASSWORD_MIN}`)
      .required(`${translations.FIELD_ERRORS.OWNER_PASSWORD}`),
  });
  const handleSignupSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/owner/register`,
        values
      );
      console.log(response.data);
      showSnackbar(`${translations.SNACKBARS.REGISTER_SUCCESS}`, "success");
      navigate("/dashboard"); // Navigate to dashboard after successful registration
    } catch (error) {
      console.log(error, "EROR");
      if (error?.status === 400) {
        showSnackbar(error?.response?.data?.message, "error");
      } else {
        showSnackbar(
          "Unable to Register at this moment. Please try again",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/owner/login`,
        values
      );
      localStorage.setItem("token", response.data.token); // Store JWT token
      localStorage.setItem("ownerId", response.data.ownerId); // Store ownerId
      localStorage.setItem("name", response.data.name); // Store owner name
      showSnackbar(`${translations.SNACKBARS.LOGIN_SUCCESS}`, "success");
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } catch (error) {
      if (error?.status === 400) {
        showSnackbar(error?.response?.data?.message, "error");
      } else {
        showSnackbar(
          "Unable to Login at this moment. Please try again",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
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
          <Tab label={`${translations.AUTH_PAGE.LOGIN_BUTTON}`} />
          <Tab label={`${translations.AUTH_PAGE.REGISTER_BUTTON}`} />
        </Tabs>

        {/* Render Login Form when tabIndex is 0 */}
        {tabIndex === 0 && (
          <>
            {loading ? (
              <LoadingFallback />
            ) : (
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#d32f2f"
                  sx={{ mb: 3 }}
                >
                  {translations.AUTH_PAGE.LOGIN_TITLE}
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
                          label={`${translations.AUTH_PAGE.LOGIN_TEXTFIELD1}`}
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
                          label={`${translations.AUTH_PAGE.LOGIN_TEXTFIELD2}`}
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
                          {translations.AUTH_PAGE.LOGIN_BUTTON}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
          </>
        )}

        {/* Render Signup Form when tabIndex is 1 */}
        {tabIndex === 1 && (
          <>
            {loading ? (
              <LoadingFallback />
            ) : (
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#d32f2f"
                  sx={{ mb: 3 }}
                >
                  {translations.AUTH_PAGE.REGISTER_TITLE}
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
                          label={`${translations.AUTH_PAGE.REGISTER_TEXTFIELD1}`}
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
                          label={`${translations.AUTH_PAGE.REGISTER_TEXTFIELD2}`}
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
                          label={`${translations.AUTH_PAGE.REGISTER_TEXTFIELD3}`}
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
                          {translations.AUTH_PAGE.REGISTER_BUTTON}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
