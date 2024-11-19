import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "./NavbarComponent"; // Adjust the path as necessary
import SidebarComponent from "./SidebarComponent"; // Adjust the path as necessary

const LayoutComponent = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent open={open} toggleDrawer={toggleDrawer} />
      <SidebarComponent open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          padding: 3,
          marginTop: "30px",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LayoutComponent;
