// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2y9i9Fy_zOQlcmOVkgGEIjBt3YsXavVY",
  authDomain: "snaspbomb.firebaseapp.com",
  projectId: "snaspbomb",
  storageBucket: "snaspbomb.appspot.com",
  messagingSenderId: "730882776504",
  appId: "1:730882776504:web:6cd7fe8df1e9bc6a5f834d"
};

// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export {firebase , db};
