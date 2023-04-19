import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import React,{ useRef, useEffect } from 'react'
import "../styles.css"
import { useFormik } from "formik";

const Phone = ({ setForm, formData, navigation }) => {

  const { phone} = formData;

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
    if (!values.phone)
      errors.phone = "phonenumber  is required";
    else if (!/^(\+?\d{1,3}\s?)?(\d{10})$/.test(values.phone))
      errors.phone =
        "Phone number must be 10 digits with an optional country code";
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
         <h3 className='mt-5'> Your question here. Recall information with @</h3>
         </MDBCol>
       </MDBRow>
       <MDBRow className='d-flex justify-content-center'>
         <MDBCol size="md-6" className='mt-3 text-dark'>
           <MDBInput className='w-100 ' label="fill your conatct" ref={Input} name="phone"
onBlur={formik.handleBlur}
value={phone}
onChange={setForm}
/>
<div>
{formik.touched.phone && formik.errors.phone ? (
  <div className="text-danger">{formik.errors.phone}</div>
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
                    Ok
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

export default Phone
