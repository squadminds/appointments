import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import {users} from "./Data"
import { db } from '../firebase/firebase';

function FirebaseCall() {
const  callMe=async()=>{
    try{
users.forEach(async(val) => {
    await addDoc(collection(db,"DoctorList"),{...val})
});
    }catch(e){

    }
}

  return (
    <div>
      <button onClick={()=>callMe()}>Click me</button>
    </div>
  )
}

export default FirebaseCall
