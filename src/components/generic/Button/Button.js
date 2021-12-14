
import "./Button.css";
import PropTypes from 'prop-types';

const Button = props => {

    return (
      <button
        onClick={props.onClick}
        style={
          {
            boxSizing: "border-box",
            textAlign: "center",
            backgroundColor: props.color,
            width: props.width,
            height: props.height,
            cursor: props.disabled && "auto",
            borderRadius: "30px",
            fontSize: props.fontSize
          }
        }
        className={props.className}
        disabled={props.disabled}
        selected={props.selected}

      >
        {props.image}
        {props.children}
      </button>
    )
  
}

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Button.defaultProps = {
  width: "50",
  height: "50",
  className: "Default-button",
  disabled: false,
  selected: false,
  color: "black",
  fontSize: "auto"
}

export default Button;