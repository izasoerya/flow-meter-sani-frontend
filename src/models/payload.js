// src/models/Payload.js

export default class Payload {
  constructor({ id, deviceName, logId, value, timestamp }) {
    this.id = id;
    this.deviceName = deviceName;
    this.logId = logId;
    this.deviceName = deviceName;
    this.value = value;
    this.timestamp = timestamp;
  }

  getFormattedtimeStamp() {
    return this.timestamp?.seconds
      ? new Date(this.timestamp.seconds * 1000).toLocaleString()
      : "N/A";
  }

  getStatusColor() {
    switch (this.status) {
      case "High":
        return "#FF9800";
      case "Low":
        return "#F44336";
      default:
        return "#4CAF50";
    }
  }
}
