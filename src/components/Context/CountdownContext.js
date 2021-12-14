import React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TimerContext } from "./TimersContext";

export const CountdownContext = createContext();

export const CountdownProvider = (props) => {
  const { seconds, setSeconds } = useContext(TimerContext);
  const { minutes, setMinutes } = useContext(TimerContext);
  const { hours, setHours } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);
  const { initialTime, setInitialTime } = useContext(TimerContext);

  const [ isActive, setIsActive ] = useState(false);

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

  const countdownStart = () => {
      const initialSeconds = convertTimerToSeconds();
        setIsActive(true);
        setInitialTime(initialSeconds);
        setTotalSeconds(convertTimerToSeconds());
      
  };

  const countdownStop = () => {
    clearInterval(timer.current);
  };

  const countdownRestart = () => {
    clearInterval(timer.current);
    convertSecondsToTimer(initialTime);
  };

  const countdownClear = () => {
    clearInterval(timer.current);
    convertSecondsToTimer(0);
  };

  return (
    // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

    <>
       <CountdownContext.Provider
            value={{
                countdownStart
            }}
        >
            {props.children}
        </CountdownContext.Provider>
    </>
  );
};


