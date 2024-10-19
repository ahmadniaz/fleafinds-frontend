import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Fade,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";

const GallerySection = ({ testMarketData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpenModal = (img) => {
    setSelectedImg(img);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImg(null);
  };

  const HeaderTypography = styled(Typography)({
    color: "#15a0db",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "20px",
    borderBottom: "2px solid #ff0000",
  });
  return (
    <>
      <Card>
        <CardContent>
          <HeaderTypography variant="h5">Gallery</HeaderTypography>
          <Grid2 container spacing={2} p={2} justifyContent="center">
            {testMarketData.images.map((img, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Box position="relative">
                  <Box
                    component="img"
                    src={img}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)", // Scale effect on hover
                      },
                    }}
                    alt={`Market Image ${index + 1}`}
                  />

                  {/* Overlay with Eye Icon */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.6)", // Dark overlay
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        opacity: 1, // Show overlay on hover
                      },
                    }}
                  >
                    <IconButton onClick={() => handleOpenModal(img)}>
                      <VisibilityIcon sx={{ fontSize: 40, color: "white" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>

      {/* Modal for Previewing Images */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              component="img"
              src={selectedImg}
              sx={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
              alt="Selected Image"
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default GallerySection;
