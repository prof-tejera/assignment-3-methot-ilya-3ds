import React, { useContext, useState, useEffect, useRef } from "react";
import FlexColumn from "../generic/FlexDivs/FlexColumn";
import FlexRow from "../generic/FlexDivs/FlexRow";
import Background from "../generic/Background/Background";
import Incrementer from "../generic/Incrementer/Incrementer";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import NeonButton from "../generic/Button/NeonButtons";
import { TimerContext } from "../Context/TimersContext";
import { MenuContext } from "../Context/MenuContext";

const Tabata = (props) => {
  const { work, setWork } = useContext(TimerContext);
  const { rest, setRest } = useContext(TimerContext);
  const { initialWork, setInitialWork } = useContext(TimerContext);
  const { initialRest, setInitialRest } = useContext(TimerContext);
  const { initialRound, setInitialRound} = useContext(TimerContext);
  const { round, setRound } = useContext(TimerContext);
  const {totalSeconds, setTotalSeconds} = useContext(TimerContext);

  const [isActive, setIsActive] = useState(false);

  let timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isActive) {
        if (work > 0) {
          const workSeconds = work - 1;
          setWork(workSeconds);
        } else if (rest > 0) {
          const restSeconds = rest - 1;
          setRest(restSeconds);
        } else if (round > 1) {
          const currRound = round - 1;
          setRound(currRound);
          setWork(initialWork);
          setRest(initialRest);
        } else {
          stop();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, round, rest, work]);


  const start = () => {
    setInitialWork(work);
    setInitialRest(rest);
    setIsActive(true);
  };

  const stop = () => {
    clearInterval(timer.current);
    setIsActive(false);
  };

  const restart = () => {
    clearInterval(timer.current);
    setWork(initialWork);
    setRest(initialRest);
    setIsActive(false);
  };

  const clear = () => {
    clearInterval(timer.current);
    setWork(0);
    setRest(0);
    setIsActive(false);
  };

  return (
    <>
      <Background centered="true" height="400px" width="300px" padding="20px">
        <NeonParagraph padding="10px" height="10%" color="#00C0F9" size="36px">
          Tabata
        </NeonParagraph>

    <FlexColumn>
        <NeonParagraph padding="10px" height="10%" color="#00C0F9" size="18px">
          Round
        </NeonParagraph>
        <Incrementer
          value={round}
          onChange={setRound}
          padding="10px"
          width="30px"
          height="auto"
          max="60"
          min="1"
        />
        </FlexColumn>

        <FlexRow width="100%" height="20%" padding="10px">
          <NeonParagraph margin="10px" color="#00C0F9" size="14px">
            Work
          </NeonParagraph>
          <Incrementer
            value={work}
            onChange={setWork}
            width="50px"
            height="auto"
            max="60"
            min="0"
            scale="s"
            addZeros="2"
          />
          <Incrementer
            value={rest}
            onChange={setRest}
            width="50px"
            height="auto"
            max="60"
            min="0"
            scale="s"
            addZeros="2"
          />
          <NeonParagraph padding="10px" color="#00C0F9" size="14px">
            Rest
          </NeonParagraph>
        </FlexRow>
      </Background>
    </>
  );
};

export default Tabata;
