import React from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { HomeNav } from "../../layout/components/header/components";
import { Breadcrumb } from "../../components";
import { styled } from "@mui/system";

const Root = styled("div")({
  backgroundColor: "#f7f7f7",
});

const Header = styled(Box)({
  backgroundColor: "#15a0db",
  color: "#fff",
  padding: "48px 0",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
});

const Section = styled(Paper)({
  margin: "32px 0",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  backgroundColor: "#fff",
});

const Title = styled(Typography)({
  color: "#15a0db",
  marginBottom: "16px",
  fontWeight: "bold",
  borderBottom: "2px solid #ff0000",
});

const Subtitle = styled(Typography)({
  marginBottom: "24px",
  fontSize: "18px",
  lineHeight: "1.6",
});

const Content = styled("ul")({
  color: "#333",
  marginBottom: "32px",
  lineHeight: "1.8",
});

const CustomButton = styled(Button)({
  backgroundColor: "#15a0db",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#ff0000",
  },
  padding: "8px 32px",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const Footer = styled(Box)({
  backgroundColor: "#333",
  color: "#fff",
  padding: "48px 0",
  textAlign: "center",
  borderTop: "2px solid #ff0000",
});

const AboutUs = () => {
  return (
    <>
      <HomeNav />

      <Root>
        {/* Header */}
        <Header>
          <Typography variant="h2" component="h1">
            About Us
          </Typography>
        </Header>

        <Container maxWidth="md">
          <Box mb={2}>
            <Breadcrumb />
          </Box>
          {/* Who We Are Section */}
          <Section>
            <Title variant="h4">Who We Are</Title>
            <Subtitle>
              Welcome to FleaFind, the most comprehensive platform for
              discovering and listing flea markets across Finland! Whether
              you’re a flea market owner or an enthusiastic shopper, we provide
              you with all the tools and information you need to connect to the
              best markets in your area.
            </Subtitle>
          </Section>

          {/* Our Mission Section */}
          <Section>
            <Title variant="h4">Our Mission</Title>
            <Subtitle>
              Our mission is to create an efficient and user-friendly platform
              that bridges the gap between flea markets and their customers. By
              showcasing second-hand traders, flea markets, and recycling
              centers across Finland, we promote sustainable shopping and help
              strengthen the circular economy.
            </Subtitle>
          </Section>

          {/* Why Choose Us Section */}
          <Section>
            <Title variant="h4">Why Choose Us?</Title>
            <Subtitle>
              Explore flea markets, second-hand stores, and recycling centers in
              every city across Finland. We provide a convenient way to discover
              local treasures while supporting sustainable practices.
            </Subtitle>
            <Content>
              <li>Comprehensive listings across Finland</li>
              <li>Advanced filters for a better search experience</li>
              <li>Multilingual support for international users</li>
              <li>Customer reviews and ratings for building trust</li>
            </Content>
          </Section>

          {/* Our Vision Section */}
          <Section>
            <Title variant="h4">Our Vision</Title>
            <Subtitle>
              We aim to become Finland’s most trusted and expansive online
              resource for second-hand shopping, helping both consumers and
              sellers thrive in a growing circular economy. Our vision is to
              support flea markets in building stronger customer relationships
              and creating a sustainable future.
            </Subtitle>
          </Section>

          {/* How We Work Section */}
          <Section>
            <Title variant="h4">How We Work</Title>
            <Subtitle>
              <strong>For Market Owners:</strong> Flea market owners can easily
              register their business, share detailed descriptions, and keep
              their market's information up-to-date. The more actively you
              engage your customers and gather feedback, the higher your market
              ranks, giving you greater visibility.
            </Subtitle>
            <Subtitle>
              <strong>For Shoppers:</strong> By selecting your city and applying
              filters, you’ll quickly discover markets that meet your needs,
              whether you’re looking for vintage treasures or eco-friendly
              recycling centers.
            </Subtitle>
          </Section>

          {/* Commitment to Transparency Section */}
          <Section>
            <Title variant="h4">Our Commitment to Transparency</Title>
            <Subtitle>
              All reviews published on our site are verified according to our
              strict review policy to ensure fairness and reliability. We are
              working toward automating our information systems to provide
              real-time updates and the most accurate details on every market
              listed.
            </Subtitle>
          </Section>

          {/* Sustainable Shopping Section */}
          <Section>
            <Title variant="h4">
              Sustainable Shopping for a Brighter Future
            </Title>
            <Subtitle>
              FleaFind is proudly developed in Finland, with a focus on boosting
              the mainstream adoption of circular economy practices. By
              supporting flea markets and second-hand businesses, we are
              contributing to a more sustainable tomorrow. Our network includes
              experts in sustainability, entrepreneurship, and influencers who
              share our vision for a better, greener world.
            </Subtitle>
          </Section>

          {/* CTA Section */}
          <Box textAlign="center" marginTop={6} mb={2}>
            <CustomButton variant="contained">Join Us Today!</CustomButton>
          </Box>
        </Container>

        {/* Footer */}
        <Footer>
          <Typography variant="h6">Contact Us</Typography>
          <Typography>Email: info@fleafind.com</Typography>
          <Typography>Phone: +358-xxx-xxxx</Typography>
        </Footer>
      </Root>
    </>
  );
};

export default AboutUs;
