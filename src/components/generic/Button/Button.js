
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
            fontSize: "auto"
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
}

Button.defaultProps = {
  width: "50px",
  height: "50px",
  className: "Default-button",
  disabled: false,
  selected: false,
  color: "black"
}

export default Button;