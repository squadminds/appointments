import React,{useEffect, useState} from 'react'
import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
import {BsPrinterFill} from "react-icons/bs";
import { useSelector,useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setShowSlot } from '../redux/HealthSlice';
function FormView() {
    const {selectedDoctor,Date,appointment}=useSelector((state)=>state.HealthReducer)
const [show,setShow]=useState()
    const handlePrint=()=>{
       
        window.print()

    }

    useEffect(()=>{
        const handleBeforePrint=()=>{
setShow(false)
        } 
        const handleAfterPrint=()=>{
            setShow(true)
        }       
        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);
    },[])
  return (
    <MDBContainer fluid className='backall'>
        <MDBRow>

        <h1 className='mt-5  d-flex justify-content-center' style={{color:"brown"}}>Appointment Confirmation Status</h1>
        <h3 className='mt-5 text-dark d-flex justify-content-center'>Your Appointment Has Been Fixed with  &nbsp; <span style={{color:"Red"}}>{selectedDoctor} </span>  &nbsp; on  &nbsp; <span style={{color:"Red"}}> {appointment.date} </span></h3>
        <h3 className='mt-5 text-dark d-flex justify-content-center'>Your Appointment ID &nbsp; <span style={{color:"Red"}}>{uuidv4()}</span></h3>
        </MDBRow>
        <MDBRow className='d-flex justify-content-center print-button'>
 <MDBCol size={6}>
  <div
                    className={
                      "form__item button__items d-flex justify-content-center"
                    }
                  >
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-3"
                     onClick={()=>handlePrint()}
                    >
                  <BsPrinterFill color="white" size="30"/>   print Recipt
                    </MDBBtn>
                   
                  </div>
  </MDBCol>
</MDBRow>
        
    </MDBContainer>
  )
}

export default FormView
