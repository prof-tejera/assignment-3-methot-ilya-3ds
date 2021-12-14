import react, { useContext } from "react";
import FlexColumn from "../generic/FlexDivs/FlexColumn";
import NeonParagraph from "../generic/Paragraph/NeonParagraph";
import PropTypes from "prop-types";
import Button from "../generic/Button/Button";
import NeonButton from "../generic/Button/NeonButtons";
import { QueueContext } from "../Context/QueueContext";

const SmallTimerInfo = (props) => {
  const index = props.index;

  const { removeComponent } = useContext(QueueContext);

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  const convertSecondsToTimer = () => {
    let minutes = 0;
    let seconds = 0;
    const hoursRemainder = props.time % 60;
    minutes = Math.floor(props.time / 60);
    seconds = hoursRemainder % 60;
    return `${pad(minutes)}m : ${pad(seconds)}s`;
  };

  return (
    <>
      <FlexColumn centered="true">
        <NeonParagraph padding="5px" size="12px">
          {props.name}
        </NeonParagraph>
        <NeonParagraph padding="5px" size="12px">
          {convertSecondsToTimer()}
        </NeonParagraph>
        {props.currRound && (
          <NeonParagraph padding="5px" size="12px">
            {props.currRound} of {props.totalRound}
          </NeonParagraph>
        )}
        <NeonParagraph padding="5px" size="12px">
          {props.currState}
        </NeonParagraph>
        <NeonButton
          onClick={() => {
            removeComponent(props.index);
          }}
          padding="5px"
          width="20px"
          height="20px"
          fontSize="8px"
          className="PauseButton"
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
