import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import FlexRow from "../generic/FlexDivs/FlexRow";
import Background from "../generic/Background/Background";
import Incrementer from "../generic/Incrementer/Incrementer";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import NeonButton from "../generic/Button/NeonButtons";
import { TimerContext } from "../Context/TimersContext";
import { QueueContext } from "../Context/QueueContext";

const Countdown = (props) => {
  const { seconds, setSeconds } = useContext(TimerContext);
  const { minutes, setMinutes } = useContext(TimerContext);
  const { hours, setHours } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);
  const { initialTime, setInitialTime } = useContext(TimerContext);
  const { isActive, setIsActive } = useContext(TimerContext);

  const { startCountdown } = useContext(QueueContext);

  let timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isActive) {
        if (totalSeconds > 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);

          console.log(totalSeconds);
        } else {
          clearInterval(timer.current);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, totalSeconds]);

  useEffect(() => {
    setTotalSeconds(convertTimerToSeconds());
  }, [seconds, minutes, hours]);

  useEffect(() => {
    if (startCountdown) {
      start();
    }
  }, [startCountdown]);

  const convertTimerToSeconds = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setHours(Math.floor(ConvertedSeconds / 3600));
    const hoursRemainder = ConvertedSeconds % 3600;
    setMinutes(Math.floor(hoursRemainder / 60));
    setSeconds(hoursRemainder % 60);
  };

  const start = () => {
    if (startCountdown) {
      const initialSeconds = convertTimerToSeconds();
      if (initialSeconds > 0) {
        setIsActive(true);
        setInitialTime(initialSeconds);
        setTotalSeconds(convertTimerToSeconds());
      }
    }
  };

  const stop = () => {
    clearInterval(timer.current);
  };

  const restart = () => {
    clearInterval(timer.current);
    convertSecondsToTimer(initialTime);
  };

  const clear = () => {
    clearInterval(timer.current);
    convertSecondsToTimer(0);
  };

  return (
    // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

    <>
      {start()}
      <Background centered="true" width="300px" padding="20px">
        <FlexRow height="25%" centered="true">
          <NeonParagraph color="#00C0F9" size="24px">
            Countdown
          </NeonParagraph>
        </FlexRow>
        <FlexRow
          height="25%"
          padding="10px"
          spaceEvenly="true"
          centered="true"
          width="100%"
        >
          <Incrementer
            width="30px"
            height="30px"
            max="24"
            min="0"
            scale="h"
            addZeros={2}
            value={hours}
            onChange={setHours}
          />
          <Incrementer
            width="30px"
            height="30px"
            max="60"
            min="0"
            scale="m"
            addZeros={2}
            value={minutes}
            onChange={setMinutes}
          />
          <Incrementer
            width="30px"
            height="30px"
            max="60"
            min="0"
            scale="s"
            addZeros={2}
            value={seconds}
            onChange={setSeconds}
          />
        </FlexRow>
        <FlexRow padding="10px" width="100%" spaceEvenly="true" centered="true">
          {startCountdown && (
            <NeonButton
              className="RestartButton"
              onClick={restart}
              width="20%"
              height="50px"
            >
              &#8634;
            </NeonButton>
          )}
        </FlexRow>
        <FlexRow padding="10px" width="100%" spaceEvenly="true" centered="true">
          <NeonButton
            className="ClearButton"
            onClick={clear}
            width="100%"
            height="50px"
          >
            Clear
          </NeonButton>
        </FlexRow>
      </Background>
    </>
  );
};

export default Countdown;
