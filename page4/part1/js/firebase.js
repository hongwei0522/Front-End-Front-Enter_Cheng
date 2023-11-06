// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP61IAIXzME84SyIRj-5JIjuC9q7ybxWE",
  authDomain: "front-enter-56677.firebaseapp.com",
  projectId: "front-enter-56677",
  storageBucket: "front-enter-56677.appspot.com",
  messagingSenderId: "923414467122",
  appId: "1:923414467122:web:1cb3cf220e58987cd7622b",
  measurementId: "G-GJ2WHZZEEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);