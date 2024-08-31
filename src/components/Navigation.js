import React from "react";
import { List } from "@mui/material";
import NavigationItem from "./NavigationItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Navigation = ({ items, setItems, editMode }) => {
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);

    fetch("http://localhost:8081/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movedItem.id,
        from: fromIndex,
        to: toIndex,
      }),
    }).catch((err) => console.error("Failed to track change:", err));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <List>
        {items.map((item, index) => (
          <NavigationItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            editMode={editMode}
          />
        ))}
      </List>
    </DndProvider>
  );
};

export default Navigation;
