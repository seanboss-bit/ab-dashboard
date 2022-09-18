// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTgtc3iy-zUD0hr7sne9LsbEq9jBT2iYc",
  authDomain: "ab-homes.firebaseapp.com",
  projectId: "ab-homes",
  storageBucket: "ab-homes.appspot.com",
  messagingSenderId: "874444878071",
  appId: "1:874444878071:web:fff30c7e1a9d9b4974e3f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app