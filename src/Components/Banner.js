import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const Banner = () => {
  const [state, setState] = useState();
  const navigate = useNavigate();
  const date = new Date();

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
  }, []);
  // onkeypress
  const greetUser = async () => {
    try {
      const ref = await addDoc(collection(db, "Appointment"),{});
      localStorage.setItem("reference", ref.id);
    } catch (e) {}

    navigate("/problem");
  };

  const changeValue = (e) => {
    if (e.key === "Enter") {
      setState(e.target.value);
      greetUser();
    }
  };
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        setState(e.target.value);
        greetUser();
      }
    });
  }, []);
  useEffect(()=>{
localStorage.clear()
  })
  return (
    <MDBContainer fluid>
      <MDBRow onKeyPress={changeValue}>
        <MDBCol size="md-6" className="backall back">
          <h2
            className=" text-dark fw-bold texth2"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            Complete this form to
            <br />
            <span className="text-dark fw-bold">
              book an <br />
              appointment
            </span>
            with one
            <br /> of our specialists.
          </h2>
          <p
            className="text-dark"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            Description (optional)
          </p>
          <MDBBtn
            className="fw-bold but NePreBtn "
            onClick={() => greetUser()}
          
          >
            <NavLink
              to="/problem"
              className="text-light NePreBtn"
              onKeyPress={changeValue}
            >
              Schedule
            </NavLink>
          
            
          </MDBBtn>
          {/* <MDBBtn 
           className="fw-bold but NePreBtn ">
          <NavLink
              to="/Check"
              className="text-light NePreBtn"
            
            >
             Check Status
            </NavLink>
            </MDBBtn> */}
        </MDBCol>

        <MDBCol size="md-6">
          <img
            src="https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000"
            alt=".."
            className="bannerimgs"
            height="69%"
            width="100%"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Banner;
