import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Grid2, TextField } from "@mui/material";
import { Field } from "formik";

const SocialMediaSection = ({ touched, errors }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 item size={4}>
        <Field
          as={TextField}
          fullWidth
          name="socialMedia.facebook"
          label="Facebook"
          InputProps={{
            startAdornment: (
              <Facebook sx={{ color: "#3b5998", marginRight: "10px" }} />
            ),
          }}
          error={
            touched.socialMedia?.facebook &&
            Boolean(errors.socialMedia?.facebook)
          }
          helperText={
            touched.socialMedia?.facebook && errors.socialMedia?.facebook
          }
        />
      </Grid2>
      <Grid2 item size={4}>
        <Field
          as={TextField}
          fullWidth
          name="socialMedia.instagram"
          label="Instagram"
          InputProps={{
            startAdornment: (
              <Instagram sx={{ color: "#C13584", marginRight: "10px" }} />
            ),
          }}
          error={
            touched.socialMedia?.instagram &&
            Boolean(errors.socialMedia?.instagram)
          }
          helperText={
            touched.socialMedia?.instagram && errors.socialMedia?.instagram
          }
        />
      </Grid2>
      <Grid2 item size={4}>
        <Field
          as={TextField}
          fullWidth
          name="socialMedia.twitter"
          label="Twitter"
          InputProps={{
            startAdornment: (
              <Twitter sx={{ color: "#1DA1F2", marginRight: "10px" }} />
            ),
          }}
          error={
            touched.socialMedia?.twitter && Boolean(errors.socialMedia?.twitter)
          }
          helperText={
            touched.socialMedia?.twitter && errors.socialMedia?.twitter
          }
        />
      </Grid2>
    </Grid2>
  );
};

export default SocialMediaSection;
