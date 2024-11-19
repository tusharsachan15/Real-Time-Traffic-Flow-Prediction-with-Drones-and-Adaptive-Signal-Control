import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@mui/material"; // Material UI button

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

const DroneTracker = ({ droneData }) => {
  const [zoomLevel, setZoomLevel] = useState(10); // Initialize zoom level

  // Convert lat and lon from E7 format to decimal degrees
  const lat = droneData?.lat ? droneData.lat / 10000000 : undefined;
  const lon = droneData?.lon ? droneData.lon / 10000000 : undefined;

  // Validate that droneData has both valid lat and lon, and they are not zero
  const hasValidLocation =
    lat !== undefined && lon !== undefined && (lat !== 0 || lon !== 0);

  // Default center if no valid drone data is available
  const defaultCenter = [37.7749, -122.4194]; // Default to San Francisco if no valid data
  const center = hasValidLocation ? [lat, lon] : defaultCenter;

  // Component to update map view based on location change and zoom level
  const RecenterAutomatically = ({ lat, lon, zoom }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lon) {
        map.setView([lat, lon], zoom, { animate: true });
      }
    }, [lat, lon, zoom, map]);
    return null;
  };

  // Handle zoom in button click
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 18)); // Max zoom level set to 18
  };

  return (
    <>
      {/* Button to zoom in on the drone's marker */}
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleZoomIn}
          disabled={!hasValidLocation}
        >
          Zoom In on Drone
        </Button>
      </div>

      <MapContainer
        center={center}
        zoom={zoomLevel}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Automatically recenter and zoom map when drone location or zoom level updates */}
        {hasValidLocation && (
          <RecenterAutomatically lat={lat} lon={lon} zoom={zoomLevel} />
        )}

        {/* Marker at the drone's position if valid location exists */}
        {hasValidLocation ? (
          <Marker position={[lat, lon]}>
            <Popup>
              Drone Location: {lat}, {lon}
            </Popup>
          </Marker>
        ) : (
          <Popup position={defaultCenter}>
            No valid drone location available.
          </Popup>
        )}
      </MapContainer>
    </>
  );
};

export default DroneTracker;
