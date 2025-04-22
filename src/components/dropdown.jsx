import { useState, useRef, useEffect } from "react";
import "../styles/dropdown.css";

export const Dropdown = ({ listDevice, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (device) => {
    setSelected(device);
    setIsOpen(false);
    onSelect(device.id);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? selected.name : "Select Device"}
      </button>

      {isOpen && (
        <ul className="dropdown-menu-list">
          {listDevice.map((device) => (
            <li key={device.id}>
              <button
                className={`dropdown-item-btn ${
                  selected?.id === device.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(device)}
              >
                {device.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
