import { React } from "react";

import PropTypes from "prop-types";
import "../styles/value_container.css"; // Optional, for styling

export const ValueContainer = ({
  label,
  value,
  unit,
  status,
  color,
  timestamp,
}) => {
  return (
    <div
      className="value-container"
      style={{ borderColor: color || "#1976d2" }}
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
    </div>
  );
};

ValueContainer.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  status: PropTypes.string,
  color: PropTypes.string,
  timestamp: PropTypes.string,
};
