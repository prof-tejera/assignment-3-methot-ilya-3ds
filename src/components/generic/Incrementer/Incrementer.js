import Button from "../Button/Button";
import FlexColumn from "../FlexDivs/FlexColumn";
import FlexRow from "../FlexDivs/FlexRow";
import "./Incrementer.css";
import PropTypes from "prop-types";
import "../Input/Input.css";

const Incrementer = (props) => {
  const changeTime = (direction, maxMin) => {
    if (direction === "increment") {
      if (props.value < maxMin) {
        props.onChange(props.value + 1);
      }
    } else {
      if (props.value > maxMin) {
        props.onChange(props.value - 1);
      }
    }
  };

  // Add leading zeros
  // src: https://www.codegrepper.com/code-examples/javascript/react+js+add+leading+zeros

  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  // examples:
  // padLeadingZeros(57, 3);// "057"
  // padLeadingZeros(57, 4); //"0057"

  return (
    <>
      <FlexColumn
        padding="10px"
        width="auto"
        height="auto"
        centered="true"
        spaceEvenly="true"
        margin={props.margin}
      >
        <FlexRow width="auto" height="auto" spaceEvenly="true" centered="true">
          <Button
            onClick={() => {
              changeTime("increment", props.max);
            }}
            className="smallButton"
            width={props.width / 2}
            height={props.height / 2}
          >
            ^
          </Button>
        </FlexRow>
        <FlexRow width="auto" height="auto" centered="true">
          <input
            style={{
              boxSizing: "border-box",
              textAlign: "center",
              width: props.width,
              height: props.height,
              cursor: "auto",
              borderRadius: "30px",
              fontSize: "auto",
            }}
            value={props.value}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(+value)) {
                if (
                  +value <= props.max &&
                  +value >= props.min
                ) {
                  props.onChange(e.target.value);
                }
              }
            }}
            className="display"
          ></input> 
          
        </FlexRow>
        <FlexRow width="auto" height="auto" spaceEvenly="true" centered="true">
          <Button
            onClick={() => changeTime("decrease", props.min)}
            className="smallButton"
            width={props.width / 2}
            height={props.height / 2}
          >
            v
          </Button>
        </FlexRow>
      </FlexColumn>
    </>
  );
};

Incrementer.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addZeros: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scale: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  value: PropTypes.number,
};

Incrementer.defaultProps = {
  width: 50,
  height: 50,
  max: 10,
  min: 0,
  addZeros: 0,
  scale: "",
  margin: "0px",
  padding: "0px",
  value: 0,
};

export default Incrementer;
