import React from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { addDoc, doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function SubmitPage() {
  const timestamp = new Date();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const ref = await addDoc(collection(db, "Appointment"), {
        status: "Pending",
        AppointmentBookingDate: timestamp,
        Date: localStorage.getItem("date"),
        Time: localStorage.getItem("time"),
      });
      if (ref) {
        updateDoc(doc(db, "Appointment", ref.id), {
          Doctor: doc(db, "DoctorList", localStorage.getItem("Doctor")),
          Location: doc(db, "Locations", localStorage.getItem("countryRef")),
          Disease: doc(db, "DiseaseList", localStorage.getItem("DiseaseRef")),
          User: doc(db, "users", localStorage.getItem("user")),
        });

        localStorage.clear();
        localStorage.setItem("reference", ref.id);
        navigate("/msg");
      }
    } catch (e) {
      console.log("object", e);
    }
  };
  const handleBack = () => {
    if (localStorage.getItem("date")) {
      navigate("/info");
    } else {
      console.log("page already submitted");
    }
  };
  return (
    <MDBContainer fluid className="backall justify-content-center border">
      <MDBRow>
        <h3 className="mt-5 text-dark d-flex justify-content-center">
          Proceed With Appointment
        </h3>
      </MDBRow>
      <MDBRow className="d-flex mt-5  py-5 justify-content-center">
        <MDBCol size={6}>
          <div
            className={
              "form__item button__items d-flex justify-content-between"
            }
          >
            <MDBBtn
              onClick={() => {
                handleBack();
              }}
            >
              Edit Details
            </MDBBtn>
            <MDBBtn
              onClick={() => {
                handleSubmit();
              }}
            >
              Proceed
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SubmitPage;
