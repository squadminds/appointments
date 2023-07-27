import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useRef, useEffect, useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import {modalShow} from "../redux/HealthSlice";
import { collection,addDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {  useDispatch } from "react-redux";
import ToggleModal from "./Modal";

const Information = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [condition, setCondition] = useState(1);
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{1,3}?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const letters = /^[A-Za-z]/
  const greetUser = async () => {
    if (condition === 1) {
      if (letters.test(details.name)) {
        setError("");
        setCondition(2);
        dispatch(modalShow(""));
      } else if (details.name === "") {
        setError("Name Is Required");
        dispatch(modalShow("Name Is Required"));
      }else if(letters.test(details.name)===false){
        setError("Name Should Contains Only Alphabets");
        dispatch(modalShow("Name Should contains Alphabets"));
      }
    } else if (condition === 2) {
      if (emailRegex.test(details.email) === false) {
        dispatch(modalShow("Invalid Email Address"));
        setError("Invalid Email Address");
      } else if (details.email === "") {
        dispatch(modalShow(" Email is Required"));
        setError("Email Is Required");
      } else if (emailRegex.test(details.email) === true) {
        dispatch(modalShow(""));
        setCondition(3);
      }
    } else if (condition === 3) {
      if (phoneRegex.test(details.phone) === false) {
        dispatch(modalShow("Phone number must be 10 digits with country code"));
        setError("Phone number must be 10 digits with country code");
      } else if (details.phone === "") {
        dispatch(modalShow("Phone Number Is Required"));
        setError("Phone Number Is Required");
      } else if (phoneRegex.test(details.phone) === true) {
        try {
          const user = await addDoc(collection(db, "users"), {
            Patient_Name: details.name,
            Patient_Mail: details.email,
            Patient_Phone: details.phone,
          });
          if (user) {
          localStorage.setItem("user",user.id)
          }
        } catch (e) {
          console.log("object");
        }
        dispatch(modalShow(""));
        setError("");

        navigate("/Submit");
      }
    }
  };

  function Back() {
    if (condition === 3) {
      setCondition(2);
    } else if (condition === 2) {
      setCondition(1);
    } else if (condition === 1) {
      navigate("/slot");
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setDetails({ ...details, name: e.target.value });
      setError("");
    } else if (e.target.name === "email") {
      setDetails({ ...details, email: e.target.value });
      setError("");
    } else if (e.target.name === "phone") {
      setDetails({ ...details, phone: e.target.value });
      setError("");
    }
  };
  //autofocus

  const Input = useRef(null);

  useEffect(() => {
    if (Input.current) {
      Input.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   setDetails({ ...details, name: Name, phone: Phone, email: Email });
  // }, []);
  return (
    <>
      <MDBContainer fluid className="backall ">
        <ToggleModal />
        <MDBRow>
          <MDBContainer className="mt-5 ">
            <MDBRow>
              <h3 className="mt-5 text-dark d-flex justify-content-center">
                The Assessment of our partner doctors relies on complete
                accuracy
                <br /> and honesty in your answers to the Questions below.
              </h3>

              <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                <h2>
                  {" "}
                  {condition === 1
                    ? "Great, can we get your full name?"
                    : condition === 2
                    ? `Welcome  ${details.name} Please Provide Your Email`
                    : "Your question here. Recall information with @"}
                </h2>
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center ">
              <MDBCol
                size="md-6"
                className="mt-3 text-dark justify-content-around"
              >
                {condition === 1 && (
                  <MDBInput
                    className="w-100 "
                    label="fill your name"
                    ref={Input}
                    value={details.name}
                    name={"name"}
                    onChange={(e) => handleChange(e)}
                  />
                )}
                {condition === 2 && (
                  <>
                    <MDBInput
                      className="w-100 "
                      label="fill your Email"
                      ref={Input}
                      value={details.email}
                      name={"email"}
                      onChange={(e) => handleChange(e)}
                    />
                  </>
                )}
                {condition === 3 && (
                  <MDBInput
                    className="w-100 "
                    label="fill your contact"
                    ref={Input}
                    value={details.phone}
                    name={"phone"}
                    onChange={(e) => handleChange(e)}
                  />
                )}

                <span style={{ color: "red" }}>{error}</span>
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size={6}>
                <div
                  className={
                    "form__item button__items d-flex justify-content-between"
                  }
                >
                  <MDBBtn
                    type={"default"}
                    className="buttheme me-2 mt-3"
                    onClick={Back}
                  >
                    Back
                  </MDBBtn>
                  <MDBBtn
                    type={"primary"}
                    className="buttheme mt-3"
                    onClick={() => greetUser()}
                  >
                    Next
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Information;
