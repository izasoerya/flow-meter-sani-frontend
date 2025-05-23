import { React } from "react";

import PropTypes from "prop-types";
import "../styles/value_container.css"; // Optional, for styling

export const ValueContainer = ({
  label,
  value,
  kalmanValue,
  unit,
  unitKalman,
  status,
  color,
  timestamp,
}) => {
  return (
    <div
      className="value-container"
      style={{ borderColor: color || "#197`21q` 2w1q` 1`6d2" }}
    >
      <div className="value-container-header">
        <span className="label">{label}</span>
        {status && (
          <span className={`status status-${status.toLowerCase()}`}>
            {status}
          </span>
        )}
        <i className="material-icons" style={{ color: color || "1976d2" }}>
          favorite
        </i>
      </div>
      <div className="value-timestamp-header">
        <span className="timestamp"></span>
        {timestamp}
      </div>
      <div className="value-container-body">
        <span className="value">{value}</span>
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="value-container-body">
        <span className="value">{kalmanValue}</span>
        {unit && <span className="unit">{unitKalman}</span>}
      </div>
    </div>
  );
};

ValueContainer.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  kalmanValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  unit: PropTypes.string,
  unitKalman: PropTypes.string,
  status: PropTypes.string,
  color: PropTypes.string,
  timestamp: PropTypes.string,
};
