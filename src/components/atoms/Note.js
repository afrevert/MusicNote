import React from "react";
import Draggable from "react-draggable";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

export default function Note(props) {
  const [position, setPosition] = React.useState({ x: props.position.x, y: props.position.y });

  const handleStop = (e, ui) => {
    setPosition(ui);
  };

  const nodeRef = React.useRef(null);

  return (
    <Draggable
      onStop={(e, ui) => {
        handleStop(e, ui);
        props.onStop(ui);
      }}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>
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
