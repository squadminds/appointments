
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB2mrTMaAUGTapUK_uxfn9GY8Pobk8soaE",
  authDomain: "health-app-f44f3.firebaseapp.com",
  projectId: "health-app-f44f3",
  storageBucket: "health-app-f44f3.appspot.com",
  messagingSenderId: "919496557348",
  appId: "1:919496557348:web:67160ea325ce8b22cc29b1",
  measurementId: "G-P9H08T7YK6"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



