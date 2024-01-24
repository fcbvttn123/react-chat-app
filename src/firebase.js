// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9CwqtUfeYMGjHM_OD9WE8fgoI4PgAi4I",
  authDomain: "react-chat-app-3fcb6.firebaseapp.com",
  projectId: "react-chat-app-3fcb6",
  storageBucket: "react-chat-app-3fcb6.appspot.com",
  messagingSenderId: "605490514847",
  appId: "1:605490514847:web:4a2e06ff75dac090a14baa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const roomsFireStoreCollection = collection(db, "rooms")




// Realtime Database

import {getDatabase, ref, set, onValue} from "firebase/database"
export const realtimeDb = getDatabase()

// DB Rule

  // {
  //   "rules": {
  //     ".read": "now < 1705208400000",  // 2024-1-14
  //     ".write": "now < 1705208400000",  // 2024-1-14
  //   }
  // }




// Authentication 

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();