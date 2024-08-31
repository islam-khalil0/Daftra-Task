import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import EditModeToggle from "../components/EditModeToggle";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Dashboard = () => {
  const [navItems, setNavItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetch("http://localhost:8081/nav")
      .then((response) => response.json())
      .then((data) => setNavItems(data));
  }, []);

  const handleSave = () => {
    fetch("http://localhost:8081/nav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(navItems),
    }).then(() => {
      setEditMode(false);
    });
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#1976d2" }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <Typography variant="h6">Dashboard</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? drawerOpen : true}
        onClose={isMobile ? toggleDrawer : undefined}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#1976d2", // Match the color with AppBar
            color: "white", // Adjust text color if needed
          },
          ...(isMobile && { display: "block" }), // Ensure that Drawer is displayed on mobile
        }}
      >
        <Toolbar />
        <div>
          <EditModeToggle editMode={editMode} setEditMode={setEditMode} />
          <Divider />
          <Navigation
            items={navItems}
            setItems={setNavItems}
            editMode={editMode}
          />
          {editMode && (
            <button
              style={{
                background: "white",
                padding: "0.5rem 2rem",
                borderRadius: "0.5rem",
                border: "none",
                margin: "2rem",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </Drawer>

      <main
        style={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Content Space */}
        <h1>Content Space</h1>
      </main>
    </div>
  );
};

export default Dashboard;
