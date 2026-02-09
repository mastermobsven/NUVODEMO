import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
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
