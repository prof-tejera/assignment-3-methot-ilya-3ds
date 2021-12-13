import React, {useContext } from "react";

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


function App() {
  const {stopwatch, setStopwatch} = useContext(MenuContext);
  const {countdown, setCountdown} = useContext(MenuContext);
  const {xy, setXY} = useContext(MenuContext);
  const {tabata, setTabata} = useContext(MenuContext);
  const {menu, setMenu} = useContext(MenuContext);

  // I am not sure how to make a child component run a generic function taking in parameters
  // const toggle = (value, setter) => {
  //   setter(!value);
  // }

  const toggleStopwatch = () => {
    setStopwatch(!stopwatch);
    setMenu(false);
  };
  const toggleCountdown = () => {
    setCountdown(!countdown);
    setMenu(false);
  };
  const toggleXY = () => {
    setXY(!xy);
    setMenu(false);
  };
  const toggleTabata = () => {
    setTabata(!tabata);
    setMenu(false);
  };
  return (
    <>
      {menu && (
        <Background>
          <NeonParagraph color="red">Choose Timer</NeonParagraph>
          <FlexRow width="100%" spaceEvenly="true">
            <FlexColumn width="40%">
              <NeonParagraph color="white">StopWatch</NeonParagraph>
              <NeonButton onClick={toggleStopwatch}>O</NeonButton>
              <NeonParagraph color="white">XY</NeonParagraph>
              <NeonButton onClick={toggleXY}>O</NeonButton>
            </FlexColumn>
            <FlexColumn width="50%">
              <NeonParagraph color="white">Tabata</NeonParagraph>
              <NeonButton onClick={toggleTabata}>O</NeonButton>
              <NeonParagraph color="white">Countdown</NeonParagraph>
              <NeonButton onClick={toggleCountdown}>O</NeonButton>
            </FlexColumn>
          </FlexRow>
        </Background>
      )}
      {stopwatch && <Stopwatch></Stopwatch>}
      {xy && <XY></XY>}
      {countdown && <Countdown></Countdown>}
      {tabata && <Tabata></Tabata>}
    </>
    // <Timers>
    //   {timers.map((timer) => (
    //     <Timer>
    //       <TimerTitle>{timer.title}</TimerTitle>
    //       {timer.C}
    //     </Timer>
    //   ))}
    // </Timers>
  );
}

export default App;
