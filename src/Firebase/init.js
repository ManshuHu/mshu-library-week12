import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd53zK1BDhL-uu3RlkiKpw-0JtNTSeBRQ",
    authDomain: "week7-manshu.firebaseapp.com",
    projectId: "week7-manshu",
    storageBucket: "week7-manshu.appspot.com",
    messagingSenderId: "654959108130",
    appId: "1:654959108130:web:56240fa063e7fdefe72a7b"
  };
   // Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db
