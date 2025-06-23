import React, { useState, useEffect } from "react";
import { subscribeToLogs, getDeviceList, getLogs } from "../services/firestore";
import { publishMessage } from "../services/mqtt";
import { ValueContainer } from "../components/value_container";
import { Dropdown } from "../components/dropdown";
import { InteractiveButton } from "../components/interactive_button";

import "../styles/value_container.css"; // Optional, for styling

const Dashboard = () => {
  const [listDevice, setListDevice] = useState([]); // State to store the device list
  const [deviceId, setDeviceId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isStart, setIsStart] = useState(true);
  const [realtimeMode, setRealtimeMode] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDeviceList();
        setListDevice(devices);
      } catch (error) {
        console.error("Error fetching device list:", error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    if (!deviceId) return;
    let unsubscribe = () => {};
    (async () => {
      unsubscribe = await subscribeToLogs((logs) => {
        setLogs(logs);
      }, deviceId);
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [deviceId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "30%",
        color: "#1976d2",
      }}
    >
      <div className="dropdown-container">
        <h2>Add Your Devices</h2>
        <Dropdown
          listDevice={listDevice.map((device) => ({
            id: device.id,
            name: device.name || device.id,
          }))}
          onSelect={(deviceId) => {
            console.log("Selected device ID:", deviceId);
            setDeviceId(deviceId);
          }}
        />
        <InteractiveButton
          isStart={isStart}
          onClick={() => {
            setIsStart((prev) => !prev);
            publishMessage(isStart);
          }}
        />
        <label style={{ marginTop: "20px", display: "block" }}>
          <input
            type="checkbox"
            checked={realtimeMode}
            onChange={(e) => setRealtimeMode(e.target.checked)}
          />{" "}
          Realtime mode
        </label>
      </div>

      <div className="value-container-wrapper">
        {logs.length === 0 && <p>No logs found.</p>}
        {!realtimeMode &&
          logs.map((log) => (
            <ValueContainer
              key={log.index}
              label={`Data no. ${log.logId}`}
              value={log.value}
              kalmanValue={log.kalmanValue}
              unit=" (Raw Value)  mL"
              unitKalman="(Kalman Value)  mL"
              status=""
              color={
                log.status === "High"
                  ? "#FF9800"
                  : log.status === "Low"
                  ? "#F44336"
                  : "#4CAF50"
              }
              timestamp={log.deviceName}
            />
          ))}
        {realtimeMode && logs.length > 0 && (
          <ValueContainer
            key={logs[0].index}
            label={`Data no. ${logs[0].logId}`}
            value={logs[0].value}
            kalmanValue={logs[0].kalmanValue}
            unit=" (Raw Value)  mL"
            unitKalman="(Kalman Value)  mL"
            status=""
            color={
              logs[0].status === "High"
                ? "#FF9800"
                : logs[0].status === "Low"
                ? "#F44336"
                : "#4CAF50"
            }
            timestamp={logs[0].deviceName}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
