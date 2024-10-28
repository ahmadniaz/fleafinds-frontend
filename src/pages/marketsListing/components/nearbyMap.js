// InteractiveMap.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const InteractiveMap = ({ userLocation, nearbyMarkets }) => {
  // Set the default icon for Leaflet markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* User Location Marker */}
      <Marker position={userLocation}>
        <Popup>Your Location</Popup>
      </Marker>
      {/* Nearby Markets Markers */}
      {nearbyMarkets.map((market) => (
        <Marker
          key={market.id}
          position={[market.location.lat, market.location.long]}
        >
          <Popup>{market.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
