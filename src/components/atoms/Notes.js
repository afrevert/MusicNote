import React from "react";
import Draggable from "react-draggable";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

export default function Notes(props) {
  const [position, setPosition] = React.useState({ x: props.position.x, y: props.position.y });

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  return (
    <Draggable
      onStop={(e, ui) => {
        handleDrag(e, ui);
        props.onStop(position);
      }}
    >
      <div>
        <EditTextarea
          placeholder="Enter your note."
          onSave={({ name, value, previousValue }) => {
            props.onSave(value);
          }}
        />
      </div>
    </Draggable>
  );
}
