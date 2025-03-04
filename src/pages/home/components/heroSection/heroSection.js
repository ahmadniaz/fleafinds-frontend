import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import bgFleaMarket from "../../../../assets/images/fleaMarketbg.jpg";
import heroImage2 from "../../../../assets/images/heroSection2.jpg";
import heroImage3 from "../../../../assets/images/heroSection3.jpg";
import { useLanguage } from "../../../../context/LanguageContext";

const images = [bgFleaMarket, heroImage2, heroImage3];

const HeroSection = ({ citiesRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { translations, changeLanguage } = useLanguage();
  // Auto-transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const scrollToCities = () => {
    citiesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "85vh",
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image Carousel */}
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: index === currentIndex ? "absolute" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
              zIndex: 1,
            },
          }}
        />
      ))}

      {/* Overlay Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          {translations.HEROSECTION.TITLE}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4, fontSize: "1.2rem" }}>
        {translations.HEROSECTION.SUBTITLE}
        </Typography>

        <Link to="#cities-section" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff0000",
              color: "#fff",
              paddingX: 4,
              paddingY: 1.5,
              fontSize: "1.1rem",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(255, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "#15a0db",
                boxShadow: "0 6px 18px rgba(21, 160, 219, 0.4)",
              },
            }}
            onClick={scrollToCities}
          >
            {translations.HEROSECTION.BUTTON}
          </Button>
        </Link>

        {/* Scroll indicator */}
        <Typography
          variant="body2"
          sx={{ mt: 4, color: "#fff", fontStyle: "italic" }}
        >
          {translations.HEROSECTION.SCROLL}
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
