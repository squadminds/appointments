import React,{ useRef, useEffect } from 'react'
import "../styles.css"
import { useNavigate } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from 'mdb-react-ui-kit'
const PhoneNumber = () => {
    
    const navigate = useNavigate();
  function greetUser() {
    navigate("/msg");
  }

  function Back() {
    navigate("/email");
  }

  const EmailInput = useRef(null);

  useEffect(() => {
    if (EmailInput.current) {
      EmailInput.current.focus();
    }
  }, []);
  return (
    <MDBContainer fluid className='backall '>
       <MDBRow>
        <MDBContainer>
          <MDBRow>
            <h3 className='mt-5 text-dark d-flex justify-content-center'>The Assessment of our partner doctors relies on complete accuracy<br/> and honesty in your answers to the Questions below.</h3>

            <MDBCol className='mt-5 text-dark d-flex justify-content-center'>
            <h2> Your question here. Recall information with @</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol size={6} className='mt-3 text-dark'>
              <MDBInput className='w-100 ' label="fill your conatct" ref={EmailInput}/>
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
       </MDBRow>
    </MDBContainer>
  )
}

export default PhoneNumber
