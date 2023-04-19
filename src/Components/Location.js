<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useRef, useEffect } from "react";
=======
import React, { useRef, useEffect, useState } from "react";
>>>>>>> Stashed changes
import Aos from "aos";
import "aos/dist/aos.css";

=======
>>>>>>> Stashed changes
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
<<<<<<< Updated upstream

=======
import React, { useRef, useEffect } from "react";
>>>>>>> Stashed changes
import "../styles.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [state, setState] = useState();
  const navigate = useNavigate();
  function greetUser() {
    navigate("/problem");
  }

  function Back() {
    navigate("/");
  }

  //autofocus
  const Input = useRef(null);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  useEffect(() => {
    if (Input.current) {
      Input.current.focus();
    }
  }, []);

  // validate
  const formik = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.location) errors.location = "Location is required";
      else if (!/^[a-zA-Z\s]+$/.test(values.location))
        errors.location = "Location should only contain alphabets and spaces";
      return errors;
    },
  });

  // aos

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    Aos.refresh();
  }, []);

  const changeValue = (e) => {
    if (e.key === "Enter") {
      setState(e.target.value);
      greetUser();
    }
  };
  return (
    <>
      {/* <MDBContainer
        fluid
        className="backall"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        {" "} */}
      <MDBContainer fluid className="backall">
        <MDBRow>
          <form onSubmit={formik.handleSubmit}>
            <MDBContainer>
              <MDBRow className=" " data-aos="fade-up" data-aos-offset="0"   data-aos-duration="2000">
                <MDBCol size={12} className="">
                  <h3 className="mt-5 text-dark d-flex justify-content-center">
                    The Assessment of our partner doctors relies on complete
                    accuracy
                    <br /> and honesty in your answers to the Questions below.
                  </h3>

                  <h4 className="mt-5 text-dark d-flex justify-content-center">
                    Fill Your Location
                  </h4>

                  <h2 className="d-flex justify-content-center">
                    {" "}
                    What is the name of your country of residence?
                  </h2>
                </MDBCol>
                <MDBRow className="d-flex justify-content-center">
                  <MDBCol size={6} className="mt-3 text-dark   ">
                    <MDBInput
                      className="w-200"
                      label="fill your location"
                      ref={Input}
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyPress={changeValue}
                    />
                    <br />
                    <div>
                      {formik.touched.location && formik.errors.location ? (
                        <div className="text-danger">
                          {formik.errors.location}
                        </div>
                      ) : null}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBRow>

              {/* <MDBRow className="d-flex justify-content-center">
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
                      onClick={greetUser}
                    >
                      Next
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow> */}
            </MDBContainer>
          </form>
        </MDBRow>
      </MDBContainer>
      {/* </MDBContainer> */}
    </>
  );
};

export default Location;
