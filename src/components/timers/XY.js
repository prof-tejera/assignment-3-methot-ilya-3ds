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

  const [isActive, setIsActive] = useState(false);

  const [setShowUI] = useState(false);

  let timer = useRef(null);

  
  const {setMenu} = useContext(MenuContext);
  const {setXY} = useContext(MenuContext);
  const [completed, setCompleted] = useState(false);

  const toggleMenu = () => {
    setXY(false);
    setMenu(true);
  }

  const toggleCompleted = () => {
    setCompleted(false);
  }

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
            setCompleted(true);
            stop();
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, totalSeconds]);

  // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

  const convertTimerToSeconds = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  // Convert seconds into days, hours, minutes, and seconds for the countdown presentation

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setHours(Math.floor(ConvertedSeconds / 3600));
    console.log("hours " + Math.floor(ConvertedSeconds / 3600))
    const hoursRemainder = ConvertedSeconds % 3600;
    setMinutes(Math.floor(hoursRemainder / 60));
    console.log("minutes " + Math.floor(hoursRemainder / 60))
    setSeconds(hoursRemainder % 60);
    console.log("minutes " + hoursRemainder % 60)
  };

  // Buttons Start
  //

  const start = () => {
    const initialSeconds = convertTimerToSeconds();
    setInitialTime(initialSeconds);
    setTotalSeconds(convertTimerToSeconds())
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
      {!completed && <Background centered="true" width="300px" padding="20px">
        <FlexRow height="25%" centered="true">
          <NeonParagraph color="#00C0F9" size="24px">
            XY
          </NeonParagraph>
        </FlexRow>
        <FlexRow height="25%" padding="10px" width="100%">
          <NeonParagraph color="#00C0F9">Round</NeonParagraph>
          <Incrementer value={round} onChange={setRound} width="30px" height="30px" max="10" min="1" />
        </FlexRow>
        <FlexRow height="25%" padding="10px" spaceEvenly="true" width="100%">
          <Incrementer
          value={hours}
          onChange={setHours}
            width="30px"
            height="30px"
            max="24"
            min="0"
            scale="h"
            addZeros="2"
          />
          <Incrementer
          value={minutes}
          onChange={setMinutes}
            width="30px"
            height="30px"
            max="60"
            min="0"
            scale="m"
            addZeros="2"
          />
          <Incrementer
          value={seconds}
          onChange={setSeconds}
            width="30px"
            height="30px"
            max="60"
            min="0"
            scale="s"
            addZeros="2"
          />
        </FlexRow>
        <FlexRow height="25%" padding="10px" width="100%" centered="true">
          <NeonButton
            className="StartButton"
            onClick={start}
            width="30%"
            height="50px"
          >
            Start
          </NeonButton>
          <NeonButton
            className="PauseButton"
            onClick={stop}
            width="30%"
            height="50px"
          >
            Pause
          </NeonButton>
          <NeonButton
            className="RestartButton"
            onClick={restart}
            width="20%"
            height="50px"
          >
            &#8634;
          </NeonButton>
        </FlexRow>
        <FlexRow
          height="25%"
          padding="10px"
          width="100%"
          spaceEvenly="true"
          centered="true"
        >
          <NeonButton
            className="ClearButton"
            onClick={clear}
            width="100%"
            height="50px"
          >
            Clear
          </NeonButton>
        </FlexRow>
      </Background>}
      {completed && (
        <Background centered="true" width="300px" padding="20px">
          <NeonParagraph>Completed</NeonParagraph>
          <FlexRow>
            <FlexColumn>
              <NeonParagraph>Return To Menu</NeonParagraph>
              <NeonButton onClick={toggleMenu}>O</NeonButton>
            </FlexColumn>
            <FlexColumn>
              <NeonParagraph>Set New XY Timer</NeonParagraph>
              <NeonButton onClick={toggleCompleted}>O</NeonButton>
            </FlexColumn>
          </FlexRow>
        </Background>
      )}
    </>
  );
};

export default XY;
