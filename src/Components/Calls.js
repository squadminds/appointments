import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// selected country for teatment------------------
export const matchedCountry = async (country) => {
  try {
    const q = query(collection(db, "countries"), where("name", "==", country));
    const count = await getDocs(q);

    if (!count.empty) {
      let ref = "";
      count.forEach((doc) => {
        ref = doc.ref;
      });
      const refernce = localStorage.getItem("reference");

      updateDoc(doc(db, "Appointment", refernce), {
        Location: doc(db, ref.path),
      });
      return true;
    } else {
      return false;
    }
  } catch (e) {}
};
export const selectedCountry = async (country) => {
  console.log("object", country);
  try {
    const countryRef = await addDoc(
      collection(db, "Appoitment", localStorage.getItem("refernce")),
      {
        Location: country,
      }
    );
  } catch (e) {
    console.log(e);
  }
};
export const setSpecalist = async (user) => {
  try {
    const ref = localStorage.getItem("reference");
    const DocumentRef = doc(db, "DoctorsList", user.id);
    const document = doc(db, "Appointment", ref);
    await updateDoc(document, { doctor: DocumentRef });
  } catch (e) {
    console.log("object", e);
  }
};
