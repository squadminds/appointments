import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useRef, useEffect } from "react";
import "../styles.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/problem");
  }

  function Back() {
    navigate("/");
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

  return (
    <MDBContainer fluid className="backall">
      <MDBRow>
        <form onSubmit={formik.handleSubmit}>
          <MDBContainer>
            <MDBRow className="mt-5">
              <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                <h3 className="mt-5"> What  your  Location?</h3>
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size="md-6" className="mt-3 text-dark">
                <MDBInput
                  className="w-100 "
                  label="fill your location"
                  ref={Input}
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div>
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-danger">{formik.errors.location}</div>
                  ) : null}
                </div>
              </MDBCol>
              <MDBRow className="d-flex justify-content-center">
              <MDBCol size={6}>
                <div
                  className={
                    "form__item button__items d-flex justify-content-between"
                  }
                >
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
  );
};

export default Location;
