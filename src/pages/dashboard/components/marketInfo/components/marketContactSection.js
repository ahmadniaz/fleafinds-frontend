import React from "react";
import { Grid2, TextField } from "@mui/material";
import { Field } from "formik";
import { useLanguage } from "../../../../../context/LanguageContext";

const MarketContactSection = ({ touched, errors }) => {
  const { translations } = useLanguage();
  return (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketNumber"
          label={`${translations.MARKET_REGISTRATION.CONTACT_NUMBER}`}
          error={touched.marketNumber && Boolean(errors.marketNumber)}
          helperText={touched.marketNumber && errors.marketNumber}
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketEmail"
          label={`${translations.MARKET_REGISTRATION.CONTACT_EMAIL}`}
          error={touched.marketEmail && Boolean(errors.marketEmail)}
          helperText={touched.marketEmail && errors.marketEmail}
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketWebsite"
          label={`${translations.MARKET_REGISTRATION.MARKET_WEBSITE}`}
          error={touched.marketWebsite && Boolean(errors.marketWebsite)}
          helperText={touched.marketWebsite && errors.marketWebsite}
        />
      </Grid2>
    </Grid2>
  );
};

export default MarketContactSection;
