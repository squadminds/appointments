
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


  const firebaseConfig = {
    apiKey: "AIzaSyBFsQ1rEw7k3yvtAejODOgkzFlZiAOk3bM",
    authDomain: "healthcare-349da.firebaseapp.com",
    projectId: "healthcare-349da",
    storageBucket: "healthcare-349da.appspot.com",
    messagingSenderId: "730513019025",
    appId: "1:730513019025:web:0a938a3e4f27639c37af30",
    measurementId: "G-LGFTRFVCJ7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



