import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

export const TimerProvider = (props) => {

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
    const [round, setRound] = useState(1);


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
                round, setRound
            }}
        >
            {props.children}
        </TimerContext.Provider>
        
    );
}