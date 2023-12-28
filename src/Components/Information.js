import React, { useRef, useEffect, useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ToggleModal from "./Modal";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Button, Container, Grid, TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledCol = styled(Grid)(({ theme }) => ({
  padding: 0,
  display: "flex",
  flexDirection: "column",
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
});
const Information = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: { dialCode: "", number: "" },
  });
  const [error, setError] = useState("");
  const [condition, setCondition] = useState(1);
  const timestamp = new Date();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d+$/;

  const nameRegex = /^[A-Za-z\s]+$/;
  const greetUser = async () => {
    let userRef;

    if (condition === 1) {
      if (nameRegex.test(details.name)) {
        setError("");
        setCondition(2);
      } else if (details.name === "") {
        setError("Name Is Required");
      } else if (nameRegex.test(details.name) === false) {
        setError("Name Should Contains Only Alphabets");
      }
    } else if (condition === 2) {
      if (emailRegex.test(details.email) === false) {
        setError("Email Is Required");
      } else if (details.email === "") {
        setError("Invalid Email Address");
      } else if (emailRegex.test(details.email) === true) {
        setCondition(3);
      }
    } else if (condition === 3) {
      if (phoneRegex.test(details.phone.number) === false) {
        setError("Phone Number Is Required");
      } else if (details.phone === "") {
        setError("Invalid Phone Number");
      } else if (phoneRegex.test(details.phone.number) === true) {
        try {
          userRef = await addDoc(collection(db, "users"), {
            Patient_Name: details.name,
            Patient_Mail: details.email,
            Patient_Phone: {
              dialCode: details.phone.dialCode,
              // number: details.phone.number.substring(
              //   details.phone.dialCode.length
              // ),
              number: details.phone.number.startsWith(details.phone.dialCode)
                ? details.phone.number.slice(details.phone.dialCode.length)
                : details.phone.number,
            },
          });
          if (userRef) {
            localStorage.setItem("user", userRef.id);
          }
        } catch (e) {
          console.log("Error creating user:", e);
        }
        setError("");
      }
    }

    return userRef;
  };

  const Back = () => {
    if (condition === 3) {
      setCondition(2);
    } else if (condition === 2) {
      setCondition(1);
      callMe();
    } else if (condition === 1) {
      navigate("/slot");
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setDetails({ ...details, name: e.target.value });
      setError("");
    } else if (e.target.name === "email") {
      setDetails({ ...details, email: e.target.value });
      setError("");
    } else if (e.target.name === "phone") {
      const { value, data } = e.target;
      setDetails((prevDetails) => ({
        ...prevDetails,
        phone: {
          dialCode: data?.dialCode || prevDetails.phone.dialCode,
          number: value
            .replace(data?.dialCode || prevDetails.phone.dialCode, "")
            .trim(),
        },
      }));
      setError("");
    }
  };
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      greetUser();
    }
  };
  const Input = useRef();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  useEffect(() => {
    if (condition === 1) {
      Input.current = nameRef.current;
      nameRef.current.focus();
    } else if (condition === 2) {
      Input.current = emailRef.current;
      emailRef.current.focus();
    } else if (condition === 3) {
      Input.current = phoneRef.current;
      phoneRef.current.focus();
    }
  }, [condition]);
  const handleSubmit = async () => {
    try {
      const userRef = await greetUser();

      if (userRef) {
        const appointmentRef = await addDoc(collection(db, "Appointment"), {
          status: "Pending",
          AppointmentBookingDate: timestamp,
          Date: localStorage.getItem("date"),
          Time: localStorage.getItem("time"),
        });
        if (appointmentRef) {
          // Save data to localStorage before updating the document
          localStorage.setItem("Doctor", localStorage.getItem("Doctor"));
          localStorage.setItem(
            "countryRef",
            localStorage.getItem("countryRef")
          );
          localStorage.setItem(
            "DiseaseRef",
            localStorage.getItem("DiseaseRef")
          );
          localStorage.setItem("user", localStorage.getItem("user"));
          localStorage.setItem("reference", appointmentRef.id);

          await updateDoc(doc(db, "Appointment", appointmentRef.id), {
            Doctor: doc(db, "DoctorList", localStorage.getItem("Doctor")),
            Location: doc(db, "Location", localStorage.getItem("countryRef")),
            Disease: doc(db, "DiseaseList", localStorage.getItem("DiseaseRef")),
            User: userRef,
          });

          navigate("/msg");
        }
      }
    } catch (e) {
      console.error("Error creating appointment:", e);
    }
  };

  const callMe = async () => {
    if (localStorage.getItem("user") !== null) {
      const Infodata = await getDoc(
        doc(db, "users", localStorage.getItem("user"))
      );
      setDetails({
        name: Infodata.data().Patient_Name || "",
        email: Infodata.data().Patient_Mail || "",
        phone: {
          dialCode: Infodata.data().Patient_Phone?.dialCode || "",
          number: Infodata.data().Patient_Phone?.number || "",
        },
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      callMe();
    } else {
      handleMe();
    }
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
  }, []);
  const handleMe = async () => {
    const v = localStorage.getItem("countryRef");
    const as = await getDoc(doc(db, "Locations", v));
    if (as.data().name === "India") {
      setDetails({
        ...details,
        phone: {
          ...details.phone,
          dialCode: "in",
        },
      });
    } else if (as.data().name === "England") {
      setDetails({
        ...details,
        phone: {
          ...details.phone,
          dialCode: "gb",
        },
      });
    } else if (as.data().name === "Israel") {
      setDetails({
        ...details,
        phone: {
          ...details.phone,
          dialCode: "il",
        },
      });
    } else if (as.data().name === "America") {
      setDetails({
        ...details,
        phone: {
          ...details.phone,
          dialCode: "us",
        },
      });
    }
  };

  return (
    <div
      ref={Input}
      onKeyDown={(e) => handlePress(e)}
      className="d-flex justify-content-center align-items-center"
    >
      <Container maxWidth className="text-dark text-center p-0">
        <ToggleModal />

        <Grid container>
          <StyledCol item xs={12} md={6}>
            <StyledImage
              src="https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000"
              alt=".."
            />
          </StyledCol>
          <StyledCol
            item
            xs={12}
            md={6}
            className="backall back text-dark  justify-content-center "
           
          >
             <div
                className="m-5 text-dark  justify-content-center"
                style={{ textAlign: "start" }}
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-duration="2000"
              >
            {" "}
            <div
              className="m-5 text-dark  justify-content-center"
              style={{ textAlign: "start" }}
              
            >
              <h4>
                <span style={{ color: "rgb(196, 70, 101)" }}>*</span>
                The Assessment of our partner doctors relies on complete
                accuracy and honesty in your answers to the Questions below.
              </h4>

              <h4 className="mt-3">
                {condition === 1
                  ? "Great, can we get your full name?"
                  : condition === 2
                  ? `Welcome  ${details.name} Please Provide Your Email`
                  : "Please Provide Your Contact Number"}
              </h4>
            </div>
            <Box sx={{ width: "600px", marginLeft: "53px" }}>
              {condition === 1 && (
                <TextField
                  className="w-100 p-2 mb-2"
                  label="Fill your name"
                  value={details.name}
                  name={"name"}
                  onChange={(e) => handleChange(e)}
                  ref={nameRef}
                  variant="standard"
                  inputProps={{
                    style: { borderColor: "rgb(196, 70, 101)" },
                  }}
                  InputLabelProps={{
                    style: { color: "rgb(196, 70, 101)" },
                  }}
                />
              )}
              {condition === 2 && (
                <>
                  <TextField
                    className="w-100 p-2 mb-2"
                    label="Fill your Email"
                    value={details.email}
                    name={"email"}
                    onChange={(e) => handleChange(e)}
                    ref={emailRef}
                    variant="standard"
                    inputProps={{
                      style: { borderColor: "rgb(196, 70, 101)" },
                    }}
                    InputLabelProps={{
                      style: { color: "rgb(196, 70, 101)" },
                    }}
                  />
                </>
              )}
              {condition === 3 && (
                <div className="w-100" ref={phoneRef}>
                  <PhoneInput
                    className="w-100 "
                    label="Fill your contact"
                    country={details.phone.dialCode}
                    onlyCountries={["in", "gb", "us", "il"]}
                    value={`${details.phone.dialCode} ${details.phone.number}`}
                    name="phone"
                    onChange={(value, data) =>
                      handleChange({ target: { name: "phone", value, data } })
                    }
                    variant="standard"
                    inputProps={{
                      style: { borderColor: "rgb(196, 70, 101)" },
                    }}
                    InputLabelProps={{
                      style: { color: "rgb(196, 70, 101)" },
                    }}
                  />
                </div>
              )}
            </Box>
            <Grid container spacing={2} >
              <Grid
                item
                xs={12}
                md={9}
                className={
                  "form__item button__items d-flex justify-content-between mt-5 ms-5"
                }
              >
                <Button
                  variant="outlined"
                  className="buttheme me-2 mt-3  text-light"
                  onClick={() => Back()}
                >
                  Back
                </Button>
                {(condition === 1 || condition === 2) && (
                  <>
                    <Button
                      variant="outlined"
                      className="buttheme mt-3  text-light"
                      onClick={() => greetUser()}
                    >
                      Next
                    </Button>
                  </>
                )}
                {(condition === 3 || condition === 3) && (
                  <Button
                    variant="outlined"
                    className="buttheme mt-3  text-light"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Confirm
                  </Button>
                )}
              </Grid>

              <Grid item xs={12} md={10}>
                {error && (
                  <div
                    className="alert alert-danger mt-3 d-flex justify-content-start ms-5"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </Grid>
            </Grid>
            </div>
          </StyledCol>
        </Grid>
      </Container>
    </div>
  );
};

export default Information;
