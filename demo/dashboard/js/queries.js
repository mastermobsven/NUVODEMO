import {
  doc,
  getDoc,
  collection, 
  getDocs,
  query, 
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../../js/firebase.js";

export async function getMetrics() {
  const ref = doc(db, "metrics", "totals");

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}

export async function getDashboardPassword() {
  const ref = doc(db, "secrets", "dashboard_password");

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}

export async function getFeedback() {
  const colRef = collection(db, "visitors");

  const q = query(colRef, where("feedback", "!=", null));

  const querySnapshot = await getDocs(q);

  const docs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return docs;
}