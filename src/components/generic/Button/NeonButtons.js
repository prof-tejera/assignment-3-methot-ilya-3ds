
import "./NeonButtons.css"
import PropTypes from 'prop-types';

const NeonButton = props => {
    return (
      <button
        onClick={props.onClick}
        style={
          {
            boxSizing: "border-box",
            textAlign: "center",
            width: props.width,
            height: props.height,
            cursor: props.disabled && "auto",
            borderRadius: "30px",
          }
        }
        className={props.className}
        disabled={props.disabled}
        selected={props.selected}

      >
        {props.text}
        {props.image}
        {props.children}
      </button>
    )
}

NeonButton.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

NeonButton.defaultProps = {
  width: 50,
  height: "50px",
  className: "StartButton",
  disabled: false,
}


export default NeonButton;