import React, { useContext, useState, useEffect, useRef } from "react";
import FlexColumn from "../generic/FlexDivs/FlexColumn";
import FlexRow from "../generic/FlexDivs/FlexRow";
import Background from "../generic/Background/Background";
import Incrementer from "../generic/Incrementer/Incrementer";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import NeonButton from "../generic/Button/NeonButtons";
import { TimerContext } from "../Context/TimersContext";
import { MenuContext } from "../Context/MenuContext";

const XY = (props) => {
  const { round, setRound } = useContext(TimerContext);
  const { seconds, setSeconds } = useContext(TimerContext);
  const { minutes, setMinutes } = useContext(TimerContext);
  const { hours, setHours } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);
  const { initialTime, setInitialTime } = useContext(TimerContext);
  const {initialRound, setInitialRound} = useContext(TimerContext);

  const [isActive, setIsActive] = useState(false);


  let timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isActive) {
        if (totalSeconds > 0) {
          const seconds = totalSeconds - 1;
          setTotalSeconds(seconds);
          convertSecondsToTimer(seconds);
        } else {
          if (round > 1) {
            const currRound = round - 1;
            setRound(currRound);
            convertSecondsToTimer(initialTime);
          } else {
            stop();
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, totalSeconds]);

  useEffect(() => {
    setRound(round);
    setTotalSeconds(convertTimerToSeconds());

  }, [minutes, seconds, round])

  // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

  const convertTimerToSeconds = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  // Convert seconds into days, hours, minutes, and seconds for the countdown presentation

  const convertSecondsToTimer = (ConvertedSeconds) => {
  
    setMinutes(Math.floor(ConvertedSeconds / 60));
    setSeconds(ConvertedSeconds % 60);
  };

  // Buttons Start
  //

  const start = () => {
    const initialSeconds = convertTimerToSeconds();
    setInitialRound(round);
    setInitialTime(initialSeconds);
    setTotalSeconds(convertTimerToSeconds());
    setIsActive(true);
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
    <>
      <Background centered="true" width="300px" padding="20px">
        <FlexRow height="25%" centered="true">
          <NeonParagraph color="#00C0F9" size="24px">
            XY
          </NeonParagraph>
        </FlexRow>
        <FlexRow height="25%" padding="10px" width="100%">
          <NeonParagraph color="#00C0F9">Round</NeonParagraph>
          <Incrementer
            value={round}
            onChange={setRound}
            width="30px"
            height="30px"
            max="10"
            min="1"
          />
        </FlexRow>
        <FlexRow height="25%" padding="10px" spaceEvenly="true" width="100%">
          <Incrementer
            value={minutes}
            onChange={setMinutes}
            width="50px"
            height="30px"
            max="60"
            min="0"
            scale="m"
            addZeros="2"
          />
          <Incrementer
            value={seconds}
            onChange={setSeconds}
            width="50px"
            height="30px"
            max="60"
            min="0"
            scale="s"
            addZeros="2"
          />
        </FlexRow>
      </Background>
    </>
  );
};

export default XY;
