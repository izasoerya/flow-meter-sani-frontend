import "../styles/interactive_button.css"; // Optional, for styling

export const InteractiveButton = ({ isStart, onClick }) => {
  return (
    <button
      className={`interactive-button ${isStart ? "start" : "stop"}`}
      onClick={onClick}
    >
      {isStart ? "Start" : "Stop"}
    </button>
  );
};
