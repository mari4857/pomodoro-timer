import React from "react";

function Timer(props) {
  const timerDisplay = props.isTimerVisible
    ? { display: "block" }
    : { display: "none" };
  const sessionTitle = props.isFocusTimer ? "On Break" : "Focusing";
  const sessionDuration = props.isFocusTimer
    ? props.minutesToDuration(props.breakDuration)
    : props.minutesToDuration(props.focusDuration);
  const paused = !props.isTimerRunning ? <h3>PAUSED</h3> : null;

  return (
    <div style={timerDisplay}>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {sessionTitle} for {sessionDuration} minutes
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {props.showTimeRemaining()} remaining
          </p>
          {paused}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={props.percentComplete} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${props.percentComplete}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
