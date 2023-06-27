import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import React,{ useRef, useEffect, useCallback ,useState,KeyboardEvent, useMemo} from 'react'
import "../styles.css"
import { useFormik } from "formik";
import { useNavigate,useLocation } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
import { modalShow} from "../redux/HealthSlice";
import data from "./contents/CountryCodes.json"
import ToggleModal from './modal';
import {collection, addDoc,getDocs,query,where, updateDoc,doc,getDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import { selectedCountry,matchedCountry} from './Calls';
import { CallMe } from './Calls';
const Location = () => {
  const [country,setCountry]=useState("");

  const navigate = useNavigate();
  const location = useLocation();
  
const data=collection(db,"healthcare","appointment")

  const dispatch=useDispatch()

const handleNavigate=async ()=>{
  selectedCountry(country)

   navigate("/problem",{state:location.state})
}
  const greetUser = async () => {

    const isCountry=await matchedCountry(country)
    console.log("this is",isCountry)
if(isCountry){
navigate("/problem")
selectedCountry(country)
}else{
  dispatch(modalShow("Error Location"))
}
 

}
   const  Back=()=> {
    navigate("/");
  }

  //autofocus
 
const formik = useFormik({
  initialValues: {
    location: "",
 
  },
  onSubmit: (values) => {
    const str=values.location.charAt(0).toUpperCase() + values.location.slice(1)
    setCountry(str)
  },
  validate: (values) => {
    let errors = {};
    if (values.location!=="") errors.location = "Location is required";
    else if (!/^[a-zA-Z\s]+$/.test(data.location))
      errors.location = "Location should only contain alphabets and spaces";
      const str=values.location.charAt(0).toUpperCase() + values.location.slice(1)
    setCountry(str)

      return errors;
    

  },
});

useEffect(() => {
  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter" ) {
greetUser()

  
  }})
}, [country]);

  return (
    <MDBContainer fluid className='backall' >
      <ToggleModal/>
      <MDBRow>
       <form onSubmit={formik.handleSubmit}> 
      <MDBContainer>
          <MDBRow>
            <h3 className='mt-5 text-dark d-flex justify-content-center'>The Assessment of our partner doctors relies on complete accuracy<br/> and honesty in your answers to the Questions below.</h3>

            <h4 className='mt-5 text-dark d-flex justify-content-center'>Fill Your Location</h4>
            <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
            <h2>  What is the name of your country of residence?</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size="md-6" className='mt-3 text-dark'>
              <MDBInput className='w-100 ' type="text" label="fill your location" name="location"
   value={formik.values.location}
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}
 />

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
                      type={"primary"}
                      className="buttheme me-2 mt-3 NePreBtn"
                      onClick={Back}
                    >
                      Back
                    </MDBBtn>
                  
                 
              
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-3 NePreBtn"
                      onClick={()=>greetUser()}
                  
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

export default Location
