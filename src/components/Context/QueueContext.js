import React, { createContext, useState, useEffect, useRef } from "react";
import Countdown from "../timers/Countdown";
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

  // Timer info
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

  const [isTabataActive, setIsTabataActive] = useState(false);

  // Queue Methods

  useEffect(() => {
    // Set temporary array so we can revert back to the original
    setQueueArray(JSON.parse(JSON.stringify(componentArray)));
  }, [JSON.stringify(componentArray)]);

  const addComponent = (Component) => {
    if (Component) {
      Component.id = componentArray.length;
      setComponentArray(componentArray.concat(Component));
    }
  };

  const removeComponent = (Index) => {
    if (!queueActive) {
      const tempArray = [...componentArray];
      tempArray.splice(Index, 1);
      setComponentArray(tempArray);
    }
    else {
      const tempArray = [...queueArray];
      tempArray.splice(Index, 1);
      setQueueArray(tempArray);
    }
  };

  const updateItem = (Index) => {
    let placeholderArray = [...queueArray];
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
            timer.work = work;
            timer.rest = rest;
            timer.round = round;
            timer.initialRound = initialRound;
            return timer;
          }
          case "XY": {
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
  };

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
            work = currItem.work;
            rest = currItem.rest;
            initialWork = currItem.initialWork;
            initialRest = currItem.initialRest;
            round = currItem.round;
            setCurrID(currItem.id);
            setStartCountdown(true);
            return <Tabata></Tabata>;
          }
          case "XY":
            {
              initialTime = currItem.initialTime;
              round = currItem.round;
              setCurrID(currItem.id);
              setStartCountdown(true);
              return <XY></XY>;
            }
            break;
        }
      } else if (i === queueArray.length - 1) {
        // finish the method here
      }
    }
  };

  // Timer Methods

  // Stop all timers

  const stopTimers = () => {
    countdownStop();
    tabataStop();
  };

  // Countdown Timer

  useEffect(() => {
    if (startCountdown) {
      countdownStart();
    }
    return () => {};
  }, [startCountdown]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (startCountdown) {
        if (totalSeconds > 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);
          updateItem(currID);
          console.log(totalSeconds);
        } else {
          countdownFinish();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [totalSeconds]);

  // Tabata Timer
  useEffect(() => {
    timer.current = setInterval(() => {
      if (isTabataActive) {
        if (work > 0) {
          const workSeconds = work - 1;
          setWork(workSeconds);
          setRoundType("work");
          updateItem(currID);
        } else if (rest > 0) {
          const restSeconds = rest - 1;
          setRest(restSeconds);
          setRoundType("rest");
          updateItem(currID);
        } else if (round > 1) {
          setRoundType("work");
          const currRound = round - 1;
          setRound(currRound);
          setWork(initialWork);
          setRest(initialRest);
          updateItem(currID);
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
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  };

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setMinutes(Math.floor(ConvertedSeconds / 60));
    const minutesRemainder = ConvertedSeconds % 60;
    setSeconds(minutesRemainder);
  };

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

  useEffect(() => {
    if (status === "completed") {
      updateItem(currID);
      startQueue();
    }
  }, [status]);

  const countdownFinish = () => {
    setStartCountdown(false);
    clearInterval(timer.current);
    convertSecondsToTimer(0);
    setStatus("completed");
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
      }}
    >
      {props.children}
    </QueueContext.Provider>
  );
};
