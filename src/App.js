import React from "react";
import Dashboard from "./pages/Dashboard";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Dashboard />
    </div>
  );
}

export default App;
