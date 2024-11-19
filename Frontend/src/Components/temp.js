import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for leaflet icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DroneTracker = () => {
  // Fixed coordinates for the marker
  const position = [12.8444173, 80.1517689]; // Coordinates in decimal degrees

  return (
    <MapContainer
      center={position} // Set map center to the coordinates
      zoom={10}
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker at the fixed position */}
      <Marker position={position}>
        <Popup>
          Drone Location: {position[0]}, {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DroneTracker;
