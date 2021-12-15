import "./NeonParagraph.css"
import PropTypes from 'prop-types';

const NeonParagraph = props => {

    return <p style={{
        color: props.color,
        textShadow: `0 0 10px ${props.color}`,
        fontSize: props.size,
        className: "NeonParagraph",
        height: props.height,
        width: props.width,
        margin: "0px",
        padding: props.padding,
        boxSizing: "border-box",
        textAlign:"center"
    }}>{props.children}</p>;
  }

NeonParagraph.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

NeonParagraph.defaultProps = {
  color: "Blue",
  width: "auto",
  height: "auto",
  size: "24px",
  padding: "10px"
}

export default NeonParagraph;
