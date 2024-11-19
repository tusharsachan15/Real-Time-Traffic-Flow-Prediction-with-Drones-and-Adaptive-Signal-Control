import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";

const TrafficLight = () => {
  const [greenTime, setGreenTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isRed, setIsRed] = useState(true); // By default, the light is red
  const countdownRef = useRef(null);

  const fetchGreenTime = async () => {
    try {
      const response = await fetch(
        "https://traffic-signal-server.onrender.com/latest_data"
      );
      const data = await response.json();
      setGreenTime(data.green_time);
      setCountdown(data.green_time); // Start countdown with the received green time
      setIsRed(false); // Switch to green countdown
    } catch (error) {
      console.error("Error fetching green time:", error);
    }
  };

  useEffect(() => {
    fetchGreenTime(); // Initial fetch

    return () => clearInterval(countdownRef.current); // Clear interval on unmount
  }, []);

  useEffect(() => {
    // If countdown is running and the light is green or yellow
    if (countdown > 0 && !isRed) {
      countdownRef.current = setInterval(() => {
        setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
      }, 1000); // Countdown every second
    }

    // When countdown hits 0 and it is not red
    else if (countdown === 0 && !isRed) {
      clearInterval(countdownRef.current); // Stop countdown
      setIsRed(true); // Switch to red light
      setTimeout(() => {
        fetchGreenTime(); // Fetch green time after 10 seconds
      }, 10000); // Show red for 10 seconds
    }

    return () => clearInterval(countdownRef.current); // Clear interval each time
  }, [countdown, isRed]);

  // Determine the color of the traffic light based on the countdown and red state
  const getLightColor = () => {
    if (isRed) return "red";
    if (countdown > 5) return "green";
    return "yellow";
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          width: "60px",
          height: "150px",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "5px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "30px",
            backgroundColor: getLightColor() === "red" ? "red" : "gray",
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "30px",
            backgroundColor: getLightColor() === "yellow" ? "yellow" : "gray",
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "30px",
            backgroundColor: getLightColor() === "green" ? "green" : "gray",
            borderRadius: "50%",
          }}
        />
      </Box>
      <Typography variant="h6" mt={2}>
        {isRed ? `Red Light` : `Green Time: ${Math.floor(countdown)}s`}
      </Typography>
    </Box>
  );
};

export default TrafficLight;
