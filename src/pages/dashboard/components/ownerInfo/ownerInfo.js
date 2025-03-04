import React, { useState } from "react";
import { TextField, Typography, Button, Grid2, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LoadingFallback } from "../../../../components";
import { useSnackbar } from "../../../../components/snackbar/customSnackBar";
import { useLanguage } from "../../../../context/LanguageContext";

const OwnerInfoForm = () => {
  const ownerId = localStorage.getItem("ownerId");
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { translations } = useLanguage();

  // Validation schema for changing email and password
  const changeInfoValidationSchema = Yup.object({
    email: Yup.string().email(`${translations.FIELD_ERRORS.OWNER_INVALID_EMAIL}`).required(`${translations.FIELD_ERRORS.OWNER_EMAIL}`),
    currentPassword: Yup.string().required(`${translations.FIELD_ERRORS.OWNER_CURRENT_PASSWORD}`),
    newPassword: Yup.string()
      .min(6, `${translations.FIELD_ERRORS.OWNER_PASSWORD_MIN}`)
      .required(`${translations.FIELD_ERRORS.OWNER_NEW_PASSWORD}`),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], `${translations.FIELD_ERRORS.OWNER_PASSWORD_MATCH}`)
      .required(`${translations.FIELD_ERRORS.OWNER_CONFIRM_PASSWORD}`),
  });

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
      showSnackbar(`${translations.SNACKBARS.OWNER_UPDATE}`, "success");
    } catch (error) {
      console.error(error);
      showSnackbar(error.message, "error");
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
        {translations.OWNER_INFO.UPDATE_YOUR_INFO}
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
                  {translations.OWNER_INFO.EMAIL_ADDRESS}
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label={`${translations.OWNER_INFO.EMAIL_ADDRESS}`}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  {translations.OWNER_INFO.CURRENT_PASSWORD}
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="currentPassword"
                    label={`${translations.OWNER_INFO.CURRENT_PASSWORD}`}
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
                  {translations.OWNER_INFO.NEW_PASSWORD}
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="newPassword"
                    label={`${translations.OWNER_INFO.NEW_PASSWORD}`}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid2>

                <Grid2 item size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  {translations.OWNER_INFO.CONFIRM_PASSWORD}
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label={`${translations.OWNER_INFO.CONFIRM_PASSWORD}`}
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
                    {translations.OWNER_INFO.SAVE_CHANGES}
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
