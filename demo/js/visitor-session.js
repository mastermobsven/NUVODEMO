import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

const collection = "visitors";

/**
 * Read visitor session
 */
export async function getVisitorSession(visitorUUID) {
  const ref = doc(db, collection, visitorUUID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}

/**
 * Create visitor session only if doesn't exists
 */
export async function createVisitorSession(visitorUUID) {
  try {
    const ref = doc(db, collection, visitorUUID);

    await setDoc(ref, { demoCompleted: false }, { merge: false });

    console.log("Visitor session created successfully!");
    return true;
  } catch (err) {
    console.error("Failed to create visitor session", err);
    return false;
  }
}

/**
 * Store visitor feedback
 */
export async function storeVisitorFeedback(visitorUUID, feedback) {
  try {
    const ref = doc(db, collection, visitorUUID);

    await setDoc(
      ref,
      {
        demoCompleted: true,
        feedback: feedback,
      },
      { merge: true },
    );

    console.log("Visitor feedback stored successfully!");
    return true;
  } catch (err) {
    console.error("Failed to store visitor feedback", err);
    return false;
  }
}
