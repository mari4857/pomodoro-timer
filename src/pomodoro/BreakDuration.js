import React from "react";
import { minutesToDuration } from "../utils/duration";

function BreakDuration(props) {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg">
          <span className="input-group-text" data-testid="duration-break">
            {/* TODO: Update this text to display the current break session duration */}
            Break Duration: {minutesToDuration(props.breakDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              disabled={props.isTimerRunning}
              onClick={props.decreaseBreakDuration}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              disabled={props.isTimerRunning}
              onClick={props.increaseBreakDuration}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakDuration;
