import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";
import Timer from "./Timer";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  // const [activeSession, setActiveSession] = useState(initialSessionState);
  const [isFocusTimer, setIsFocusTimer] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [minutesRemaining, setMinutesRemaining] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [percentComplete, setPercentComplete] = useState(0);

  function toggleTimerType() {
    setIsFocusTimer((prevState) => !prevState);
    if (isFocusTimer === false) {
      setMinutesRemaining(breakDuration);
      setSecondsRemaining(0);
    } else {
      setMinutesRemaining(focusDuration);
      setSecondsRemaining(0);
    }
  }

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      updatePercentComplete();
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else if (minutesRemaining > 0 && secondsRemaining === 0) {
        setMinutesRemaining(minutesRemaining - 1);
        setSecondsRemaining(59);
      } else if (minutesRemaining === 0 && secondsRemaining === 0) {
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        toggleTimerType();
      }
    },
    isTimerRunning ? 1000 : null
  );

  function updatePercentComplete() {
    let totalSeconds;
    if (isFocusTimer === false) {
      totalSeconds = focusDuration * 60;
    } else {
      totalSeconds = breakDuration * 60;
    }
    const remainingTime =
      totalSeconds - (minutesRemaining * 60 + secondsRemaining);
    const percentComplete = (remainingTime / totalSeconds) * 100;
    setPercentComplete(percentComplete);
  }

  function showTimeRemaining() {
    if (secondsRemaining > 0) {
      return `${minutesRemaining}:${secondsRemaining}`;
    } else {
      return minutesToDuration(minutesRemaining);
    }
  }

  function stopSession() {
    setIsTimerVisible(false);
    setIsTimerRunning(false);
    setIsFocusTimer(false);
    setFocusDuration(25);
    setMinutesRemaining(25);
    setSecondsRemaining(0);
  }

  function playPause() {
    setIsTimerVisible(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  function decreaseFocusDuration() {
    const duration = Math.max(focusDuration - 5, 5);
    setFocusDuration(duration);
    setMinutesRemaining(duration);
    setSecondsRemaining(0);
  }

  function increaseFocusDuration() {
    const duration = Math.min(focusDuration + 5, 60);
    setFocusDuration(duration);
    setMinutesRemaining(duration);
    setSecondsRemaining(0);
  }

  function decreaseBreakDuration() {
    const duration = Math.max(breakDuration - 1, 1);
    setBreakDuration(duration);
  }

  function increaseBreakDuration() {
    const duration = Math.min(breakDuration + 1, 15);
    setBreakDuration(duration);
  }

  return (
    <div className="pomodoro">
      <div className="row mb-5">
        <div className="col">
          <div className="input-group input-group-lg">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={isTimerRunning}
                onClick={decreaseFocusDuration}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={isTimerRunning}
                onClick={increaseFocusDuration}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  disabled={isTimerRunning}
                  onClick={decreaseBreakDuration}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  disabled={isTimerRunning}
                  onClick={increaseBreakDuration}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              disabled={!isTimerRunning}
              onClick={stopSession}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Timer
        isTimerVisible={isTimerVisible}
        isFocusTimer={isFocusTimer}
        minutesToDuration={minutesToDuration}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        showTimeRemaining={showTimeRemaining}
        isTimerRunning={isTimerRunning}
        percentComplete={percentComplete}
      />
    </div>
  );
}

export default Pomodoro;
