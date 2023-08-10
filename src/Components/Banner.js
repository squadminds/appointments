import React, { useEffect, useRef } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import { statusUpdate } from "./Calls";
const Banner = () => {
  const mainDivRef = useRef();
  const navigate = useNavigate();

  const greetUser = () => navigate("/problem");

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    statusUpdate();
    localStorage.clear();
  }, []);
  useEffect(() => {
    mainDivRef.current.focus();
  }, []);
  return (
    <MDBContainer
      ref={mainDivRef}
      fluid
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" ? greetUser() : "")}
    >
      <MDBRow>
        <MDBCol size="md-6" className="backall back">
          <h2
            className=" text-dark fw-bold texth2"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            Complete this form to book an appointment with one of our
            specialists.
          </h2>
          <p
            className="text-dark"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            Description (optional)
          </p>
          <MDBBtn className="fw-bold but NePreBtn " onClick={() => greetUser()}>
            <NavLink to="/problem" className="text-light NePreBtn">
              Schedule
            </NavLink>
          </MDBBtn>
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
