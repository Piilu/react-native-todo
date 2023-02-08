// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwTbJpKb7VWJJHCywvBukkaIae48xcBZQ",
  authDomain: "react-native-todo-5393f.firebaseapp.com",
  projectId: "react-native-todo-5393f",
  storageBucket: "react-native-todo-5393f.appspot.com",
  messagingSenderId: "439777107170",
  appId: "1:439777107170:web:8eee55c575014fceabd2bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;