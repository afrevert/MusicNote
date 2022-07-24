import React from "react";
import Draggable from "react-draggable";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

export default function Note(props) {
  const nodeRef = React.useRef();
  const [position, setPosition] = React.useState({ x: props.position.x, y: props.position.y });

  const handleStop = (e, ui) => {
    setPosition(ui);
    props.onStop(ui);
  };

  const handleSave = ({name, value, previousValue}) => {
    props.onSave(value);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    props.stackElem(nodeRef);
  }

  return (
    <Draggable
      onStop={handleStop}
      nodeRef={nodeRef}
    >
      <div
        className={props.className + " notecard"}
        ref={nodeRef}
        style={{ width: '200px', margin: '20px', position: 'relative' }}
        onMouseDownCapture={handleOnClick}>

        <EditTextarea
          placeholder="Enter your note."
          defaultValue={props.text}
          onSave={handleSave}
        />
        
      </div>
    </Draggable>
  );
}
