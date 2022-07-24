import * as React from "react";
import "./styles.css"

import useAudio from "./useAudio";
import TimeBar from "./TimeBar";
import PlaybackButton from "./PlaybackButton";
import Draggable from "react-draggable";

function AudioPlayer(props) {
  const [audioElement, audioProps] = useAudio(props.url);
  const [position, setPosition] = React.useState({ x: props.position.x, y: props.position.y });
  const nodeRef = React.useRef();

  const handleStop = (e, ui) => {
    setPosition(ui);
    props.onStop(ui);
  };

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
        className={props.className + ' audio-player'}
        id='audioClip' 
        ref={nodeRef}
        onMouseDownCapture={handleOnClick}
        style={{position: 'relative'}}>
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
              pausePlayback={audioProps.pausePlayback}
            />
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default AudioPlayer;
