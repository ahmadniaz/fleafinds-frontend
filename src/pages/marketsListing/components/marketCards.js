import React from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createSlug } from "../../../utils/slug";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const MarketCard = ({ market }) => {
  const slug = createSlug(market.name);
  return (
    <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={market.id}>
      <Link to={`/markets/${slug}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            transition: "transform 0.2s ease-in-out",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-5px)",
            },
            border: "1px solid #15a0db",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Market Image */}
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="140"
              image={market.image}
              alt={market.name}
              sx={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Card Content */}
          <CardContent sx={{ padding: "16px", flex: "1" }}>
            {/* Name */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {market.name}
            </Typography>

            {/* Market Type Chip */}
            <Chip
              label={market.type}
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#15a0db",
                color: "#fff",
                marginBottom: 2,
              }}
            />

            {/* Divider Line */}
            <Box
              sx={{
                height: "1px",
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginBottom: 2,
              }}
            />

            {/* Ratings */}
            <Box display="flex" alignItems="center" marginBottom={1}>
              <Rating
                value={market.rating}
                precision={0.1}
                readOnly
                sx={{
                  color: "#ff0000",
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginLeft: 1 }}
              >
                ({market.reviewCount} reviews)
              </Typography>
            </Box>

            {/* Opening Hours */}
            <Box display="flex" alignItems="center" marginBottom={1}>
              <AccessTimeIcon
                sx={{ color: "text.secondary", marginRight: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Mon-Fri, 10:00 AM - 6:00 PM
              </Typography>
            </Box>

            {/* Location */}
            <Box display="flex" alignItems="center" marginBottom={1}>
              <LocationOnIcon
                sx={{ color: "text.secondary", marginRight: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {market.location.address}
              </Typography>
            </Box>

            {/* Popular Categories */}
            <Box display="flex" gap={1} flexWrap="wrap">
              {["Clothes", "Toys", "Furniture"].map((category) => (
                <Chip
                  key={category}
                  label={category}
                  size="small"
                  sx={{ backgroundColor: "#ff0000", color: "#fff" }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid2>
  );
};

export default MarketCard;
