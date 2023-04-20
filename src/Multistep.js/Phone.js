import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useRef, useEffect, useState } from "react";
import "../styles.css";
import { useFormik } from "formik";

const Phone = ({ setForm, formData, navigation }) => {
  const [state, setState] = useState();
  const { phone } = formData;
  const { previous, next } = navigation;
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
  // keypress
  const changeValue = (e) => {
    if (e.key === "Enter") {
      setState(e.target.value);
      if(e.target.value.length > 0){
          next()
      }}
  };
  


  return (
    <MDBContainer fluid className="backall ">
      <MDBRow>
        <form onSubmit={formik.handleSubmit}>
          <MDBContainer>
            <MDBRow
              className="mt-5 "
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-duration="2000"
            >
              <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                <h3 className="mt-5">
                  {" "}
                  Your question here. Recall information with @
                </h3>
              </MDBCol>
              <MDBRow className="d-flex justify-content-center">
                <MDBCol size="md-6" className="mt-3 text-dark">
                  <MDBInput
                    className="w-100 "
                    label="fill your conatct"
                    ref={Input}
                    name="phone"
                    onBlur={formik.handleBlur}
                    value={phone}
                    onChange={setForm}
                    onKeyPress={changeValue}
                  />
                  <div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-danger">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </MDBCol>
                
              </MDBRow>
            </MDBRow>
          </MDBContainer>
        </form>
      </MDBRow>
      <MDBContainer fluid className="butfixed">
      <MDBRow className="d-flex flex-row-reverse" style={{background:"#eadeda"}}>
                <MDBCol size={6}>
                  <div
                    className={
                      "form__item button__items d-flex flex-row-reverse"
                    }
                  >
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-5"
                      onClick={next}
                      >
<MDBIcon fas icon="angle-right" className="fs-2" />
                    </MDBBtn>
                    <MDBBtn
                      type={"default"}
                      className="buttheme me-2 mt-5"
                      onClick={previous}
                    >
<MDBIcon fas icon="angle-left" className="fs-2" />

                    </MDBBtn>
                   
                  </div>
                </MDBCol>
              </MDBRow>
              </MDBContainer>
    </MDBContainer>
  );
};
export default Phone;