import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { createUserWithEmailAndPassword,fetchSignInMethodsForEmail,onAuthStateChanged,signInWithPopup } from 'firebase/auth';
import { getDatabase, ref as dbRef, set,get,serverTimestamp,push,orderByChild, equalTo } from 'firebase/database';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
// Set up the functions service and connect to the emulator
const functions = getFunctions(app);
connectFunctionsEmulator(functions, '127.0.0.1', 5001);
export { db,push,orderByChild, equalTo,signInWithPopup,serverTimestamp ,createUserWithEmailAndPassword, fetchSignInMethodsForEmail,onAuthStateChanged , dbRef, set,get, app, functions ,analytics};