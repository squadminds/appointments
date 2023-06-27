import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,

} from "firebase/firestore";
var location = "";
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
const hr = currentDate.getHours();
const minute = currentDate.getMinutes();
const slat=doc(db,"healthcare","appointment")
console.log("this is it",slat)
// schedule appointment -------------------
export const ScheduleAppointment = async (date) => {
   try {
   const schedule= await setDoc(doc(db, "healthcare","appointment"), {
      appointment: date,

    });
    
  } catch (e) {
    console.log("object",e);
  }
};
// selected country for teatment------------------
export const matchedCountry = async (country) => {
  try {
    const documentRef = doc(db, "countrylist","7vESrZclpTOJIJWsJAQj");
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data().country;
      const isPresent = documentData.find((doc) => doc.name === country);

      if (isPresent) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {}
};
export const selectedCountry = async (country) => {
  try {
    await updateDoc(doc(db, "healthcare", "appointment"), {
      country: country,
    });
  } catch (e) {
    console.log(e);
  }
};
//selected disease----------------------------------------
export const SelectedDisease = async (e) => {
  try {
    await updateDoc(doc(db, "healthcare", "appointment"), {
      Disease: e,
    });
  } catch (e) {}
};
export const getDisease = async () => {
  try {
    const querySnapshot = await getDoc(doc(db, "healthcare", "appointment"));
    if (querySnapshot.exists) {
      return querySnapshot.data().Disease;
    }
  } catch (e) {
    console.log("object", e);
  }
};
//selected doctors------------------------------------------------

export const selectedSpecalist = async (user) => {
 const id=await  defaultTimeSlot();
 const val=await setSpecalist(user,id)
return id;

};

const defaultTimeSlot = async () => {
  var dates = [];
  for (var i = 0; i < 10; i++) {
    var date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000); // Add i days to the current date
    dates.push({ slot: date.toLocaleString().split(",")[0], timeSlot: "" });
  }
  const todayDate = new Date();
  let slots = [
    "09:00AM-10:00 AM",
    "10:00AM-11:00 AM",
    "11:00AM-12:00 PM",
    "12:00PM-13:00 PM",
    "14:00PM-15:00 PM",
    "15:00PM-16:00 PM",
    "16:00PM-17:00 PM",
    "17:00PM-18:00 PM",
  ];
  let currentSlot = [];
  const dateSlot = dates.map((val, ind) => {
    if (val.slot === todayDate.toLocaleString().split(",")[0]) {
      for (
        let i = todayDate.toLocaleString().split(",")[1].split(":")[0];
        i < 18;
        i++
      ) {
        currentSlot.push(`${i}:00-${Number(i) + 1}:00`);
      }
      console.log("sss", currentSlot);
      return Object.assign({}, val, {
        slot: val.slot,
        timeSlot: currentSlot,
      });
    } else {
      return Object.assign({}, val, {
        slot: val.slot,
        timeSlot: slots,
      });
    }
  });

  try {
  const slotRef= await addDoc(collection(db, "healthcare"), {
      slot: dateSlot,
    })
return slotRef.id

  } catch (e) {
    console.log("this is that", e);
  }
};
export const timeSlot=async (id)=>{

  try{
const slotRef=await getDoc(doc(db,"healthcare",id))
if(slotRef.exists){
var dateSlots=slotRef.data().slot;

}
return dateSlots
  }catch(e){
    console.log("object")
  }
}

const setSpecalist = async (user,id) => {

try {
await updateDoc(doc(db, "healthcare", "appointment"), {
      Doctor: user.firstName,
      specalist: user.specilist,
      id: user.id,
      img: user.img,
      qualification: user.qualification,
      helpline_number: user.helpline_number
 });
 const DocumentRef=doc(db,"healthcare", id);
 const document=doc(db,"healthcare","appointment")
await updateDoc(document, { ref:DocumentRef})

  } catch (e) {
    console.log("object", e);
  }

};
//get apis


export const getSpecalist = async () => {
  try {
    const querySnapshot = await getDoc(doc(db, "healthcare", "appointment"));
    if (querySnapshot.exists) {
      return querySnapshot.data().Doctor;
    }
  } catch (e) {
    console.log(e);
  }
};

const selectedDate=async()=>{
  try{
await setDoc(doc(db,"healthcare","appoinment"))
  }catch(e){
    console.log("object",e)
  }

}