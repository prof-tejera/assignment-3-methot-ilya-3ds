import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import FlexRow from "../generic/FlexDivs/FlexRow";
import Background from "../generic/Background/Background";
import Incrementer from "../generic/Incrementer/Incrementer";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import NeonButton from "../generic/Button/NeonButtons";
import { TimerContext } from "../Context/TimersContext";
import FlexColumn from "../generic/FlexDivs/FlexColumn";
import { MenuContext } from "../Context/MenuContext";
const Countdown = (props) => {
  const { seconds, setSeconds } = useContext(TimerContext);
  const { minutes, setMinutes } = useContext(TimerContext);
  const { hours, setHours } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);
  const { initialTime, setInitialTime } = useContext(TimerContext);
  const {setTimerID } = useContext(TimerContext);

  const [isActive, setIsActive] = useState(false);

  const [showUI, setShowUI] = useState(false);

  const {setMenu} = useContext(MenuContext);
  const {setCountdown} = useContext(MenuContext);
  const [completed, setCompleted] = useState(false);

  const toggleMenu = () => {
    setCountdown(false);
    setMenu(true);
  }

  const toggleCompleted = () => {
    setCompleted(false);
  }

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
          setShowUI(false);
          setCompleted(true);
          clearInterval(timer.current);
        }
      }
    }, 1000);
    setTimerID(timer);

    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, totalSeconds]);

  useEffect(() => {}, [showUI]);

  const convertTimerToSeconds = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  // Convert seconds into days, hours, minutes, and seconds for the countdown presentation

  const convertSecondsToTimer = (ConvertedSeconds) => {
    setHours(Math.floor(ConvertedSeconds / 3600));
    const hoursRemainder = ConvertedSeconds % 3600;
    setMinutes(Math.floor(hoursRemainder / 60));
    setSeconds(hoursRemainder % 60);
  };

  const start = () => {
    const initialSeconds = convertTimerToSeconds();
    if (initialSeconds > 0) {
      setShowUI(true);
      setIsActive(true);
      setInitialTime(initialSeconds);
      setTotalSeconds(convertTimerToSeconds());
    }
  };

  const stop = () => {
    setShowUI(false);
    clearInterval(timer.current);
  };

  const restart = () => {
    setShowUI(false);
    clearInterval(timer.current);
    convertSecondsToTimer(initialTime);
  };

  const clear = () => {
    setShowUI(false);
    clearInterval(timer.current);
    convertSecondsToTimer(0);
  };

  // Turn off setInterval when reloading

  // this.componentWillUnmount = () => {
  //   clearInterval(this.state.timerID);
  // }

  // this.componentDidMount = () => {
  //   clearInterval(this.state.timerID);
  // }

  return (
    // Convert all of the days, hours, minutes, and seconds into seconds so we can more easily process the data

    <>
      {!completed && (
        <Background centered="true" width="300px" padding="20px">
          <FlexRow height="25%" centered="true">
            <NeonParagraph color="#00C0F9" size="24px">
              Countdown
            </NeonParagraph>
          </FlexRow>
          <FlexRow
            height="25%"
            padding="10px"
            spaceEvenly="true"
            centered="true"
            width="100%"
          >
            <Incrementer
              width="30px"
              height="30px"
              max="24"
              min="0"
              scale="h"
              addZeros={2}
              value={hours}
              onChange={setHours}
            />
            <Incrementer
              width="30px"
              height="30px"
              max="60"
              min="0"
              scale="m"
              addZeros={2}
              value={minutes}
              onChange={setMinutes}
            />
            <Incrementer
              width="30px"
              height="30px"
              max="60"
              min="0"
              scale="s"
              addZeros={2}
              value={seconds}
              onChange={setSeconds}
            />
          </FlexRow>
          <FlexRow
            padding="10px"
            width="100%"
            spaceEvenly="true"
            centered="true"
          >
            {!showUI && (
              <NeonButton
                className="StartButton"
                onClick={start}
                width="100%"
                height="50px"
              >
                Start
              </NeonButton>
            )}
            {showUI && (
              <NeonButton
                className="PauseButton"
                onClick={stop}
                width="30%"
                height="50px"
              >
                Pause
              </NeonButton>
            )}
            {showUI && (
              <NeonButton
                className="RestartButton"
                onClick={restart}
                width="20%"
                height="50px"
              >
                &#8634;
              </NeonButton>
            )}
          </FlexRow>
          <FlexRow
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
        </Background>
      )}
      {completed && (
        <Background centered="true" width="300px" padding="20px">
          <NeonParagraph>Completed</NeonParagraph>
          <FlexRow>
            <FlexColumn>
              <NeonParagraph>Return To Menu</NeonParagraph>
              <NeonButton onClick={toggleMenu}>O</NeonButton>
            </FlexColumn>
            <FlexColumn>
              <NeonParagraph>Set New Countdown</NeonParagraph>
              <NeonButton onClick={toggleCompleted}>O</NeonButton>
            </FlexColumn>
          </FlexRow>
        </Background>
      )}
    </>
  );
};

export default Countdown;
