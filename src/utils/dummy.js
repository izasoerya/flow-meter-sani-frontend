import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase.js";

let counter = 0;
let docsCreated = [];

const generateRandomLog = () => ({
  logId: `log-${counter++}`, // Match ESP as string
  timestamp: new Date().toISOString(), // ISO format
  value: parseFloat((Math.random() * 100).toFixed(2)), // Use numeric type
  status: (() => {
    if (Math.random() < 0.5) return "Low";
    if (Math.random() < 0.8) return "Normal";
    return "High";
  })(),
});

const createDummyData = async (deviceId) => {
  const log = generateRandomLog();
  const docRef = await addDoc(
    collection(db, `flowmeter/${deviceId}/logs`),
    log
  );
  docsCreated.push(docRef.id);
  console.log(`Created log: ${docRef.id}`, log);
};

const deleteDummyData = async (deviceId) => {
  for (const docId of docsCreated) {
    const docRef = doc(db, "flowmeter", deviceId, "logs", docId); // ✅ Correct deletion path
    await deleteDoc(docRef);
    console.log(`Deleted log: ${docId}`);
  }
  docsCreated = [];
};

const loop = async () => {
  while (true) {
    console.log("▶ Creating dummy logs...");
    for (let i = 0; i < 5; i++) {
      await createDummyData("0000-0000-0000-0001");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    console.log("🗑 Deleting dummy logs...");
    await deleteDummyData("0000-0000-0000-0001");

    console.log("♻ Restarting cycle...\n");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};

loop();
