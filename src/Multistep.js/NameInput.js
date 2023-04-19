import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import React,{ useRef, useEffect } from 'react'
import "../styles.css"
import { useFormik } from "formik";

const Names = ({ setForm, formData, navigation }) => {
  const { name } = formData;

  const { next } = navigation;

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


  return (
            


        <MDBContainer fluid className='backall '>
        <MDBRow >
        <form onSubmit={formik.handleSubmit}>
         <MDBContainer className='mt-5 '>
           <MDBRow>
             <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
             <h3 className='mt-5'> Great, can we get your full name?</h3>
             </MDBCol>
           </MDBRow>
          
           <MDBRow className='d-flex justify-content-center'>
             <MDBCol size="md-6" className='mt-3 text-dark'>
               <MDBInput className='w-100 ' label="fill your name" ref={Input} name="name"
    onBlur={formik.handleBlur}
        value={name}
        onChange={setForm}
      
  />
  <div>
    {formik.touched.name && formik.errors.name ? (
      <div className="text-danger">{formik.errors.name}</div>
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
                       type="submit"
                       className="buttheme mt-3"
                        onClick={next}>Ok</MDBBtn>
                     
                   </div>
   </MDBCol>
 </MDBRow>
         </MDBContainer>
         </form>
        </MDBRow>
     </MDBContainer>
  );
};

export default Names;
