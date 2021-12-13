
import PropTypes from 'prop-types';

const styles = {
  centered: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  spaceEvenly: {
    justifyContent: "space-around",
    alignContent: "space-around",
  },
};

const FlexColumn = props => {
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: props.color,
          width: props.width,
          height: props.height,
          flexDirection: "column",
          margin: props.margin,
          padding: props.padding,
          alignItems: "center",
          alignContent: "center",
          boxSizing: "border-box",
          justifyContent: props.spaceEvenly ? styles.spaceEvenly.justifyContent : styles.centered.justifyContent
        }}
        className="Flex-Column"
      >
        {props.children}
      </div>
    );
}

FlexColumn.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  spaceEvenly: PropTypes.string,
}

FlexColumn.defaultProps = {
  color: "none",
  width: "auto",
  height: "auto",
  margin: "0px;",
  padding: "0px",
  spaceEvenly: "false"
}

export default FlexColumn;
