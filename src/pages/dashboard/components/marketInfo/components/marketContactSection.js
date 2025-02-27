import React from "react";
import { Grid2, TextField } from "@mui/material";
import { Field } from "formik";

const MarketContactSection = ({ touched, errors }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketNumber"
          label="Contact Number"
          error={touched.marketNumber && Boolean(errors.marketNumber)}
          helperText={touched.marketNumber && errors.marketNumber}
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketEmail"
          label="Contact Email"
          error={touched.marketEmail && Boolean(errors.marketEmail)}
          helperText={touched.marketEmail && errors.marketEmail}
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
        <Field
          as={TextField}
          fullWidth
          name="marketWebsite"
          label="Market Website"
          error={touched.marketWebsite && Boolean(errors.marketWebsite)}
          helperText={touched.marketWebsite && errors.marketWebsite}
        />
      </Grid2>
    </Grid2>
  );
};

export default MarketContactSection;
