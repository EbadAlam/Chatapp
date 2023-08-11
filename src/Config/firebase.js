import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUN8BdBIok4fB07DVsbwuDOze-nRkwU7Y",
  authDomain: "chatapp-cde3f.firebaseapp.com",
  projectId: "chatapp-cde3f",
  storageBucket: "chatapp-cde3f.appspot.com",
  messagingSenderId: "344758896320",
  appId: "1:344758896320:web:68a15fba7dbc60590b0f25",
  measurementId: "G-QGJ78FC0E9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
