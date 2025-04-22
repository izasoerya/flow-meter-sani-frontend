// src/models/Payload.js

export default class Payload {
  constructor({ id, index, deviceName, value, timeStamp, status }) {
    this.id = id;
    this.index = index;
    this.deviceName = deviceName;
    this.value = value;
    this.timeStamp = timeStamp;
    this.status = status;
  }

  // Optional: add helpers
  getFormattedTimestamp() {
    return this.timeStamp?.seconds
      ? new Date(this.timeStamp.seconds * 1000).toLocaleString()
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
