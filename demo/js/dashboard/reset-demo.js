import {
  doc,
  setDoc,
  getDocs,
  collection,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../firebase.js";

export async function resetMetrics() {
  const ref = doc(db, "metrics", "totals");

  await setDoc(ref, METRICS_MODEL.totals, { merge: true });
}

export async function resetConstants() {
  const entries = Object.entries(CONSTANTS_MODEL);

  for (const [key, data] of entries) {
    const ref = doc(db, "constants", key);

    await setDoc(ref, {
      description: data.description,
      value: data.value
    }, { merge: true });
  }
}

export async function resetVisitors() {
  const snapshot = await getDocs(collection(db, "visitors"));

  if (snapshot.empty) {
    return;
  }

  const batch = writeBatch(db);

  snapshot.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });

  await batch.commit();

}


export async function resetDemo(){
    try{
        await resetMetrics()
        console.log("Metrics reset done.")
        await resetConstants()
        console.log("Constants reset done.")
        await resetVisitors()
        console.log("Visitors reset done.")
        console.log("Demo reset done!")
        window.location.reload()
    }catch(e){
        console.log("Error reseting demo:", e)
    }
}

// models
export const CONSTANTS_MODEL = {
  AVAILABLE_PORTALS: {
    description:
      "Number of portals available for the demo. Each user that takes a portal, decrease this number.",
    value: 5,
  },

  COOLDOWN_SEC_RATES: {
    description: "Cooldown in seconds for each attempt",
    value: [30, 30, 30, 30, 30, 30, 30, 30],
  },

  MAX_ATTEMPTS: {
    description: "Maximum number of attempts allowed per visitor",
    value: 8,
  },

  SUCCESS_PROBABILITY_RATES: {
    description: "Success probability rates per attempt",
    value: [0.3, 0.25, 0.2, 0.15, 0.1, 0.1, 0.8, 0.85],
  },

  QUESTION_PAGE_DURATION_SEC: {
    description: "Duration of questions page",
    value: 3600,
  },

  MAX_QUESTIONS_PER_SESSION: {
    value: 7,
    description: "Maximun number of questions an user can make per session."
  }
}

export const METRICS_MODEL = {
  totals: {
    failures: 0,
    phraseSubmissions: 0,
    phrasesGenerated: 0,
    questionsAsked: 0,
    successes: 0,
    transferClaims: 0,
    visitors: 0,
  },
}

