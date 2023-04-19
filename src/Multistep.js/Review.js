import React from "react";
import { MDBCol, MDBContainer, MDBRow,MDBBtn } from 'mdb-react-ui-kit'

const Review = ({  formData, navigation }) => {
  const {
    name,
    phone,
    email
  } = formData;
  const { go } = navigation;

  return (
    <MDBContainer fluid className='backall '>
    <MDBRow>
     <MDBContainer>
       <MDBRow className='mt-5'>

         <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
         <h2 className='mt-5'> Review your data</h2>
         </MDBCol>
       </MDBRow>
       <MDBRow className='d-flex justify-content-center'>
         <MDBCol size="md-6" className='mt-3 text-dark'>
         <div className="form">
      
      
      <h4>
        Name
      </h4>
      <div>
        {" "}
        First name: {`${name}`},
        <br />
      </div>
      <h4>
        Contact
      </h4>
      <div>
        Phone: {`${phone}`},
        <br />
        E-mail: {`${email}`}
      </div>
      <div>

      </div>
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
                         <MDBBtn onClick={() => go("submit")}                    className="buttheme me-2 mt-3">Submit</MDBBtn>
               </div>
</MDBCol>
</MDBRow>
     </MDBContainer>
    </MDBRow>
 </MDBContainer>


  );
};

export default Review;
