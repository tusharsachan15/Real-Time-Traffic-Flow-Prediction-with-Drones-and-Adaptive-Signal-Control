import React from "react";
import LayoutComponent from "../Components/LayoutComponent";
import TrafficMapper from "../Components/TrafficMapper";
import TrafficLight from "../Components/TrafficLight";
import { Grid } from "@mui/material";

const TrafficPage = () => {
  return (
    <LayoutComponent>
      <Grid container spacing={2} marginTop={"2rem"}>
        <Grid item xs={10}>
          <TrafficMapper />
        </Grid>
        <Grid item xs={2}>
          <TrafficLight />
        </Grid>
      </Grid>
    </LayoutComponent>
  );
};

export default TrafficPage;
