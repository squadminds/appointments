import React, { useRef, useEffect,useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";

const PhoneNumber = () => {
  const [state, setState] = useState();
  const navigate = useNavigate();
  function greetUser() {
    navigate("/msg");
  }

  function Back() {
    navigate("/email");
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
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      let errors = {};
      if (!values.phone) errors.phone = "phonenumber  is required";
      else if (!/^(\+?\d{1,3}\s?)?(\d{10})$/.test(values.phone))
        errors.phone =
          "Phone number must be 10 digits with an optional country code";
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
    
      > */}{" "}
      <MDBContainer fluid className="backall ">
        <MDBRow className="" data-aos="fade-up" data-aos-offset="0"   data-aos-duration="2000">
          <form onSubmit={formik.handleSubmit}>
            <MDBContainer>
              <MDBRow>
                <h3 className="mt-5 text-dark d-flex justify-content-center">
                  The Assessment of our partner doctors relies on complete
                  accuracy
                  <br /> and honesty in your answers to the Questions below.
                </h3>

                <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                  <h2> Your question here. Recall information with @</h2>
                </MDBCol>
              </MDBRow>
              <MDBRow className="d-flex justify-content-center">
                <MDBCol size="md-6" className="mt-3 text-dark">
                  <MDBInput
                    className="w-100 "
                    label="fill your conatct"
                    ref={EmailInput}
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyPress={changeValue}
                  />
                  <div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-danger">{formik.errors.phone}</div>
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
      {/* </MDBContainer> */}
    </>
  );
};

export default PhoneNumber;
