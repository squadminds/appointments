
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


  const firebaseConfig = {
    apiKey:process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE,
    appId: Process.env.FIREBASE_APP_ID,
    measurementId:process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



