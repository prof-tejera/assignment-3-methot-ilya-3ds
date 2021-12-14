import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Background from "../components/generic/Background/Background";
import NeonParagraph from "../components/generic/Paragraph/NeonParagraph";
import NeonButton from "../components/generic/Button/NeonButtons";
import FlexColumn from "../components/generic/FlexDivs/FlexColumn";
import FlexRow from "../components/generic/FlexDivs/FlexRow";
import { MenuContext } from "../components/Context/MenuContext";
import { QueueContext } from "../components/Context/QueueContext";
import { TimerContext } from "../components/Context/TimersContext";

function App() {
  const { stopwatch, setStopwatch } = useContext(MenuContext);
  const { countdown, setCountdown } = useContext(MenuContext);
  const { xy, setXY } = useContext(MenuContext);
  const { tabata, setTabata } = useContext(MenuContext);
  const { menu, setMenu } = useContext(MenuContext);

  const { addComponent } = useContext(QueueContext);

  const { seconds, minutes, hours, totalSeconds, initialTime, isActive } =
    useContext(TimerContext);

  const {work, rest, initialWork, initialRest, initialRound, round} = useContext(TimerContext);

  const{setDefaultState} = useContext(TimerContext);

  const [dataToSend, setDataToSend] = useState(undefined);

  const toggleCountdown = () => {
    setCountdown(!countdown);
    setMenu(false);
    //setNonMenu(true);
  };
  const toggleXY = () => {
    setXY(!xy);
    setMenu(false);
    //setNonMenu(true);
  };
  const toggleTabata = () => {
    setTabata(!tabata);
    setMenu(false);
    //setNonMenu(true);
  };

  const returnToMenu = () => {
    setMenu(true);
    //setNonMenu(false);
    setTabata(false);
    setXY(false);
    setCountdown(false);
    setStopwatch(false);
  };

  let countdownStateArray = {
    name: "countdown",
    status: "in-queue",
    seconds,
    minutes,
    hours,
    totalSeconds,
    initialTime,
    isActive,
  };

  let tabataStateArray = {
    name: "tabata",
    status: "in-queue",
    work,
    rest,
    initialWork,
    initialRest,
    initialRound,
    round
  }

  let xyStateArray = {
    name: "XY",
    status: "in-queue",
    totalSeconds,
    initialTime,
    round
  }

  useEffect(() => {
    if (countdown) {
      setDataToSend(countdownStateArray);
    }
    if (tabata) {
      setDataToSend(tabataStateArray);
    }
    if(xy) {
      setDataToSend(xyStateArray);
    }
    return () => {};
  }, [totalSeconds, round, work, rest]);

  return (
    <>
      <FlexRow>
        <FlexColumn>
          {menu && (
            <Background>
              <NeonParagraph color="red">Choose Timer</NeonParagraph>
              <FlexColumn width="100%" centered="true">
                <FlexRow width="100%" height="40%">
                  <FlexColumn>
                    <NeonParagraph color="white">XY</NeonParagraph>
                    <NeonButton onClick={toggleXY}>O</NeonButton>
                  </FlexColumn>
                </FlexRow>
                <FlexRow width="100%" height="40% ">
                  <FlexColumn>
                    <NeonParagraph color="white">Tabata</NeonParagraph>
                    <NeonButton onClick={toggleTabata}>O</NeonButton>
                  </FlexColumn>
                  <FlexColumn>
                    <NeonParagraph color="white">Countdown</NeonParagraph>
                    <NeonButton onClick={toggleCountdown}>O</NeonButton>
                  </FlexColumn>
                </FlexRow>
              </FlexColumn>
            </Background>
          )}
          {stopwatch && <Stopwatch></Stopwatch>}
          {xy && <XY></XY>}
          {countdown && <Countdown></Countdown>}
          {tabata && <Tabata></Tabata>}
        </FlexColumn>
        {!menu && (
          <FlexColumn height="300px">
            <Link to="/">
              <NeonButton
                onClick={() => {
                  returnToMenu();
                  addComponent(dataToSend);
                  setDefaultState();
                }}
              >
                <NeonParagraph color="white" size="8px">
                  Add
                </NeonParagraph>
              </NeonButton>
            </Link>

            <NeonButton onClick={returnToMenu} className="PauseButton">
              <NeonParagraph color="white" size="8px">
                Back
              </NeonParagraph>
            </NeonButton>
          </FlexColumn>
        )}
      </FlexRow>
    </>
  );
}

export default App;
