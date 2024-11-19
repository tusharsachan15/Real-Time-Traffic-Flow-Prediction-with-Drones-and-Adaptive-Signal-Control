import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FlightIcon from "@mui/icons-material/Flight";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/drone")}>
        <ListItemIcon>
          <FlightIcon />
        </ListItemIcon>
        <ListItemText primary="Drone Status" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/traffic")}>
        <ListItemIcon>
          <TrafficIcon />
        </ListItemIcon>
        <ListItemText primary="Traffic Signal" />
      </ListItemButton>
    </React.Fragment>
  );
};

// export const SecondaryListItems = () => {
//   const navigate = useNavigate();

//   return (
//     <React.Fragment>
//       <ListSubheader component="div" inset>
//         Saved reports
//       </ListSubheader>
//       <ListItemButton onClick={() => navigate("/reports/current-month")}>
//         <ListItemIcon>
//           <AssignmentIcon />
//         </ListItemIcon>
//         <ListItemText primary="Current month" />
//       </ListItemButton>
//       <ListItemButton onClick={() => navigate("/reports/last-quarter")}>
//         <ListItemIcon>
//           <AssignmentIcon />
//         </ListItemIcon>
//         <ListItemText primary="Last quarter" />
//       </ListItemButton>
//       <ListItemButton onClick={() => navigate("/reports/year-end-sale")}>
//         <ListItemIcon>
//           <AssignmentIcon />
//         </ListItemIcon>
//         <ListItemText primary="Year-end sale" />
//       </ListItemButton>
//     </React.Fragment>
//   );
// };
