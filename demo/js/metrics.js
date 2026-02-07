import {
  doc,
  updateDoc,
  getDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

export async function logMetric(metricName) {
  const ref = doc(db, "metrics", "totals");

  await updateDoc(ref, {
    [metricName]: increment(1),
  });
}

