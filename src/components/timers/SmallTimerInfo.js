import react, { useContext } from "react";
import FlexColumn from "../generic/FlexDivs/FlexColumn";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import PropTypes from "prop-types";
import NeonButton from "../generic/Button/NeonButtons";
import { QueueContext } from "../Context/QueueContext";
import Background from "../generic/Background/Background";
import SimpleBackground from "../generic/Background/SimpleBackground";

const SmallTimerInfo = (props) => {
  const index = props.index;

  const { removeComponent } = useContext(QueueContext);

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  const convertSecondsToTimer = (value) => {
    let minutes = 0;
    let seconds = 0;
    minutes = Math.floor(value / 60);
    seconds = value % 60;
    return `${pad(minutes)}m : ${pad(seconds)}s`;
  };

  return (
    <>
      <FlexColumn>
        <SimpleBackground
          width="100px"
          height="100px"
          padding="20px"
          margin="10px"
        >
          <FlexColumn spaceEvenly="true">
            <NeonParagraph padding="5px" size="12px">
              {props.name}
            </NeonParagraph>
            {props.name === 'stopwatch' && (
              <NeonParagraph padding="5px" size="12px">
                {`final time: ${convertSecondsToTimer(props.initialTime)}`}
              </NeonParagraph>
            )}
            <NeonParagraph padding="5px" size="12px">
              {convertSecondsToTimer(props.time)}
            </NeonParagraph>
            {props.currRound && (
              <NeonParagraph padding="5px" size="12px">
                {`${props.currRound} of ${props.totalRound}`}
              </NeonParagraph>
            )}
            <NeonParagraph padding="5px" size="12px">
              {props.currState}
            </NeonParagraph>

            <NeonParagraph padding="5px" size="12px">
              {props.status}
            </NeonParagraph>
          </FlexColumn>
        </SimpleBackground>
        <NeonButton
          onClick={() => {
            removeComponent(props.index);
          }}
          padding="5px"
          width="20px"
          height="20px"
          fontSize="8px"
          className="ClearButton"
        >
          X
        </NeonButton>
      </FlexColumn>
    </>
  );
};

SmallTimerInfo.propTypes = {
  name: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currRound: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalRound: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currState: PropTypes.string,
};

SmallTimerInfo.defaultProps = {
  name: "",
  time: "0",
  currRound: "",
  totalRound: "",
  currState: "",
};

export default SmallTimerInfo;
