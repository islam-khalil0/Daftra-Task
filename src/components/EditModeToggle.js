import React from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const EditModeToggle = ({ editMode, setEditMode }) => {
  return (
    <IconButton onClick={() => setEditMode(!editMode)}>
      <SettingsIcon
        sx={{ color: editMode ? "black" : "white" }}
      />
    </IconButton>
  );
};

export default EditModeToggle;
