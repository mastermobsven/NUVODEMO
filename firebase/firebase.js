import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBbNYn-9UrzXIqPrNk6ZLlgOJ1D8TWkYww",
authDomain: "project-test-11b4f.firebaseapp.com",
projectId: "project-test-11b4f",
storageBucket: "project-test-11b4f.firebasestorage.app",
messagingSenderId: "737462846320",
appId: "1:737462846320:web:a1952e1b86d077e2d3c5b5"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
