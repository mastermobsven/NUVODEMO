// firebase.js
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjYIl5wfELGWZDv4k0xpUiwMnAnvznReU",
  authDomain: "nuvo-demo-backend.firebaseapp.com",
  projectId: "nuvo-demo-backend",
  storageBucket: "nuvo-demo-backend.firebasestorage.app",
  messagingSenderId: "1063326113087",
  appId: "1:1063326113087:web:88777b6310c2744556c78a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
