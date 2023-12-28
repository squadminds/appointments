import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


  const firebaseConfig = {
    apiKey: "AIzaSyAv9OEUcqIrLyZDxzJeyS7FqfkRp9R_nnE",
    authDomain: "appointment-432d4.firebaseapp.com",
    projectId: "appointment-432d4",
    storageBucket: "appointment-432d4.appspot.com",
    messagingSenderId: "601742561917",
    appId: "1:601742561917:web:68ba4783a8c7eb07f71714",
    measurementId: "G-D26CWKK7MB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  
