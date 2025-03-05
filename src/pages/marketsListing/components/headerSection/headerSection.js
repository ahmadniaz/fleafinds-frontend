import React from "react";
import { Grid2, Typography, Box, Card, CardContent } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import TopMarkets from "./component/topMarkets";
import { useLanguage } from "../../../../context/LanguageContext";

const cityCoordinates = {
  Helsinki: [60.1695, 24.9354],
  Espoo: [60.2055, 24.6559],
  Tampere: [61.4991, 23.7871],
  Vantaa: [60.2934, 25.0378],
  Oulu: [65.0121, 25.4651],
  Turku: [60.4518, 22.2666],
  Jyväskylä: [62.2415, 25.7209],
  Lahti: [60.9827, 25.6612],
  Kuopio: [62.8924, 27.677],
  Pori: [61.4851, 21.7978],
};

const HeaderSection = ({ allMarkets, cityFromUrl }) => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
  const { translations, changeLanguage } = useLanguage();
  const filteredMarkets = cityFromUrl
    ? allMarkets?.filter((market) => market.city === cityFromUrl)
    : allMarkets;

  const mapCenter =
    cityFromUrl && cityCoordinates[cityFromUrl]
      ? cityCoordinates[cityFromUrl]
      : [64.0, 26.0];

  return (
    <Box
      sx={{ backgroundColor: "#f9f9f9", p: 4, borderRadius: 2, boxShadow: 3 }}
    >
      <Grid2 container spacing={4} justifyContent="center">
        <Grid2 item size={{ xs: 12 }}>
          <Typography
            variant="h3"
            sx={{
              color: "#15a0db",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
            }}
          >
            {cityFromUrl ? `${cityFromUrl} ${translations.MARKET_LISTING_PAGE.FLEA_MARKETS}` : `${translations.MARKET_LISTING_PAGE.TITLE}`}
          </Typography>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, boxShadow: 2, backgroundColor: "#fff" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ color: "#ff0000", fontWeight: "medium", mb: 1 }}
              >
                {translations.MARKET_LISTING_PAGE.SUBTITLE_PART1} {filteredMarkets?.length} {translations.MARKET_LISTING_PAGE.SUBTITLE_PART2} {cityFromUrl || "Finland"} {translations.MARKET_LISTING_PAGE.SUBTITLE_PART3}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {cityFromUrl
                  ? `${translations.MARKET_LISTING_PAGE.TEXT_PART1} ${cityFromUrl}${translations.MARKET_LISTING_PAGE.TEXT_PART2}`
                  : `${translations.MARKET_LISTING_PAGE.OTHER_TEXT}`}
              </Typography>

              <TopMarkets allMarkets={filteredMarkets} />
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, overflow: "hidden" }}>
            <MapContainer
              center={mapCenter}
              zoom={cityFromUrl ? 10 : 5}
              style={{ height: "100%", width: "100%", minHeight: "400px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredMarkets?.map((market) => (
                <Marker
                  key={market?._id}
                  position={[
                    market?.location?.coordinates[1],
                    market?.location?.coordinates[0],
                  ]}
                >
                  <Popup>{market?.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default HeaderSection;
