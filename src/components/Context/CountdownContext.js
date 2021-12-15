import React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { QueueContext } from "./QueueContext";

export const CountdownContext = createContext();

export const CountdownProvider = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [work, setWork] = useState(0);
  const [rest, setRest] = useState(0);
  const [initialWork, setInitialWork] = useState(0);
  const [initialRest, setInitialRest] = useState(0);
  const [initialRound, setInitialRound] = useState(0);
  const [round, setRound] = useState(0);
  const [roundType, setRoundType] = useState("work");


  const { startQueue } = useContext(QueueContext);

  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isTabataActive, setIsTabataActive] = useState(false);

  let timer = useRef(null);

  // Countdown Timer
  useEffect(() => {
    timer.current = setInterval(() => {
      if (isCountdownActive) {
        if (totalSeconds >= 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);

          console.log(totalSeconds);
        } else {
          clearInterval(timer.current);
          startQueue();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [isCountdownActive, totalSeconds]);

  // Tabata Timer
  useEffect(() => {
    timer.current = setInterval(() => {
      if (isTabataActive) {
        if (work > 0) {
          const workSeconds = work - 1;
          setWork(workSeconds);
          setRoundType("work");
        } else if (rest > 0) {
          const restSeconds = rest - 1;
          setRest(restSeconds);
          setRoundType("rest");
        } else if (round > 1) {
          setRoundType("work");
          const currRound = round - 1;
          setRound(currRound);
          setWork(initialWork);
          setRest(initialRest);
        } else {
          tabataFinish();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [isTabataActive, round, rest, work]);

  const convertTimerToSeconds = () => {
    const totalSeconds = 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setMinutes(Math.floor(ConvertedSeconds / 60));
    const minutesRemainder = ConvertedSeconds % 60;
    setSeconds(minutesRemainder % 60);
  };

  // Countdown controls

  const countdownStart = () => {
    const initialSeconds = convertTimerToSeconds();
    setIsCountdownActive(true);
    setInitialTime(initialSeconds);
    setTotalSeconds(convertTimerToSeconds());
  };

  const countdownStop = () => {
    setIsCountdownActive(false);
    clearInterval(timer.current);
  };

  const countdownFinish = () => {
    setIsCountdownActive(false);
    clearInterval(timer.current);
    convertSecondsToTimer(0);
    startQueue();
  };

  // Tabata controls

  const tabataStart = () => {
    setInitialWork(work);
    setInitialRest(rest);
    setIsTabataActive(true);
  };

  const tabataStop = () => {
    clearInterval(timer.current);
    setIsTabataActive(false);
  };

  const tabataFinish = () => {
    clearInterval(timer.current);
    setWork(0);
    setRest(0);
    setIsTabataActive(false);
    startQueue();
  };

  return (
    // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

    <>
      <CountdownContext.Provider
        value={{
          countdownStart,
          countdownStop,
          countdownFinish,
          tabataStart,
          tabataStop,
          tabataFinish,
          seconds,
          setSeconds,
          minutes,
          setMinutes,

          totalSeconds,
          setTotalSeconds,
          initialTime,
          setInitialTime,

          work,
          setWork,
          rest,
          setRest,
          initialWork,
          setInitialWork,
          initialRest,
          setInitialRest,
          initialRound,
          setInitialRound,
          round,
          setRound,
          convertSecondsToTimer,
          roundType
        }}
      >
        {props.children}
      </CountdownContext.Provider>
    </>
  );
};
