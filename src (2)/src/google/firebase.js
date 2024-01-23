// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGSqo7wq5eq_h10xAVxy63iy-7anTdzOo",
  authDomain: "rmuticpe2023-101.firebaseapp.com",
  databaseURL: "https://rmuticpe2023-101-default-rtdb.firebaseio.com",
  projectId: "rmuticpe2023-101",
  storageBucket: "rmuticpe2023-101.appspot.com",
  messagingSenderId: "473103806530",
  appId: "1:473103806530:web:f2df93adf5f8167ed07ddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
