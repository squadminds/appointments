import React, { useEffect, useState } from "react";
import {

  MDBContainer,
  MDBInput,

  MDBBtn,
} from "mdb-react-ui-kit";
import { db } from "../firebase/firebase";
import {

  doc,
  getDoc,
} from "firebase/firestore";

function CheckAppointment() {
  const [id, setId] = useState();
  const handleSubmit = async () => {
    const q = await getDoc(doc(db, "Appointment", id));
    if (q.exists) {
      q.forEach((element) => {
        console.log("object", element.data());
      });
    }
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  return (
    <MDBContainer className="backall">
      <MDBInput name={id} onChange={(e) => handleChange(e)}></MDBInput>
      <MDBBtn onClick={handleSubmit}>hello</MDBBtn>
    </MDBContainer>
  );
}

export default CheckAppointment;
