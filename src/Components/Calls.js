import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc
} from "firebase/firestore";


export const matchedCountry = async (country) => {
  try {
    const q = query(collection(db, "Locations"),where("name", "==", country));
    const count = await getDocs(q);

    if (!count.empty) {
      let ref = "";
      count.forEach((doc) => {
        ref = doc.ref;
      });
   localStorage.setItem("countryRef",ref.id)
    } else {
      return false;
    }
  } catch (e) {}
};





export const statusUpdate=async()=>{
  const dat=new Date()
 const date=`${dat.getDate()}-${dat.getMonth()}-${dat.getFullYear()}`
  
try{
const q=query(collection(db,"Appointment"),where("Date","<", date))
console.log("q",q)
const document=await getDocs(q)
if(!document.empty){
 document.docs.forEach(async(Val)=>{
  await updateDoc(doc(db,"Appointment",Val.id),{
    status:"Done"
  })
 })
}

}catch(e){

}
}