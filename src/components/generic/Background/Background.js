import "./Background.css";
import FlexColumn from "../FlexDivs/FlexColumn.js";
import PropTypes from "prop-types";

const Background = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "black",
          width: props.width,
          height: props.height,
          flexDirection: "column",
          padding: props.padding,
          borderRadius: "25px",
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
              spaceAround="true"
            >
              {props.children}
            </FlexColumn>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
            <div className="frame"></div>
          </div>
        </FlexColumn>
      </div>
    </>
  );
};

Background.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.string,
};

Background.defaultProps = {
  width: 300,
  height: 400,
  padding: "10px",
};

export default Background;
