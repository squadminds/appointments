import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";
import React, { useRef, useEffect, useState } from "react";
import "../styles.css";
import { useFormik } from "formik";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { useNavigate } from "react-router-dom";

//value get set localstorage


function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));
  function setStorage(item) {
    localStorage.setItem(key, item);
    setState(item);
  }
  return [state, setStorage];
}
const Names = ({ setForm, formData, navigation }) => {
  const [state, setState] = useState();
  const { name } = formData;
  const { next,prev } = navigation;
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
  // onkeypress
  const changeValue = (e) => {
    if (e.key === "Enter") {
      setState(e.target.value);
      if(e.target.value.length > 0){
          next()
        setItem(input)
      }}
  };

  const navigate = useNavigate();
  function greetUser() {
    navigate("/slot");
  }
  //localstorage value

  const [input, setInput] = useState("");
  const [item, setItem] = useLocalStorage("myKey");

  return (
    <MDBContainer fluid className="backall ">
      <MDBRow>
        <form onSubmit={formik.handleSubmit}>
          <MDBContainer className="mt-5 ">
            <MDBRow
              className=""
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-duration="2000"
            >
              <MDBCol className="mt-5 text-dark d-flex justify-content-center">
                <h3 className="mt-5"> Great, can we get your full name?</h3>
              </MDBCol>
              <MDBRow className="d-flex justify-content-center ">
                <MDBCol size="md-6" className="mt-3 text-dark">
                  <MDBInput
                    className="w-100 "
                    label="fill your name"
                    ref={Input}
                    name="name"
                    onBlur={formik.handleBlur}
                    value={name}
                    onChange={setForm}
                    onKeyPress={changeValue}
                    onInput={(e) => setInput(e.target.value)}
                   
                  />
                  <div>
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
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
                        type="submit"
                        className="buttheme mt-3"
                        onClick={next}
                      >
                        Ok
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
                      onClick={greetUser}
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
export default Names;