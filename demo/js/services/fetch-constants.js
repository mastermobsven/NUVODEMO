import {
  collection, 
  getDocs,
  doc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../firebase.js";
import {CONSTANTS_MAP} from "../constants.js"

const CONSTANTS_COLLECTION = "constants"

export async function fetchConstants() {
  const ref = collection(db, CONSTANTS_COLLECTION);

  const snap = await getDocs(ref);

  let constants = {}

  for (const doc of snap.docs) {
    constants[doc.id] = doc.data().value
  }


  return constants;
}

export async function decreaseAvailablePortals() {
  const ref = doc(db, CONSTANTS_COLLECTION, CONSTANTS_MAP.AVAILABLE_PORTALS);

  await updateDoc(ref, {
    ["value"]: increment(-1),
  });
}
