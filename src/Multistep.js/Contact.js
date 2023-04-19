import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import { useFormik } from "formik";
import React,{ useRef, useEffect } from 'react'
import "../styles.css"
// import ItemForm from "./ItemForm";

const Contact = ({ setForm, formData, navigation }) => {
  const {  email } = formData;

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



  return (
    <MDBContainer fluid className='backall '>
       <MDBRow>
       <form onSubmit={formik.handleSubmit}>
        <MDBContainer>
          <MDBRow className='mt-5'>

            <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
            <h2 className='mt-5'> And what's your email address?</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size="md-6" className='mt-3 text-dark'>
              <MDBInput className='w-100 ' label="fill your email" ref={EmailInput} name="email"
   value={email} onChange={setForm}
   onBlur={formik.handleBlur}
 />
 <div>
   {formik.touched.email && formik.errors.email ? (
     <div className="text-danger">{formik.errors.email}</div>
   ) : null}
 </div>
            </MDBCol>
          </MDBRow>
<MDBRow className='d-flex justify-content-center'>
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
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-3"
                      onClick={next}
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

export default Contact;
