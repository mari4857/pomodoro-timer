import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import { secondsToDuration } from "../utils/duration";
import Timer from "./Timer";
import PlayPause from "./PlayPause";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";

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
    if (secondsRemaining > 0 && secondsRemaining > 10) {
      return `${minutesRemaining}:${secondsRemaining}`;
    } else if (secondsRemaining > 0 && secondsRemaining <= 9) {
      return `${minutesRemaining}:0${secondsRemaining}`;
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
        <FocusDuration
          focusDuration={focusDuration}
          isTimerRunning={isTimerRunning}
          decreaseFocusDuration={decreaseFocusDuration}
          increaseFocusDuration={increaseFocusDuration}
        />
        <BreakDuration
          breakDuration={breakDuration}
          isTimerRunning={isTimerRunning}
          decreaseBreakDuration={decreaseBreakDuration}
          increaseBreakDuration={increaseBreakDuration}
        />
      </div>
      <PlayPause
        playPause={playPause}
        isTimerRunning={isTimerRunning}
        stopSession={stopSession}
      />
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
