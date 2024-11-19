import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
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

// Component to auto-focus map on given coordinates
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom(), { animate: true });
  }, [lat, lon, map]);
  return null;
};

const TrafficMapper = () => {
  const lat = 12.78978;
  const lon = 80.221397;

  const roadSegment = [
    [12.790469, 80.220344], // Start of the road
    [12.790261, 80.220666], // Point a bit further down the road
    [12.790154, 80.220901], // Continue for another point
    [12.789806, 80.221417], // End point to create a longer segment
    [12.789707, 80.221591], // End point to create a longer segment
  ];

  const [trafficCondition, setTrafficCondition] = useState("free"); // Default condition

  const fetchGreenTime = async () => {
    try {
      const response = await fetch(
        "https://traffic-signal-server.onrender.com/latest_data"
      );
      const data = await response.json();
      const greenTime = data.green_time;

      console.log("Fetched green time:", greenTime);

      if (greenTime > 30) {
        console.log("Setting condition to heavy");
        setTrafficCondition("heavy"); // Show red when greenTime > 30
      } else if (greenTime > 25 && greenTime <= 30) {
        console.log("Setting condition to medium");
        setTrafficCondition("medium"); // Show orange for greenTime between 25 and 30
      } else {
        console.log("Setting condition to free");
        setTrafficCondition("free"); // Show blue when greenTime ≤ 25
      }
    } catch (error) {
      console.error("Error fetching green time:", error);
    }
  };

  useEffect(() => {
    fetchGreenTime(); // Fetch initially
    const intervalId = setInterval(fetchGreenTime, 2000); // Fetch every 2 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const getColor = () => {
    switch (trafficCondition) {
      case "free":
        return "blue"; // Blue for free-flow traffic (greenTime ≤ 25)
      case "medium":
        return "orange"; // Orange for medium traffic (greenTime between 25 and 30)
      case "heavy":
        return "red"; // Red for heavy traffic (greenTime > 30)
      default:
        return "gray"; // Default color if no condition matches
    }
  };

  useEffect(() => {
    console.log("Traffic condition updated:", trafficCondition);
  }, [trafficCondition]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={18}
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecenterMap lat={lat} lon={lon} />

      {/* Add a key to the Polyline to force re-render */}
      <Polyline
        key={trafficCondition} // This key will force the component to re-render
        positions={roadSegment}
        color={getColor()} // Dynamic color based on traffic condition
        weight={10}
        opacity={0.8}
      />
    </MapContainer>
  );
};

export default TrafficMapper;
