import React from "react";
import { CloudUpload, Cancel } from "@mui/icons-material";
import { Box, Grid2, IconButton, Typography } from "@mui/material";

const MarketImagesSection = ({
  imagePreviews,
  handleImageUpload,
  handleImageRemove,
}) => {
  // Normalize imagePreviews: If it's an array of objects, extract the URLs.
  const normalizedPreviews = Array.isArray(imagePreviews)
    ? imagePreviews?.every((item) => typeof item === "string")
      ? imagePreviews // Old schema (array of strings)
      : imagePreviews?.map((image) => image?.url) // New schema (array of objects)
    : [];

  return (
    <Grid2 container spacing={2}>
      {normalizedPreviews.map((preview, index) => (
        <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={index}>
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              position: "relative",
              backgroundColor: "#fafafa",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt={`Market${index + 1}`}
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Image Uploaded
              </Typography>
            )}

            {/* Close (remove) button */}
            {preview && (
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
                  position: "absolute",
                  bottom: "0",
                  left: "10%",
                  padding: "5px",
                  transform: "translateX(-50%)",
                  backgroundColor: "#d32f2f",
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
