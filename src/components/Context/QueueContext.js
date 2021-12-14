import React, { createContext, useState, useEffect, useContext } from "react";
import Countdown from "../timers/Countdown";
import Tabata from "../timers/Tabata";
import XY from "../timers/XY";
import { TimerContext } from "./TimersContext";
import { CountdownContext } from "./CountdownContext";

export const QueueContext = createContext();

export const QueueProvider = (props) => {
  const [componentArray, setComponentArray] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [queueArray, setQueueArray] = useState(undefined);
  const [startCountdown, setStartCountdown] = useState(false);

  const { seconds, minutes, totalSeconds, initialTime, isActive } =
    useContext(TimerContext);

  const {setSeconds, setMinutes, setTotalSeconds, setInitialTime, setWork, setRest, setInitialWork, setInitialRest, setInitialRound, setRound} = useContext(TimerContext);

  const { work, rest, initialWork, initialRest, initialRound, round } =
    useContext(TimerContext);

    const {countdownStart} = useContext(CountdownContext);

  useEffect(() => {
    let time = 0;
    componentArray.map((timer) => (time = time + timer.totalSeconds));
    setTotalTime(time);
    console.log(time);

    // Set temporary array so we can revert back to the original
    setQueueArray(componentArray);

  }, [JSON.stringify(componentArray)]);

  const addComponent = (Component) => {
    setComponentArray(componentArray.concat(Component));
  };

  const removeComponent = (Index) => {
    const tempArray = [...componentArray];
    tempArray.splice(Index, 1);
    setComponentArray(tempArray);
  };

  // Queue Items

  const peek = () => {
    return queueArray[0];
  };

  const getSize = () => {
    return queueArray.getSize;
  };

  const isEmpty = () => {
    return queueArray.getSize() === 0;
  };

  const startQueue = () => {
    
    // Get the first item of the array
    let currItem = peek();
    // Update the TimerContext values based on the type of the object
    switch (currItem.name) {
      default : {
        return;
      }
      case "countdown": {
        setSeconds(currItem.seconds);
        setMinutes(currItem.minutes);
        setTotalSeconds(currItem.totalSeconds);
        setInitialTime(currItem.initialTime);
        setStartCountdown(true);
        countdownStart();
        return;
      }
      case "tabata": {
        work = currItem.work;
        rest = currItem.rest;
        initialWork = currItem.initialWork;
        initialRest = currItem.initialRest;
        round = currItem.round;
        setStartCountdown(true);
        return <Tabata></Tabata>;
      }
      case "XY": {
        initialTime = currItem.initialTime;
        round = currItem.round;
        setStartCountdown(true);
        return <XY></XY>;
      }
    }

  };

  return (
    <QueueContext.Provider
      value={{
        componentArray,
        setComponentArray,
        addComponent,
        removeComponent,
        startCountdown,
        startQueue
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};
