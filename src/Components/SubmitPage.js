import React from 'react';
import {  MDBContainer,MDBBtn, MDBRow,MDBCol } from 'mdb-react-ui-kit';
import {addDoc,doc,collection,getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
function SubmitPage() {
   
    const navigate=useNavigate()
   
   
    const handleSubmit=async()=>{
    
    try{
        const dat=await getDoc(doc(db,"Temp",localStorage.getItem("reference")))
        if(dat.exists){
      const ref=  await addDoc(collection(db,"Appointment"),{...dat.data(),status:"Pending"})
      if(ref){
        localStorage.clear()
        localStorage.setItem("reference",ref.id)
        navigate("/msg")
      }}
    }catch(e){
        console.log("object",e)
    
}

      
    }
    const handleBack=()=>{
      if(localStorage.getItem("date")){
navigate("/info")
      }else{
        console.log("page already submitted")
      }
    }  
    return (
    <MDBContainer fluid className="backall justify-content-center border">
        <MDBRow>
        <h3 className="mt-5 text-dark d-flex justify-content-center">
    Proceed With Appointment 
            
            </h3>
        </MDBRow>
        <MDBRow className="d-flex mt-5  py-5 justify-content-center">
        <MDBCol size={6}>
        <div
                  className={
                    "form__item button__items d-flex justify-content-between"
                  }
                >

<MDBBtn onClick={()=>{handleBack()}}>
Edit  Details
    </MDBBtn>
    <MDBBtn onClick={()=>{handleSubmit()}}>
Proceed
    </MDBBtn>


</div>
</MDBCol>
</MDBRow>
</MDBContainer>
  )
}

export default SubmitPage
