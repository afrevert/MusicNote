import * as React from "react";
import "./styles.css"

import useAudio from "./useAudio";
import TimeBar from "./TimeBar";
import PlaybackButton from "./PlaybackButton";
import Draggable from "react-draggable";

function AudioPlayer(props) {
  const [audioElement, audioProps] = useAudio(props.url);
  const [position, setPosition] = React.useState({ x: props.position.x, y: props.position.y });
  const nodeRef = React.useRef(null);

  const handleStop = (e, ui) => {
    setPosition(ui);
    props.onStop(ui);
  };

  return (
    <Draggable
      onStop={handleStop}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="audio-player">
        {audioElement}

        {audioProps.isLoading ? (
          <div style={{ color: "white" }}>Loading...</div>
        ) : (
          <div className="controls">
            <PlaybackButton onClick={audioProps.togglePlaybackStatus} playbackStatus={audioProps.playbackStatus} />
            <TimeBar
              currentTime={audioProps.currentTime}
              isSeeking={audioProps.isSeeking}
              duration={audioProps.duration}
              progress={audioProps.progress}
              setTime={audioProps.setTime}
            />
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default AudioPlayer;
