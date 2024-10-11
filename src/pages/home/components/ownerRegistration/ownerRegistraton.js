import React from "react";
import { TextField, Button, Box, Typography, Grid2 } from "@mui/material";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const OwnerRegistration = () => {
  // Initial Form Values
  const initialValues = {
    name: "",
    username: "",
    password: "",
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    username: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
  });

  // Submit Handler
  const onSubmit = (values) => {
    console.log("Form Submitted", values);
  };
  return (
    <Grid2 container spacing={1} direction="column">
      <Box>
        <Typography variant="h4" color="#f00404">
          Are you a Flea Market Owner?
        </Typography>

        <Typography variant="h6" color="#15a0db" align="center">
          Signup now to Register your Flea Market.
        </Typography>
      </Box>

      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "300px",
                  margin: "auto",
                  padding: "20px",
                }}
              >
                <Typography variant="h5" align="center">
                  Sign Up
                </Typography>

                {/* Name Field */}
                <Field name="name">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      error={form.touched.name && Boolean(form.errors.name)}
                      helperText={<ErrorMessage name="name" />}
                    />
                  )}
                </Field>

                {/* Username Field */}
                <Field name="username">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      label="Username"
                      variant="outlined"
                      fullWidth
                      error={
                        form.touched.username && Boolean(form.errors.username)
                      }
                      helperText={<ErrorMessage name="username" />}
                    />
                  )}
                </Field>

                {/* Password Field */}
                <Field name="password" type="password">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      label="Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      error={
                        form.touched.password && Boolean(form.errors.password)
                      }
                      helperText={<ErrorMessage name="password" />}
                    />
                  )}
                </Field>

                {/* Submit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid2>
  );
};

export default OwnerRegistration;
