import React from "react";
import { NavLink } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
const Submit = () => {
  
  return (

        <MDBContainer fluid className='backall '>
        <MDBRow>
         <MDBContainer>
           <MDBRow className='mt-5'>
    
             <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
             <h2 className='mt-5'>       Thank you for submitting. We will be in touch</h2>
             </MDBCol>
           </MDBRow>
           <MDBRow className='d-flex justify-content-center'>
             <MDBCol size="md-6" className='mt-3 text-dark'>
             <div>

New Form  <MDBBtn className="buttheme me-2 mt-3"><NavLink to="/" style={{textDecoration:"none"}} className="text-light">Go To Back</NavLink></MDBBtn>
</div>
             </MDBCol>
           </MDBRow>
    
         </MDBContainer>
        </MDBRow>
     </MDBContainer>
  );
};

export default Submit;
