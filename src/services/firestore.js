import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  limit,
} from "firebase/firestore";

import { app } from "./firebase.js"; // your initialized Firebase app
import Payload from "../models/payload.js";

const db = getFirestore(app);

const getListDeviceRef = () => collection(db, "flowmeter");
const getDeviceLogsRef = (deviceId) =>
  collection(db, `flowmeter/${deviceId}/logs`);
const getDeviceDocRef = (deviceId) => doc(db, `flowmeter/${deviceId}`);

// 📥 Add a new log
export const subscribeToLogs = async (callback, deviceId) => {
  const deviceRef = getDeviceDocRef(deviceId);
  const deviceSnap = await getDoc(deviceRef);
  const deviceName = deviceSnap.data().deviceName || deviceId; // Use name or fallback to id

  if (!deviceSnap.exists()) {
    console.error(`Device ${deviceId} not found`);
    return () => {}; // Return no-op unsubscribe to avoid crashing
  }

  const q = query(
    getDeviceLogsRef(deviceId),
    orderBy("logId", "desc"),
    limit(100)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const logs = snapshot.docs.map(
      (doc) =>
        new Payload({ id: doc.id, deviceName: deviceName, ...doc.data() })
    );
    callback(logs);
  });

  return unsubscribe;
};

// 📥 Get all logs (non-realtime)
export const getLogs = async (deviceId) => {
  try {
    const q = query(getDeviceLogsRef(deviceId), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => new Payload({ id: doc.id, ...doc.data() })
    );
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

// 🔍 Get all collections (device list)
export const getDeviceList = async () => {
  try {
    const snapshot = await getDocs(getListDeviceRef());
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching device list:", error);
    throw error;
  }
};

// 📝 Create or update device metadata
export const setDevice = async (deviceId, data) => {
  const ref = getDeviceDocRef(deviceId);
  await setDoc(ref, data, { merge: true });
};

// 🗑️ Delete a specific log
export const deleteLog = async (deviceId, logId) => {
  const logRef = doc(db, `flowmeters/${deviceId}/logs/${logId}`);
  await deleteDoc(logRef);
};
