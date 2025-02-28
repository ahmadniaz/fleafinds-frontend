import React from "react";
import { Grid2, Typography, Box, Card, CardContent } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import TopMarkets from "./component/topMarkets";

const HeaderSection = ({ allMarkets }) => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const totalMarkets = allMarkets?.length;
  const topMarkets = allMarkets?.slice(0, 5);

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
            All Flea Markets
          </Typography>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, boxShadow: 2, backgroundColor: "#fff" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ color: "#ff0000", fontWeight: "medium", mb: 1 }}
              >
                Discover and explore the top {topMarkets?.length} flea markets
                in Finland, offering unique and affordable finds.
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Finland is home to vibrant flea markets. Find the best spots,
                explore new ones, and connect with local sellers to enhance your
                shopping experience.
              </Typography>

              {/* Display Top Markets */}
              <TopMarkets allMarkets={allMarkets} />
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[64.0, 26.0]} // Center of Finland
              zoom={5} // Zoomed out to cover whole Finland
              style={{
                height: "100%",
                width: "100%",
                minHeight: "400px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {allMarkets?.map((market) => (
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
