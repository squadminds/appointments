import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { NavLink } from "react-router-dom";
const Banner = () => {
  // aos
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    Aos.refresh();
  }, []);

  return (
    <MDBContainer fluid>
      <MDBRow>
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
              {" "}
              book an <br />
              appointment{" "}
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
            className="fw-bold but "
            // data-aos="fade-up" data-aos-offset="2"   data-aos-duration="2000"
          >
            <NavLink to="/location" className="text-light">
              Schedule
            </NavLink>
          </MDBBtn>
        </MDBCol>
        <MDBCol size="md-6">
          <img
            src="https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000"
            alt=".."
            className="bannerimgs"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default Banner;
