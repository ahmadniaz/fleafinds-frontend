import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid2,
} from "@mui/material";
import { HomeNav } from "../../layout/components/header/components";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import discoverMarkets from "../../assets/images/discoverMarkets.jpg";
import ourMission from "../../assets/images/ourMission.png";
import whoWeAre from "../../assets/images/whoWeAre.png";
import whyChooseUs from "../../assets/images/whyChooseUs.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../../layout/components/footer/footer";
import { useLanguage } from "../../context/LanguageContext";

// Styled Components
const Root = styled("div")({
  backgroundColor: "#f7f7f7",
  minHeight: "100vh",
});

const HeroSection = styled(Box)({
  position: "relative",
  backgroundImage: `url(${discoverMarkets})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  textAlign: "center",
  padding: "120px 20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  "& *": {
    position: "relative",
    zIndex: 2,
  },
});

const Section = styled(Paper)({
  margin: "32px 0",
  padding: "40px 24px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  backgroundColor: "#fff",
  overflow: "hidden",
});

const Title = styled(Typography)({
  color: "#15a0db",
  marginBottom: "16px",
  fontWeight: "bold",
  borderBottom: "2px solid #ff0000",
  display: "inline-block",
});

const Subtitle = styled(Typography)({
  marginBottom: "24px",
  fontSize: "18px",
  lineHeight: "1.6",
});

const CustomButton = styled(Button)({
  backgroundColor: "#15a0db",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#ff0000",
  },
  padding: "12px 40px",
  fontSize: "18px",
  borderRadius: "6px",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const Image = styled("img")({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "8px",
});

const TestimonialsSection = styled(Box)({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  marginTop: "50px",
});

const TestimonialSlider = styled(Box)({
  display: "flex",
  transition: "transform 0.5s ease-in-out",
});

const TestimonialCard = styled(Box)({
  minWidth: "300px",
  marginRight: "20px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  backgroundColor: "#f7f7f7",
  textAlign: "center",
});

const TestimonialButton = styled(Button)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: "8px",
  borderRadius: "50%",
  fontSize: "16px",
  zIndex: 10,
  minWidth: "40px",
  height: "40px",
});

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { translations, changeLanguage } = useLanguage();
  const testimonials = [
    {
      quote:
        "FleaFind helped me discover hidden treasures in my city! The interface is smooth and the listings are detailed.",
      name: "Anna K.",
      company: "Flea Market Owner",
    },
    {
      quote:
        "The platform makes it so easy to list my market and connect with shoppers. Highly recommend it!",
      name: "Peter L.",
      company: "Flea Market Owner",
    },
    {
      quote:
        "I love the detailed filters and the customer reviews! It has made shopping so much more fun!",
      name: "Sarah M.",
      company: "Regular Shopper",
    },
    {
      quote:
        "I love the detailed filters and the customer reviews! It has made shopping so much more fun!",
      name: "Sarah M.",
      company: "Regular Shopper",
    },
    {
      quote:
        "I love the detailed filters and the customer reviews! It has made shopping so much more fun!",
      name: "Sarah M.",
      company: "Regular Shopper",
    },
    {
      quote:
        "I love the detailed filters and the customer reviews! It has made shopping so much more fun!",
      name: "Sarah M.",
      company: "Regular Shopper",
    },
    {
      quote:
        "I love the detailed filters and the customer reviews! It has made shopping so much more fun!",
      name: "Sarah M.",
      company: "Regular Shopper",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hovered, testimonials.length]);

  return (
    <>
      <HomeNav />
      <Root>
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h2" component="h1">
            {translations.HEROSECTION_A.TITLE}
          </Typography>
          <Typography variant="h5" sx={{ marginTop: "10px", opacity: 0.9 }}>
          {translations.HEROSECTION_A.SUBTITLE}
          </Typography>
        </HeroSection>

        <Container maxWidth="xl">
          {/* Who We Are */}
          <Section>
            <Grid2 container spacing={4} alignItems="center">
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <Title variant="h4">{translations.HEROSECTION_A.ABOUT1_TITLE}</Title>
                <Subtitle>
                {translations.HEROSECTION_A.ABOUT1_TEXT}
                </Subtitle>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <Image src={whoWeAre} alt="Who We Are" />
              </Grid2>
            </Grid2>
          </Section>

          {/* Our Mission */}
          <Section>
            <Grid2 container spacing={4} alignItems="center">
              <Grid2 item size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
                <Image src={ourMission} alt="our Mission" />
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                <Title variant="h4">{translations.HEROSECTION_A.ABOUT2_TITLE}</Title>
                <Subtitle>
                {translations.HEROSECTION_A.ABOUT2_TEXT}
                </Subtitle>
              </Grid2>
            </Grid2>
          </Section>

          {/* Why Choose Us */}
          <Section>
            <Grid2 container spacing={4} alignItems="center">
              {/* Left Side - Text Content */}
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <Title variant="h4">{translations.HEROSECTION_A.ABOUT3_TITLE}</Title>
                <Grid2 container spacing={2}>
                  <Grid2 item size={{ xs: 12 }}>
                    <CheckCircleIcon color="primary" /> {translations.HEROSECTION_A.ABOUT3_TEXT1}
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <CheckCircleIcon color="primary" /> {translations.HEROSECTION_A.ABOUT3_TEXT2}
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <CheckCircleIcon color="primary" /> {translations.HEROSECTION_A.ABOUT3_TEXT3}
                  </Grid2>
                  <Grid2 item size={{ xs: 12 }}>
                    <CheckCircleIcon color="primary" /> {translations.HEROSECTION_A.ABOUT3_TEXT4}
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* Right Side - Image */}
              <Grid2 item size={{ xs: 12, md: 6 }}>
                {/* <img
                  src={whyChooseUs}
                  alt="Why Choose Us"
                  width="100%"
                  style={{ borderRadius: "8px" }}
                /> */}
                <Image src={whyChooseUs} alt="why Choose Us" />
              </Grid2>
            </Grid2>
          </Section>

          {/* Testimonials */}
          <TestimonialsSection
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Typography variant="h4">{translations.TESTIMONIAL_SECTION.TITLE}</Typography>
            <TestimonialSlider
              style={{ transform: `translateX(-${currentIndex * 320}px)` }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <Typography variant="body1">{testimonial.quote}</Typography>
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="subtitle">
                    {testimonial.company}
                  </Typography>
                </TestimonialCard>
              ))}
            </TestimonialSlider>
            <TestimonialButton onClick={handlePrev}>&lt;</TestimonialButton>
            <TestimonialButton onClick={handleNext} style={{ right: "2px" }}>
              &gt;
            </TestimonialButton>
          </TestimonialsSection>

          {/* CTA */}
          <Box textAlign="center" mt={6} mb={2}>
            <CustomButton variant="contained" onClick={() => navigate("/auth")}>
            {translations.TESTIMONIAL_SECTION.BUTTON}
            </CustomButton>
          </Box>
        </Container>

        {/* Footer */}
        <Footer />
      </Root>
    </>
  );
};

export default AboutUs;
