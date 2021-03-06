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
  const { initialRound, setInitialRound } = useContext(TimerContext);
  const { round, setRound } = useContext(TimerContext);
  const { roundType, setRoundType } = useContext(TimerContext);
  const { totalSeconds, setTotalSeconds } = useContext(TimerContext);

  const [isActive, setIsActive] = useState(false);

  let timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isActive) {
        if (work > 0) {
          setRoundType("work");
          const workSeconds = work - 1;
          setWork(workSeconds);
          setTotalSeconds(workSeconds);
        } else if (rest > 0) {
          setRoundType("rest");
          const restSeconds = rest - 1;
          setRest(restSeconds);
          setTotalSeconds(restSeconds);
        } else if (round > 1) {
          setRoundType("work");
          const currRound = round - 1;
          setRound(currRound);
          setWork(initialWork);
          setRest(initialRest);
          setTotalSeconds(work);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, [isActive, round, rest, work]);

  useEffect(() => {
    setRound(round);
    setInitialRound(round);
    if (work > 0) {
      setTotalSeconds(work);
    } else {
      setTotalSeconds(rest);
    }
  }, [work, rest, round]);

  return (
    <>
      <Background centered="true" height="400px" width="300px" padding="20px">
        <NeonParagraph padding="10px" height="10%" color="#00C0F9" size="36px">
          Tabata
        </NeonParagraph>

        <FlexColumn>
          <NeonParagraph
            padding="10px"
            height="10%"
            color="#00C0F9"
            size="18px"
          >
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

        <FlexRow width="100%" height="50%" padding="10px">
          <FlexColumn>
            <NeonParagraph
              color="#00C0F9"
              size="14px"
            >
              Work
            </NeonParagraph>
            <Incrementer
              padding="5px"
              value={work}
              onChange={setWork}
              width="60px"
              height="auto"
              max="60"
              min="0"
              scale="Seconds"
              addZeros="2"
            />
          </FlexColumn>
          <FlexColumn centered="true">
            <NeonParagraph color="#00C0F9" size="14px">
              Rest
            </NeonParagraph>
            <Incrementer
              padding="5px"
              value={rest}
              onChange={setRest}
              width="60px"
              height="auto"
              max="60"
              min="0"
              scale="Seconds"
              addZeros="2"
            />
          </FlexColumn>
        </FlexRow>
      </Background>
    </>
  );
};

export default Tabata;
