// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwn5257QrJQhNH5Z9fuf-QUDMpGmMfED0",
  authDomain: "vou-backend-22019.firebaseapp.com",
  projectId: "vou-backend-22019",
  storageBucket: "vou-backend-22019.appspot.com",
  messagingSenderId: "562175407861",
  appId: "1:562175407861:web:734d0b03b743661cf437bc",
  measurementId: "G-FQ2Q39MLWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
