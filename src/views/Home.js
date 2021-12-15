import react, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlexColumn from "../components/generic/FlexDivs/FlexColumn";
import FlexRow from "../components/generic/FlexDivs/FlexRow";
import NeonParagraph from "../components/generic/Paragraph/NeonParagraph";
import { QueueContext } from "../components/Context/QueueContext";
import NeonButton from "../components/generic/Button/NeonButtons";
import SmallTimerInfo from "../components/timers/SmallTimerInfo.js";
import { QueueProvider } from "../components/Context/QueueContext";

const Home = () => {
  const { componentArray, queueArray, setQueueArray, setQueueActive } = useContext(QueueContext);
  const { startQueue, stopTimers } = useContext(QueueContext);
  const [currArray, setCurrArray] = useState(componentArray);

  const [useArrayQueue, setUseArrayQueue] = useState(false);

  useEffect(() => {
      if(useArrayQueue) {
        setQueueActive(true);
        setCurrArray(queueArray)
      }
      else {
        setQueueActive(false);
        setCurrArray(componentArray);
      }
  }, [useArrayQueue]);

  useEffect(() => {
    if(useArrayQueue) {
      startQueue()
    }
}, [currArray]);

  return (
    <FlexColumn>
      <NeonParagraph> Timers In Queue</NeonParagraph>
      <FlexRow height="200px">
        {currArray.map((timer, i) => {
          if (timer.name === "countdown") {
            return (
              <SmallTimerInfo
                name={timer.name}
                time={timer.totalSeconds}
                index={i}
              ></SmallTimerInfo>
            );
          }
          if (timer.name === "tabata") {
            return (
              <SmallTimerInfo
                name={timer.name}
                time={timer.work}
                currRound="0"
                totalRound={timer.round}
                currState={"Work"}
                index={i}
              ></SmallTimerInfo>
            );
          }
          if (timer.name === "XY") {
            return (
              <SmallTimerInfo
                name={timer.name}
                time={timer.totalSeconds}
                currRound="0"
                totalRound={timer.round}
                index={i}
              ></SmallTimerInfo>
            );
          }
        })}

        {!useArrayQueue && <FlexColumn>
          <Link to="/add">
            <NeonButton>+</NeonButton>
          </Link>
          <NeonParagraph> Add Timer</NeonParagraph>
        </FlexColumn>}
      </FlexRow>
      <FlexRow>
       {!useArrayQueue && <NeonButton
          onClick={() => {
            setQueueArray(JSON.parse(JSON.stringify(componentArray)));
            setUseArrayQueue(true);
          }}
          className="StartButton"
          width="20vw"
        >
          Start
        </NeonButton>}
        {useArrayQueue && <NeonButton
          onClick={() => {
            stopTimers();
            setUseArrayQueue(false);
          }}
          className="StopButton"
          width="20vw"
        >
          Stop
        </NeonButton>}
      </FlexRow>
    </FlexColumn>
  );
};

export default Home;
