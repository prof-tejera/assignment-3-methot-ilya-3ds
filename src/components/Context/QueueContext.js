import React, { createContext, useState, useEffect, useRef } from "react";
import Countdown from "../timers/Countdown";
import Stopwatch from "../timers/Stopwatch";
import Tabata from "../timers/Tabata";
import XY from "../timers/XY";
import { CountdownContext } from "./CountdownContext";

export const QueueContext = createContext();

export const QueueProvider = (props) => {
  // Queues

  const [componentArray, setComponentArray] = useState([]);
  const [queueArray, setQueueArray] = useState(undefined);

  // Current Queue
  const [queueActive, setQueueActive] = useState(false);

  const [startCountdown, setStartCountdown] = useState(false);
  const [startTabata, setStartTabata] = useState(false);
  const [startXY, setStartXY] = useState(false);
  const [startStopwatch, setStartStopwatch] = useState(false);

  // Timer info
  const [name, setName] = useState("timer");
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

  // timer Status
  const [status, setStatus] = useState("in-queue");
  const [currID, setCurrID] = useState(0);

  let timer = useRef(null);
  const [currentItem, setCurrentItem] = useState({});
  const [savedInfo, setSavedInfo] = useState({});
  const [allowUpdate, setAllowUpdate] = useState(true);

  // Queue Methods

  useEffect(() => {
    // Set temporary array so we can revert back to the original
    setQueueArray(JSON.parse(JSON.stringify(componentArray)));
  }, [JSON.stringify(componentArray)]);

  useEffect(() => {
    console.log("something");
  }, [JSON.stringify(queueArray)]);

  const addComponent = (Component) => {
    if (Component) {
      Component.id = componentArray.length;
      setComponentArray(componentArray.concat(Component));
    }
  };

  const removeComponent = (Index) => {
    // Check if the timers are active and remove the from the corresponding array
    if (!queueActive) {
      const tempArray = [...componentArray];
      tempArray.splice(Index, 1);
      setComponentArray(tempArray);
    } else {
      const tempArray = [...queueArray];
      if (tempArray[Index].status === "processing") {
        clearInterval(timer.current);
        stopTimers();
      }
      tempArray.splice(Index, 1);
      setQueueArray(tempArray);
      startQueue();
    }
  };

  const updateItem = (Index) => {
    let placeholderArray = [...queueArray];
    if (allowUpdate) {
      placeholderArray.map((timer) => {
        if (timer.id === Index) {
          switch (timer.name) {
            case "countdown": {
              timer.status = status;
              timer.totalSeconds = totalSeconds;
              return timer;
            }
            case "tabata": {
              timer.status = status;
              timer.totalSeconds = totalSeconds;
              timer.round = round;
              timer.initialRound = initialRound;
              timer.roundType = roundType;
              return timer;
            }
            case "XY": {
              timer.status = status;
              timer.totalSeconds = totalSeconds;
              timer.initialTime = initialTime;
              timer.round = round;
              return timer;
            }
            case "stopwatch": {
              timer.status = status;
              timer.totalSeconds = totalSeconds;
              timer.initialTime = initialTime;
              timer.round = round;
              return timer;
            }
            default: {
              return timer;
            }
          }
        }
      });
      setQueueArray(placeholderArray);
    }
  };

  const nextItem = () => {
    switch (currentItem.name) {
      case "stopwatch": {
        clearInterval(timer.current);
        setTotalSeconds(currentItem.totalSeconds);
        setStatus("completed");
        //startQueue();
        return;
      }
      case "countdown": {
        clearInterval(timer.current);
        setTotalSeconds(0);
        setStatus("completed");
        startQueue();
        
        return;
      }
      case "XY": {
        clearInterval(timer.current);
        setRound(1);
        setTotalSeconds(0);
        setStatus("completed");
        startQueue();
        
        return;
      }
      case "tabata": {
        clearInterval(timer.current);
        setRoundType("rest");
        setTotalSeconds(0);
        setRound(1);
        setStatus("completed");
        startQueue();
        
        return;
      }
      default: {
        return;
      }
    }
  }

  const startQueue = async () => {
    for (let i = 0; i < queueArray.length; i++) {
      let currItem = queueArray[i];
      if (currItem.status === "processing") {
        break;
      } else if (currItem.status === "in-queue") {
        switch (currItem.name) {
          default: {
            return;
          }
          case "countdown": {
            setCurrentItem(currItem);
            setName("countdown");
            setSeconds(currItem.seconds);
            setMinutes(currItem.minutes);
            setTotalSeconds(currItem.totalSeconds);
            setInitialTime(currItem.initialTime);
            setStartCountdown(true);
            setCurrID(currItem.id);
            setStatus("processing");
            return;
          }
          case "tabata": {
            setCurrentItem(currItem);
            setName("tabata");
            setWork(currItem.work);
            setRest(currItem.rest);
            setRound(currItem.round);
            setInitialRound(currItem.initialRound);
            setRoundType("work");
            setCurrID(currItem.id);
            setTotalSeconds(currItem.totalSeconds);
            setStartTabata(true);
            setStatus("processing");
            return;
          }
          case "XY": {
            setCurrentItem(currItem);
            setName("XY");
            setInitialTime(currItem.totalSeconds);
            setTotalSeconds(currItem.totalSeconds);
            setRound(currItem.round);
            setInitialRound(currItem.initialRound);
            setCurrID(currItem.id);
            setStartXY(true);
            setStatus("processing");
            return;
          }
          case "stopwatch": {
            setCurrentItem(currItem);
            setName("stopwatch");
            setSeconds(currItem.seconds);
            setMinutes(currItem.minutes);
            setTotalSeconds(currItem.totalSeconds);
            setInitialTime(currItem.initialTime);
            setStartStopwatch(true);
            setCurrID(currItem.id);
            setStatus("processing");
            return;
          }
        }
      } else if (i === queueArray.length - 1) {
        // finish the method here
      }
    }
  };

  // Timer Methods

  // Timer Helper Methods
  const convertTimerToSeconds = () => {
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  };

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setMinutes(Math.floor(ConvertedSeconds / 60));
    const minutesRemainder = ConvertedSeconds % 60;
    setSeconds(minutesRemainder);
  };

  const stopTimers = () => {
    setAllowUpdate(true);
    countdownStop();
    tabataStop();
    XYStop();
    stopwatchStop();
  };

  const pauseTimers = () => {
    setAllowUpdate(false);

    setStartCountdown(false);
    setStartTabata(false);
    setStartXY(false);
    setStartStopwatch(false);

    let savedObj = {
      name: name,
      seconds: seconds,
      minutes: minutes,
      totalSeconds: totalSeconds,
      initialTime: initialTime,
      work: work,
      rest: rest,
      initialWork: initialWork,
      initialRest: initialRest,
      initialRound: initialRound,
      round: round,
      roundType: roundType,
    };

    setSavedInfo(savedObj);

    resetState();
  };

  const resetState = () => {
    setName(undefined);
    setSeconds(undefined);
    setMinutes(undefined);
    setTotalSeconds(undefined);
    setInitialTime(undefined);
    setWork(undefined);
    setRest(undefined);
    setInitialWork(undefined);
    setInitialRest(undefined);
    setInitialRound(undefined);
    setRound(undefined);
    setRoundType(undefined);
  };

  const resumeState = (obj) => {
    setName(obj.name);
    setSeconds(obj.seconds);
    setMinutes(obj.minutes);
    setTotalSeconds(obj.totalSeconds);
    setInitialTime(obj.initialTime);
    setWork(obj.work);
    setRest(obj.rest);
    setInitialWork(obj.initialWork);
    setInitialRest(obj.initialRest);
    setInitialRound(obj.initialRound);
    setRound(obj.round);
    setRoundType(obj.roundType);
  };

  const resumeTimers = () => {
    setAllowUpdate(true);
    resumeState(savedInfo);

    switch (savedInfo.name) {
      default: {
        return;
      }
      case "countdown": {
        setStartCountdown(true);
        return;
      }
      case "tabata": {
        setStartTabata(true);
        return;
      }
      case "XY": {
        setStartXY(true);
        return;
      }
      case "stopwatch": {
        setStartStopwatch(true);
        return;
      }
    }
  };

  useEffect(() => {
    if (status === "processing") {
      updateItem(currID);
    }
  }, [minutes, seconds, round, work, rest, totalSeconds, roundType]);

  useEffect(() => {
    if (startTabata) {
      tabataStart();
    }
    if (startCountdown) {
      countdownStart();
    }
    if (startXY) {
      XYStart();
    }
    if (startStopwatch) {
      stopwatchStart();
    }
    return () => {};
  }, [startTabata, startCountdown, startXY, startStopwatch]);
  // When timer completes

  useEffect(() => {
    if (status === "completed") {
      updateItem(currID);
      startQueue();
    }
  }, [status]);

  // Countdown Timer

  useEffect(() => {
    if (startCountdown) {
      timer.current = setInterval(() => {
        if (totalSeconds > 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);
          updateItem(currID);
          console.log(totalSeconds);
        } else {
          countdownFinish();
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [totalSeconds]);

  // Countdown controls

  const countdownStart = () => {
    const initialSeconds = convertTimerToSeconds();
    setInitialTime(initialSeconds);
    setTotalSeconds(convertTimerToSeconds());
  };

  const countdownStop = () => {
    setStartCountdown(false);
    clearInterval(timer.current);
  };

  const countdownFinish = () => {
    setStartCountdown(false);
    clearInterval(timer.current);
    convertSecondsToTimer(0);
    setStatus("completed");
  };

  // Tabata Timer

  useEffect(() => {
    if (startTabata) {
      timer.current = setInterval(() => {
        if (work > -1) {
          if (work === 0) {
            setWork(work - 1);
            setTotalSeconds(rest);
            setRoundType("rest");
          } else {
            setWork(work - 1);
            setTotalSeconds(work - 1);
            setRoundType("work");
          }
        } else if (rest > 0) {
          setRest(rest - 1);
          setTotalSeconds(rest - 1);
          setRoundType("rest");
        } else if (round > 1) {
          setRoundType("work");
          setRound(round - 1);
          setTotalSeconds(initialWork);
          setWork(initialWork);
          setRest(initialRest);
        } else {
          tabataFinish();
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [initialRound, round, rest, work, totalSeconds]);

  // Tabata controls

  const tabataStart = () => {
    setInitialWork(work);
    setInitialRest(rest);
    setInitialRound(round);
  };

  const tabataStop = () => {
    clearInterval(timer.current);
    setTotalSeconds(0);
    setRoundType("work");
    setStartTabata(false);
  };

  const tabataFinish = () => {
    clearInterval(timer.current);
    setWork(0);
    setRest(0);
    setStartTabata(false);
    setStatus("completed");
  };

  useEffect(() => {
    if (startXY) {
      timer.current = setInterval(() => {
        if (totalSeconds > 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
        } else {
          if (round > 1) {
            const currRound = round - 1;
            setRound(currRound);
            setTotalSeconds(initialTime);
          } else {
            XYFinish();
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [round, totalSeconds]);

  const XYStart = () => {
    setInitialRound(round);
    setInitialTime(totalSeconds);
    setTotalSeconds(0);
  };

  const XYStop = () => {
    clearInterval(timer.current);
    setTotalSeconds(0);
    setStartXY(false);
  };

  const XYFinish = () => {
    clearInterval(timer.current);
    setStartTabata(false);
    setStatus("completed");
    setInitialRound(0);
    setInitialTime(0);
  };

  // Stopwatch

  useEffect(() => {
    if (startStopwatch) {
      timer.current = setInterval(() => {
        if (totalSeconds < initialTime) {
          const seconds = totalSeconds + 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);
        } else {
          stopwatchFinished();
        }
      }, 1000);

      return () => {
        clearInterval(timer.current);
      };
    }
  }, [initialTime, totalSeconds]);

  const stopwatchStart = () => {
    setTotalSeconds(totalSeconds);
    setInitialTime(initialTime);
  };

  const stopwatchStop = () => {
    setStartStopwatch(false);
    clearInterval(timer.current);
    setTotalSeconds(0);
    setInitialTime(0);
  };

  const stopwatchFinished = () => {
    setStartStopwatch(false);
    clearInterval(timer.current);
    setStatus("completed");
    setTotalSeconds(0);
    setInitialTime(0);
  };

  return (
    <QueueContext.Provider
      value={{
        componentArray,
        setComponentArray,
        addComponent,
        removeComponent,
        startCountdown,
        startQueue,
        queueArray,
        stopTimers,
        setQueueArray,
        setQueueActive,
        pauseTimers,
        resumeTimers,
        nextItem
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};
