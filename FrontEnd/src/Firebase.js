// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realstatex-f7299.firebaseapp.com",
  projectId: "realstatex-f7299",
  storageBucket: "realstatex-f7299.firebasestorage.app",
  messagingSenderId: "872203195592",
  appId: "1:872203195592:web:4a2cb4a090ecbb135581fd",
  measurementId: "G-LYYXGKVPPW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
