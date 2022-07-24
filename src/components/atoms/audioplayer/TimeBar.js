import * as React from "react";
import { useDrag } from "react-use-gesture";



function formatTime(seconds) {
  return [Math.floor(seconds / 60), Math.floor(seconds % 60)]
    .map((x) => x.toString())
    .map((x) => (x.length === 1 ? `0${x}` : x))
    .join(":");
}

const minMax = (min, max, value) => {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

function getNewTimeProps(barRect, clientX, duration, minTime, maxTime) {
  const seconds = minMax(minTime, maxTime, Math.floor(((clientX - barRect.left) / barRect.width) * duration));

  const progress = (seconds / duration) * 100;

  return { seconds, progress };
}

function TimeBar({ style, className, duration, progress, currentTime, isSeeking, setTime }) {
  const barRef = React.useRef(null);

  const [barStyle, setBarStyle] = React.useState({left: '0%'});
  const [circleStyle, setCircleStyle] = React.useState({left: '0%'});
  const [minTime, setMinTime] = React.useState(0);
  const [maxTime, setMaxTime] = React.useState(duration);
  const [minCircleStyle, setMinCircleStyle] = React.useState({left: '0%'});
  const [maxCircleStyle, setMaxCircleStyle] = React.useState({left: '100%'});

  const [ignoreTimeUpdates, setIgnoreTimeUpdates] = React.useState(false);

  function setStyles(progress) {
    setCircleStyle({
      left: `${progress}%`,
    });

    setBarStyle({
      background: `linear-gradient(to right, #3d858c 0%, #3d858c ${progress}%, #737373 ${progress}%, #737373 100%)`,
    });
  }
  function setMinBoundStyles(minValue) {
    setMinCircleStyle({
      left: `${minValue}%`,
    });
  }
  function setMaxBoundStyles(maxValue) {
    setMaxCircleStyle({
      left: `${maxValue}%`,
    });
  }

  const bind = useDrag(
    ({ xy, first, last, event }) => {
      event.preventDefault();

      if (first) {
        setIgnoreTimeUpdates(true);
      }

      const { seconds, progress } = getNewTimeProps(
        barRef.current.getBoundingClientRect(),
        xy[0],
        duration,
        minTime,
        maxTime
      );

      if (last) {
        setTime(seconds);
        setIgnoreTimeUpdates(false);
        return;
      }

      setStyles(progress);
    },
    { event: { passive: false, capture: true } }
  );
  const bindMin = useDrag(
    ({ xy, first, last, event }) => {
      event.preventDefault();

      const { seconds, progress } = getNewTimeProps(
        barRef.current.getBoundingClientRect(),
        xy[0],
        duration,
        0,
        maxTime
      );

      if (last) {
        setMinTime(seconds);
        return;
      }

      setMinBoundStyles(progress);
    },
    { event: { passive: false, capture: true } }
  );
  const bindMax = useDrag(
    ({ xy, first, last, event }) => {
      event.preventDefault();

      const { seconds, progress } = getNewTimeProps(
        barRef.current.getBoundingClientRect(),
        xy[0],
        duration,
        minTime,
        duration
      );

      if (last) {
        setMaxTime(seconds);
        return;
      }

      setMaxBoundStyles(progress);
    },
    { event: { passive: false, capture: true } }
  );

  React.useEffect(() => {
    if (ignoreTimeUpdates) {
      return;
    }

    setStyles(progress);
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div className={`timebar ${className || ""}`} style={{ position: "relative", ...style }}>
      <div ref={barRef} className="timebar-bar" style={barStyle} />
      <div {...bind()} className="timebar-circle" style={circleStyle} />
      <div {...bindMin()} className="timebar-bounds" style={minCircleStyle} />
      <div {...bindMax()} className="timebar-bounds" style={maxCircleStyle} />
      <div className="timebar-time-info">
        <div>{isSeeking ? "buffering..." : formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
}

export default TimeBar;
