import React, { useRef, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
const Email = () => {
  const [state, setState] = useState();
  const navigate = useNavigate();

  const Location =useLocation();
  console.log(Location.state);
  function greetUser() {
    navigate("/phone");
  }

  function Back() {
    navigate("/info");
  }

  const EmailInput = useRef(null);

  useEffect(() => {
    if (EmailInput.current) {
      EmailInput.current.focus();
    }
  }, []);

  // validate
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) errors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email address";
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
    <MDBContainer fluid>
      <MDBRow>
        <form onSubmit={formik.handleSubmit}>
          <MDBContainer>
            <MDBRow
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-duration="2000"
            >
              <h3 className="mt-5 text-dark d-flex justify-content-center">
                The Assessment of our partner doctors relies on complete
                accuracy
                <br /> and honesty in your answers to the Questions below.
              </h3>

              <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                <h2> What's your email?</h2>
              </MDBCol>

              <MDBRow className="d-flex justify-content-center">
                <MDBCol size="md-6" className="mt-3 text-dark">
                  <MDBInput
                    className="w-100 "
                    label="fill your email"
                    ref={EmailInput}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyPress={changeValue}
                  />
                  <div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </MDBCol>
              </MDBRow>
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
  );
};

export default Email;
