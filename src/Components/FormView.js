import React, { useEffect, useState, useRef } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { BsPrinterFill } from "react-icons/bs";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  Container,
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
} from "@mui/material";
function FormView() {
  const [doctor, setDoctor] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState({
    dialCode: "",
    number: "",
  });
  const [patientProblem, setPatientProblem] = useState("");
  const mainDiv = useRef(null);

  const handlePrint = (e) => {
    window.print();
  };

  const fetchAppointmentLetter = async () => {
    const ref = localStorage.getItem("reference");

    try {
      let details = await getDoc(doc(db, "Appointment", ref));
      if (details.exists) {
        const data = details.data();
        const diseaseRef = data.Disease;
        if (diseaseRef) {
          const diseaseDetails = await getDoc(diseaseRef);
          if (diseaseDetails.exists) {
            setPatientProblem(diseaseDetails.data().name);
          }
        }
        Object.keys(data).map(async (element) => {
          if (data[element].path) {
            const result = await getDoc(doc(db, data[element].path));
            if (result.exists) {
              if (result.data()?.firstName) {
                setDoctor(result.data()?.firstName);
              } else if (result.data()?.Patient_Name) {
                setUser(result.data()?.Patient_Name);
                setPatientEmail(result.data()?.Patient_Mail || "");
                setPatientPhone({
                  dialCode: result.data()?.Patient_Phone?.dialCode || "",
                  number: result.data()?.Patient_Phone?.number || "",
                });
              }
            }
          } else if (element === "Date") {
            setDate(data[element]);
          } else if (element === "Time") {
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
    mainDiv.current.focus();
  }, []);

  return (
    <Container
      fluid
      maxWidth
      className="backall p-0"
      ref={mainDiv}
      tabIndex={1}
      onKeyDown={(e) => (e.key === "Enter" ? handlePrint(e) : "")}
    >
      <Container>
      <Grid container>
          <Grid item xs={12} className="mt-5 d-flex justify-content-center">
            <h1 style={{ color: "brown" }}> Appointment Confirmation letter</h1>
          </Grid>
        </Grid>
        <Grid
          container
          className="mt-5 d-flex justify-content-center"
          spacing={2}
        >
          <Grid item xs={6}>
            <div className="text-grey-m2">
              <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                <p className="info-heading">
                  <strong>Appointment Details</strong>
                </p>
                <p>
                  <strong>Hospital Name:</strong> Care Hospitals
                </p>
                <p>
                  <strong>Doctor:</strong> {doctor}
                </p>
                <p>
                  <strong>Date:</strong> {date}
                </p>
                <p>
                  <strong>Time:</strong> {day}
                </p>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            className="text-95 align-self-start d-sm-flex justify-content-end"
          >
            <div className="text-grey-m2">
              <div className="my-1">
                {" "}
                <p className="info-heading">
                  <strong>Patient Information</strong>
                </p>
              </div>
              <div className="my-1">
                {" "}
                <p>
                  <strong>Patient ID:</strong>{" "}
                  {localStorage.getItem("reference")}
                </p>
              </div>
              <div className="my-1">
                {" "}
                <p>
                  <strong>Patient Name:</strong> {user}
                </p>
              </div>
              <div className="my-1">
                {" "}
                <p>
                  <strong>Patient Problem:</strong> {patientProblem}
                </p>
              </div>
              <div className="my-1">
                {" "}
                <p>
                  <strong>Email:</strong> {patientEmail}
                </p>
              </div>
              <div className="my-1">
                <p>
                  <strong>Phone:</strong>{" "}
                  {`+${patientPhone.dialCode} ${patientPhone.number}`}
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        <TableContainer style={{ border: "2px solid rgb(196, 70, 101)" }} stickyHeader>
        <Table >
          <TableHead style={{ borderBottom: "2px solid rgb(196, 70, 101)" }}>
          <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Problem</TableCell>
              <TableCell>Treatment</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody >
            <TableRow>
              <TableCell  style={{ height: "300px" }}>
                1
              </TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        <Grid container className="d-flex justify-content-center mt-5">
          <Grid item xs={6}>
            <div
              className={
                "form__item button__items d-flex justify-content-center"
              }
            >
              <Button
                type={"primary"}
                className="printButton buttheme mt-3 text-light"
                onClick={(e) => handlePrint(e)}
              >
                <BsPrinterFill color="white" size="30" /> Print Receipt
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default FormView;
