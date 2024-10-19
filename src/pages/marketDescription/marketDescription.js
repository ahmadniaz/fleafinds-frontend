import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { HomeNav } from "../../layout/components/header/components";
import {
  TitleSection,
  InfoSection,
  GallerySection,
  ReviewSection,
} from "./components";
import Image1 from "../../assets/images/helsinki.jpeg";
import Image2 from "../../assets/images/fleaMarketbg.jpg";
import Image3 from "../../assets/images/turku.jpeg";
import Image4 from "../../assets/images/vaasa.jpeg";
import Image5 from "../../assets/images/fleaMarketLogo.jpg";
import { Breadcrumb } from "../../components";

// Styled components for elegance
const Container = styled(Box)({
  backgroundColor: "#f4f6f8",
  padding: "40px",
  minHeight: "100vh",
});

const MarketDescriptionPage = () => {
  const testMarketData = {
    marketName: "Finnish Flea Market",
    description:
      "A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies. A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies.A vibrant marketplace featuring a wide variety of second-hand goods, handmade crafts, and local delicacies.",
    logo: Image2,
    location: {
      latitude: 60.1695,
      longitude: 24.9354,
      address: "123 Market Street, Helsinki, Finland",
    },
    rating: 4.1,
    reviewCount: 19,
    categories: ["Antiques", "Clothing", "Handmade Goods", "Art", "Furniture"],
    openingHours: "Saturdays and Sundays, 9 AM - 4 PM",
    priceList: "Spaces starting from €20 per day.",
    socialMedia: {
      facebook: "https://facebook.com/example",
      instagram: "https://instagram.com/example",
      twitter: "https://twitter.com/example",
    },
    images: [
      Image1,
      Image2,
      Image3,
      Image4,
      Image5,
      Image1,
      Image3,
      Image2,
      Image4,
      Image5,
    ],
    marketType: "Outdoor Flea Market",
    contact: {
      phone: "+358 123 4567",
      email: "info@finnishfleamarket.com",
      website: "https://finnishfleamarket.com",
    },
    faqs: [
      {
        question: "What are the opening hours?",
        answer: "Saturdays and Sundays, 9 AM - 4 PM.",
      },
      {
        question: "Is there parking available?",
        answer: "Yes, there is ample parking nearby.",
      },
    ],
    events: [
      {
        title: "Summer Festival",
        date: "August 5, 2024",
        description: "Join us for our annual summer festival!",
      },
    ],
    reviews: [
      {
        comment:
          "A wonderful flea market where products move quickly! Professional and cordial staff.",
        rating: 5,
        name: "Pirkko Salo",
        date: "24/09/2024",
      },

      {
        comment: "A wonderful experience! Professional staff.",
        rating: 4,
        name: "Hello Salo",
        date: "21/09/2024",
      },
    ],
  };
  const [reviews] = useState(testMarketData.reviews);
  const reviewFormRef = useRef(null);

  const ratingsBreakdown = {
    5: 100,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  return (
    <>
      <HomeNav />
      <Container>
        <Breadcrumb />
        {/* Title Section */}
        <TitleSection testMarketData={testMarketData} />
        {/* Information Sections */}
        <InfoSection testMarketData={testMarketData} />
        {/* Image Gallery Section */}
        <GallerySection testMarketData={testMarketData} />
        {/* Reviews Section */}
        <ReviewSection
          secRef={reviewFormRef}
          reviews={reviews}
          totalReviews={44}
          ratingsBreakdown={ratingsBreakdown}
          testMarketData={testMarketData}
        />
      </Container>
    </>
  );
};

export default MarketDescriptionPage;
