import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import DroneTracker from "../Components/DroneTracker";
import LayoutComponent from "../Components/LayoutComponent"; // Adjust the path as necessary
import axios from "axios";

const DronePage = () => {
  const [droneData, setDroneData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDroneData = async () => {
      try {
        const response = await axios.get(
          "https://px4-flask-server.onrender.com/latest_data"
        );
        setDroneData(response.data); // assuming response.data has the correct structure
      } catch (error) {
        console.error("Error fetching drone data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data every 3 seconds
    const intervalId = setInterval(fetchDroneData, 3000);

    // Fetch data immediately on component mount
    fetchDroneData();

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <LayoutComponent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height
          }}
        >
          <CircularProgress />
        </div>
      </LayoutComponent>
    );
  }

  // Format the data into sections
  const renderDataSection = (title, data) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card style={{ marginBottom: 16 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Divider />
          {Object.keys(data).map((key) => (
            <Typography key={key} variant="body2">
              <strong>{key}:</strong> {data[key]}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );

  // Group drone data into logical sections
  const positionData = {
    Latitude: droneData.lat / 10000000,
    Longitude: droneData.lon / 10000000,
    Altitude: droneData.alt,
    "Ellipsoid Altitude": droneData.alt_ellipsoid,
    "Velocity (m/s)": droneData.vel,
    "Course Over Ground": droneData.cog,
  };

  const batteryData = {
    "Battery Remaining (%)": droneData.battery_remaining,
    "Battery Voltage (mV)": droneData.voltage_battery,
    "Battery Current (mA)": droneData.current_battery,
  };

  const healthData = {
    "Satellites Visible": droneData.satellites_visible,
    "DGPS Age": droneData.dgps_age,
    "DGPS Channels": droneData.dgps_numch,
    "Horizontal Accuracy (mm)": droneData.h_acc,
    "Vertical Accuracy (mm)": droneData.v_acc,
    "Errors (Comm)": droneData.errors_comm,
  };

  return (
    <LayoutComponent>
      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        Drone Status
      </Typography>

      <Grid container spacing={3}>
        {renderDataSection("Position", positionData)}
        {renderDataSection("Battery", batteryData)}
        {renderDataSection("Health", healthData)}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        Drone Map
      </Typography>

      {/* Render the DroneTracker below the drone status data */}
      <DroneTracker droneData={droneData} />
    </LayoutComponent>
  );
};

export default DronePage;
