import "./SimpleBackground.css";
import FlexColumn from "../FlexDivs/FlexColumn.js";
import PropTypes from "prop-types";

const SimpleBackground = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          width: props.width,
          height: props.height,
          flexDirection: "column",
          padding: props.padding,
          borderRadius: "25px",
          margin: props.margin
        }}
        className="Background"
      >
        <FlexColumn
          width="100%"
          height="100%"
          centered="true"
          spaceAround="true"
        >
          <div className="container">
            <FlexColumn
              padding="10px"
              width="100%"
              height="100%"
              centered= "true"
            >
              {props.children}
            </FlexColumn>
          </div>
        </FlexColumn>
      </div>
    </>
  );
};

SimpleBackground.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

SimpleBackground.defaultProps = {
  width: 300,
  height: 400,
  padding: "10px",
  margin: "2px"
};

export default SimpleBackground;
