import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useRef, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const Information = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/email");
  }

  function Back() {
    navigate("/slot");
  }

  //autofocus

  const Input = useRef(null);

  useEffect(() => {
    if (Input.current) {
      Input.current.focus();
    }
  }, []);

  // validate
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) errors.name = "name is required";
      else if (!/^[a-zA-Z\s]+$/.test(values.name))
        errors.name = "name should only contain alphabets and spaces";
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
  return (
    <>
      {" "}
      <MDBContainer
        fluid
        className="backall"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        <MDBContainer fluid className="backall ">
          <MDBRow>
            <form onSubmit={formik.handleSubmit}>
              <MDBContainer className="mt-5 ">
                <MDBRow>
                  <h3 className="mt-5 text-dark d-flex justify-content-center">
                    The Assessment of our partner doctors relies on complete
                    accuracy
                    <br /> and honesty in your answers to the Questions below.
                  </h3>

                  <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                    <h2> Great, can we get your full name?</h2>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center">
                  <MDBCol size="md-6" className="mt-3 text-dark">
                    <MDBInput
                      className="w-100 "
                      label="fill your name"
                      ref={Input}
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div>
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>
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
                        onClick={greetUser}
                      >
                        Next
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </form>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </>
  );
};

export default Information;
