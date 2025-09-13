// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4uPj8zmk3z97IxCplEvXKtkfdAXaKJpI",
  authDomain: "testmydoc-86c5f.firebaseapp.com",
  projectId: "testmydoc-86c5f",
  storageBucket: "testmydoc-86c5f.firebasestorage.app",
  messagingSenderId: "929877160424",
  appId: "1:929877160424:web:4fe16c75114acaf0c2b45d",
  measurementId: "G-1TML3N0PZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);