import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { createSlug } from "../../../utils/slug";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const CustomCardContent = ({
  isNewMarket,
  isOwner,
  market,
  hovered,
  handleUpdateIconClick,
  handleDeleteIconClick,
}) => {
  const navigate = useNavigate();
  const slug = createSlug(market?.name);
  const slicedCategories = market?.categories?.slice(0, 3);
  const handleClick = () => {
    // You can pass state or other parameters here
    navigate(`/markets/${slug}`, { state: { marketData: market } });
  };
  const { translations } = useLanguage();

  return (
    <>
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
          position: "relative",
          height: "100%", // Ensure uniform height
        }}
      >
        {/* "New" Tag */}
        {isNewMarket(market?.createdAt) && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#ff0000",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              zIndex: 10,
            }}
          >
            {translations.MARKET_CARD.NEW}
          </Box>
        )}

        {/* Market Image */}
        <Box sx={{ position: "relative", height: "180px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={market?.logo?.url}
            alt={market?.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
        </Box>

        {/* Card Content */}
        <CardContent
          sx={{
            padding: "16px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Name */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {market?.name}
          </Typography>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <LocationOnIcon sx={{ color: "text.secondary", marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {market?.city}
            </Typography>
          </Box>
          {/* Market Type Chip */}
          <Chip
            label={market?.marketType}
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#15a0db",
              color: "#fff",
              marginBottom: 2,
            }}
          />
          {/* Ratings */}
          <Box display="flex" alignItems="center" marginBottom={1}>
            <Rating value={market?.averageRating} precision={0.1} readOnly />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: 1 }}
            >
              ({market?.reviewCount} {translations.MARKET_CARD.REVIEWS})
            </Typography>
          </Box>
          {/* Opening Hours */}
          <Box display="flex" alignItems="center" marginBottom={1}>
            <AccessTimeIcon sx={{ color: "text.secondary", marginRight: 1 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {market?.openingHours}
            </Typography>
          </Box>

          {/* Popular Categories */}
          <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
            {slicedCategories?.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                sx={{ backgroundColor: "#ff0000", color: "#fff" }}
              />
            ))}
          </Box>
        </CardContent>

        {isOwner && (
          <Box
            sx={{
              position: "absolute",
              top: 50,
              right: 10,
              display: hovered ? "flex" : "none",
              flexDirection: "column",
              padding: "8px",
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <IconButton
              sx={{ marginBottom: "5px" }}
              onClick={() => handleUpdateIconClick(market)}
            >
              <Edit fontSize="small" />
            </IconButton>

            <IconButton sx={{ marginBottom: "5px" }} onClick={handleClick}>
              <Visibility fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => handleDeleteIconClick(market?._id)}
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Card>
    </>
  );
};

export default CustomCardContent;
