import PropTypes from 'prop-types';
import "./Input.css"

export const Input = props => {

 

  return (
    <input
      style={
        {
          boxSizing: "border-box",
          textAlign: "center",
          width: props.width,
          height: props.height,
          cursor: "auto",
          borderRadius: "30px",
          fontSize: "auto"
        }
      }
      value={props.value}
      onChange={props.onChange}
      className="display"
    >
    </input>
  )
}


Input.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.number,
  onChange: PropTypes.string
}

Input.defaultProps = {
  width: 50,
  height: 50,
  value: 0
}

export default Input;