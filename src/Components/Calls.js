import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
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

