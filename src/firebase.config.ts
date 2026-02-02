// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_pxCBFy8Ur_VDuqeD5GnC2cG4d-OQ-8I",
  authDomain: "shop-a9985.firebaseapp.com",
  projectId: "shop-a9985",
  storageBucket: "shop-a9985.firebasestorage.app",
  messagingSenderId: "593017993332",
  appId: "1:593017993332:web:14831553668ff56153b921",
  measurementId: "G-Q24ZRW4N4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const data = getFirestore(app);
export const google = new GoogleAuthProvider()