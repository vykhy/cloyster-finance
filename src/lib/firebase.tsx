// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu61t0Hpy-goSycwGVDUf-m-W5K8HDWow",
  authDomain: "cloyster-finance.firebaseapp.com",
  projectId: "cloyster-finance",
  storageBucket: "cloyster-finance.appspot.com",
  messagingSenderId: "540712685511",
  appId: "1:540712685511:web:723014b980820363dc13e2",
  measurementId: "G-L1S0VE7SB2"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore()

export default firebase
export { analytics, db }