import React, { useContext, useState, useEffect, useRef } from "react";
import FlexRow from "../generic/FlexDivs/FlexRow";
import Background from "../generic/Background/Background";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import { TimerContext } from "../Context/TimersContext";
import { MenuContext } from "../Context/MenuContext";
import Incrementer from "../generic/Incrementer/Incrementer";

const Stopwatch = (props) => {
  const { seconds, setSeconds } = useContext(TimerContext);
  const { minutes, setMinutes } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);
  const {initialTime, setInitialTime} = useContext(TimerContext);
  const { convertSecondsToTimer } = useContext(TimerContext);
  const [isActive, setIsActive] = useState(false);

  let timer = useRef(null);

  useEffect(() => {
    if (isActive) {
      timer.current = setInterval(() => {
        const seconds = totalSeconds + 0.01;
        setTotalSeconds(seconds);
        convertSecondsToTimer(seconds);
      }, 10);

      return () => {
        clearInterval(timer.current);
      };
    }
  }, [isActive, totalSeconds]);

  useEffect(() => {
    setInitialTime(convertTimerToSeconds());
  }, [seconds, minutes]);

  const convertTimerToSeconds = () => {
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  };

  return (
    <>
      <Background centered="true" width="300px" padding="20px">
        <FlexRow height="25%" centered="true">
          <NeonParagraph color="#00C0F9" size="24px">
            Stopwatch
          </NeonParagraph>
        </FlexRow>
        <FlexRow height="75%" spaceEvenly="true" width="auto" centered="true">
          <FlexRow
            height="25%"
            padding="10px"
            spaceEvenly="true"
            centered="true"
            width="100%"
          >
            <Incrementer
              width="100px"
              height="30px"
              max="60"
              min="0"
              scale="Minutes"
              addZeros={2}
              value={minutes}
              onChange={setMinutes}
            />
            <Incrementer
              width="100px"
              height="30px"
              max="60"
              min="0"
              scale="Seconds"
              addZeros={2}
              value={seconds}
              onChange={setSeconds}
            />
          </FlexRow>
        </FlexRow>
      </Background>
    </>
  );
};

export default Stopwatch;
