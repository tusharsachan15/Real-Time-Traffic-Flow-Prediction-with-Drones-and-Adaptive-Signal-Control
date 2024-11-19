import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import LayoutComponent from "../Components/LayoutComponent"; // Adjust the path as necessary
import axios from "axios";
import { useNavigate } from "react-router-dom";

const drones = [
  {
    id: "mI1GIjUsI5",
    image:
      "https://t3.ftcdn.net/jpg/04/07/04/90/360_F_407049008_R4s3xyDrZZW1tzBfK7BokqXnHdRAQRci.jpg",
    description:
      "This advanced drone offers high-altitude flight capabilities with precision control, making it perfect for both recreational and professional use.",
  },
  {
    id: "sHzk8bqiIQ1",
    image:
      "https://media.istockphoto.com/id/1144732284/vector/drone-with-camera-vector-black-white-silhouette-icon.jpg?s=612x612&w=0&k=20&c=5vSw824Zkk5rIwA33RerrXBAdwWQl5tc33OtVHZgvA8=",
    description:
      "Equipped with a high-definition camera, this drone captures stunning aerial footage, ideal for photography and videography enthusiasts.",
  },
  {
    id: "sHzk8bqiIQ2",
    image:
      "https://media.istockphoto.com/id/1069970666/vector/silhouette-of-drone-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bQ6yLO2b5ZXq6oQbJJMYDmk6twHE5mKbftu8Ip0I9TM=",
    description:
      "A lightweight drone designed for agility and speed, perfect for racing or exploring difficult terrains with ease.",
  },
];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCardClick = (droneId) => {
    // Pass drone ID to the drone details page if necessary
    navigate(`/drone`);
  };
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

  return (
    <LayoutComponent>
      <h1>Drone Dashboard</h1>
      <Grid container spacing={3}>
        {drones.map((drone) => (
          <Grid item xs={12} sm={6} md={4} key={drone.id}>
            <Card
              onClick={() => handleCardClick(drone.id)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={drone.image}
                alt={`Drone ${drone.id}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Drone ID: {drone.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {drone.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LayoutComponent>
  );
};

export default DashboardPage;
