import React,{ useRef, useEffect } from 'react'
import "../styles.css"
import { useNavigate } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import { useFormik } from "formik";
const Email = () => {
    
    const navigate = useNavigate();
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

  return (
    <MDBContainer fluid className='backall '>
       <MDBRow>
       <form onSubmit={formik.handleSubmit}>
        <MDBContainer>
          <MDBRow>
            <h3 className='mt-5 text-dark d-flex justify-content-center'>The Assessment of our partner doctors relies on complete accuracy<br/> and honesty in your answers to the Questions below.</h3>

            <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
            <h2> And what's your email address?</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size="md-6" className='mt-3 text-dark'>
              <MDBInput className='w-100 ' label="fill your email" ref={EmailInput} name="email"
   value={formik.values.email}
   onChange={formik.handleChange}
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
  )
}

export default Email
