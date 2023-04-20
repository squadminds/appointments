import React, { useRef, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
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
      if(e.target.value.length > 0){
          greetUser()
      }}
  };
  return (
    <>

      <MDBContainer fluid className="backall">
        <MDBRow>
          <form onSubmit={formik.handleSubmit}>
            <MDBContainer>
              <MDBRow className="mt-5 " data-aos="fade-up" data-aos-offset="0"   data-aos-duration="2000">
              
                <MDBCol size={12} className="mt-5">
                  <h4 className="mt-5 text-dark d-flex justify-content-center">
                    Fill Your Location
                  </h4>

                  <h3 className="d-flex justify-content-center">
                    {" "}
                    What is the name of your country of residence?
                  </h3>
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

             </MDBContainer>
          </form>
        </MDBRow>
<MDBContainer className="butfixed" fluid>
<MDBRow className="d-flex flex-row-reverse">
                <MDBCol size={6}>
                  <div
                    className={
                      "form__item button__items d-flex flex-row-reverse"
                    }
                  >
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-5"
                      onClick={greetUser}
                      onKeyPress={changeValue}
                    >
<MDBIcon fas icon="angle-right" className="fs-2" />
                    </MDBBtn>
                    <MDBBtn
                      type={"default"}
                      className="buttheme me-2 mt-5"
                      onClick={Back}
                    >
<MDBIcon fas icon="angle-left" className="fs-2" />

                    </MDBBtn>
                   
                  </div>
                </MDBCol>
              </MDBRow>
</MDBContainer>
      </MDBContainer>
 
             
    </>
  );
};

export default Location;
