import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { BsPrinterFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function FormView() {
  const [show, setShow] = useState();
  const [doctor, setDoctor] = useState();
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const handlePrint = (e) => {
    window.print();
  };
  const fetchAppointmentLetter = async () => {
    const ref = localStorage.getItem("reference");
    try {
      let details = await getDoc(doc(db, "Appointment", ref));
      if (details.exists) {
        const data = details.data();
        Object.keys(data).map(async (element) => {
          if (data[element].path) {
            const result = await getDoc(doc(db, data[element].path));
            if (result.exists) {
              if (result.data().firstName) {
                setDoctor(result.data().firstName);
              }
            }
          } else if (element === "date") {
            setDate(data[element]);
          } else if (element === "day") {
            setDay(data[element]);
          }
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchAppointmentLetter();
  }, []);

  useEffect(() => {
    const handleBeforePrint = () => {
      setShow(false);
    };
    const handleAfterPrint = () => {
      setShow(true);
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
  }, []);
  return (
    <>
      <MDBContainer fluid className="backall">
        <>
          <MDBRow>
            <h1
              className="mt-5  d-flex justify-content-center"
              style={{ color: "brown" }}
            >
              Appointment Confirmation Status
            </h1>
            <h3>Patient Name:{}</h3>
            <h3 className="mt-5 text-dark d-flex justify-content-center">
              Your Appointment Has Been Fixed with &nbsp;
              <span style={{ color: "Red" }}>{doctor} </span> &nbsp; on &nbsp;{" "}
              <span style={{ color: "Red" }}>
                {" "}
                <span style={{ color: "black" }}>Date:</span>
                {date}{" "}
              </span>
              &nbsp; at &nbsp;{" "}
              <span style={{ color: "Red" }}>
                {" "}
                <span style={{ color: "black" }}>Time:</span>
                {day}{" "}
              </span>
            </h3>
            <h3 className="mt-5 text-dark d-flex justify-content-center">
              Your Appointment ID is &nbsp;{" "}
              <span style={{ color: "red" }}>
                {localStorage.getItem("reference")}
              </span>
            </h3>
          </MDBRow>
        </>
        <MDBRow className="d-flex justify-content-center print-button">
          <MDBCol size={6}>
            <div
              className={
                "form__item button__items d-flex justify-content-center"
              }
            >
              <MDBBtn
                type={"primary"}
                className="printButton buttheme mt-3"
                onClick={(e) => handlePrint(e)}
              >
                <BsPrinterFill color="white" size="30" /> print Recipt
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default FormView;
