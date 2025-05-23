import mqtt from "mqtt";

/***
 * Browser
 * This document explains how to use MQTT over WebSocket with the ws and wss protocols.
 * EMQX's default port for ws connection is 8083 and for wss connection is 8084.
 * Note that you need to add a path after the connection address, such as /mqtt.
 */
const url = "wss://m3f1b41a.ala.us-east-1.emqxsl.com:8084/mqtt";
/***
 * Node.js
 * This document explains how to use MQTT over TCP with both mqtt and mqtts protocols.
 * EMQX's default port for mqtt connections is 1883, while for mqtts it is 8883.
 */
// const url = 'mqtt://broker.emqx.io:1883'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: "Flowmeter-Sani/Dashboard",
  username: "arr1",
  password: "arr1",
  rejectUnauthorized: false,
};
const client = mqtt.connect(url, options);
client.on("connect", function () {
  console.log("Connected");
});

// Receive messages
client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

export const publishMessage = (isStart) => {
  client.publish("Flowmeter-Sani/Flowmeter-1", isStart ? "START" : "STOP");
};
