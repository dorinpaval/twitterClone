// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-592ec.firebaseapp.com",
  projectId: "twitter-clone-592ec",
  storageBucket: "twitter-clone-592ec.appspot.com",
  messagingSenderId: "908427139389",
  appId: "1:908427139389:web:84a14cefc2b3c52de6cd54"
};

pages:{
    signin:"/auth/sign-in"
}


// Initialize Firebase
//const app= !getApp().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
export {app, db, storage};