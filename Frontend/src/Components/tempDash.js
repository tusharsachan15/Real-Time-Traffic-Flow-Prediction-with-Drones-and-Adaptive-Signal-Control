import React, { useState, useEffect } from "react";
import LayoutComponent from "../Components/LayoutComponent"; // Adjust the path as necessary
import DroneTracker from "../Components/DroneTracker";
import axios from "axios";

const DashboardPage = () => {
  const [droneData, setDroneData] = useState([]);
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

  return (
    <LayoutComponent>
      <h1>Welcome to the Dashboard</h1>
      <DroneTracker droneData={droneData} />
    </LayoutComponent>
  );
};

export default DashboardPage;
