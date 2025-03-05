import React from "react";
import { CloudUpload, Cancel } from "@mui/icons-material";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import { useLanguage } from "../../../../../context/LanguageContext";

const MarketImagesSection = ({
  imagePreviews = [],
  handleImageUpload,
  handleImageRemove,
}) => {
  const { translations } = useLanguage();
  const totalSlots = 10;

  return (
    <Grid2 container spacing={2}>
      {[...Array(totalSlots)].map((_, index) => (
        <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={index}>
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              position: "relative",
              backgroundColor: "#fafafa",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imagePreviews[index] ? (
              <>
                <img
                  src={imagePreviews[index]?.url}
                  alt={`Market${index + 1}`}
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "8px",
                  }}
                />

                {/* Close button */}
                <IconButton
                  onClick={() => handleImageRemove(index)}
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                >
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary">
                {translations.MARKET_REGISTRATION.NO_IMAGE}
              </Typography>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, index)}
              style={{ display: "none" }}
              id={`image-upload-${index}`}
            />
            <label htmlFor={`image-upload-${index}`}>
              <IconButton
                component="span"
                sx={{
                  marginTop: imagePreviews[index] ? "10px" : "auto",
                  backgroundColor: "primary.main",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#b71c1c",
                  },
                }}
              >
                <CloudUpload />
              </IconButton>
            </label>
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MarketImagesSection;
