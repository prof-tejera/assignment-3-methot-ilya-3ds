import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

export const TimerProvider = (props) => {

    const setDefaultState = () => {
        setSeconds(0);
        setMinutes(0);
        setTotalSeconds(0);
        setInitialTime(0);
        setTimerID(0);
        setWork(0);
        setRest(0);
        setInitialWork(0);
        setInitialRest(0);
        setInitialRound(0);
        setRound(1);
    }

    // most timers
    const [milleseconds, setMilleseconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [timerID, setTimerID] = useState(0);

    // tabata
    const [currentState, setCurrentState] = useState("work");
    const [work, setWork] = useState(0);
    const [rest, setRest] = useState(0);
    const [initialWork, setInitialWork] = useState(0);
    const [initialRest, setInitialRest] = useState(0);
    const [initialRound, setInitialRound] = useState(1);
    const [round, setRound] = useState(1);

    const convertSecondsToTimer = (ConvertedSeconds) => {
        setHours(Math.floor(ConvertedSeconds / 3600));
        const hoursRemainder = ConvertedSeconds % 3600;
        setMinutes(Math.floor(hoursRemainder / 60));
        const minutesRemainder = hoursRemainder % 60;
        setSeconds(Math.floor(minutesRemainder / 1));
        const secondsRemainder = minutesRemainder % 1;
        setMilleseconds(Math.floor(secondsRemainder / .01));
      }


    return (
        
        <TimerContext.Provider
            value={{
                milleseconds, setMilleseconds,
                seconds, setSeconds,
                minutes, setMinutes,
                hours, setHours,
                totalSeconds, setTotalSeconds,
                initialTime, setInitialTime,
                timerID, setTimerID,
                currentState, setCurrentState,
                work, setWork,
                rest, setRest,
                initialWork, setInitialWork,
                initialRest, setInitialRest,
                initialRound, setInitialRound,
                round, setRound,
                convertSecondsToTimer,
                setDefaultState
            }}
        >
            {props.children}
        </TimerContext.Provider>
        
    );
}