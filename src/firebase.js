import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBXirOYEw05u1x-1NrU35kgT8f9rtdetl4",
    authDomain: "users-react-firebase.firebaseapp.com",
    projectId: "users-react-firebase",
    storageBucket: "users-react-firebase.appspot.com",
    messagingSenderId: "877460125796",
    appId: "1:877460125796:web:25b3788b70aea480fcc771"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
