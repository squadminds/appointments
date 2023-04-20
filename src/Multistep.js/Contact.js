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
import { useFormik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import "../styles.css";


//localstorage data get set

function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));
  function setStorage(item) {
    localStorage.setItem(key, item);
    setState(item);
  }
  return [state, setStorage];
}

const Contact = ({ setForm, formData, navigation }) => {
  const [state, setState] = useState();
  const { email } = formData;
  const { previous, next } = navigation;
  //autofocus
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
  // keypress
      const changeValue = (e) => {
        if (e.key === "Enter") {
          setState(e.target.value);
          if(e.target.value.length > 0){
              // greetUser()
              next()
          }}
      };
      //value get set localstorage

  const [input, setInput] = useState("");
  const [item, setItem] = useLocalStorage("myKey");

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
                <h2 className="mt-5"> And what's {item}  email address?</h2>
              </MDBCol>
              <MDBRow className="d-flex justify-content-center  ">
                <MDBCol size="md-6" className="mt-3 text-dark">
                  <MDBInput
                    className="w-100 "
                    label="fill your email"
                    ref={EmailInput}
                    name="email"
                    value={email}
                    onChange={setForm}
                    onBlur={formik.handleBlur}
                    onKeyPress={changeValue}
                  />
                  <div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </MDBCol>
                <MDBRow className="d-flex justify-content-center ">
                  <MDBCol size={6}>
                    <div
                      className={
                        "form__item button__items d-flex justify-content-between"
                      }
                    >
                      {/* <MDBBtn
                      type={"default"}
                      className="buttheme me-2 mt-3"
                      onClick={Back}
                    >
                      Back
                    </MDBBtn> */}
                      {/* <MDBBtn
                        type={"primary"}
                        className="buttheme mt-3"
                        onClick={next}
                      >
                        Next
                      </MDBBtn> */}
                    </div>
                  </MDBCol>
                </MDBRow>
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
export default Contact;




