import React from "react";
import { ListItem, ListItemText, IconButton, Tooltip } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const NavigationItem = ({ item, index, moveItem, editMode }) => {
  const [, drag] = useDrag({
    type: "NAV_ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "NAV_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <ListItem
      ref={editMode ? (node) => drag(drop(node)) : null}
      style={{
        opacity: editMode ? 1 : 0.5,
        position: "relative",
        paddingLeft: editMode ? "40px" : "16px",
      }}
    >
      {editMode && (
        <Tooltip title="Drag and Drop" arrow>
          <IconButton
            style={{
              position: "absolute",
              left: "8px",
              color: "white",
            }}
            size="small"
          >
            <DragIndicatorIcon />
          </IconButton>
        </Tooltip>
      )}
      <ListItemText
        primary={item.title}
        style={{ marginLeft: editMode ? "9px" : "16px" }}
      />
    </ListItem>
  );
};

export default NavigationItem;
