import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import "../styles.css"
import { NavLink } from 'react-router-dom'

const Banner = () => {
  return (
    <MDBContainer fluid>
        <MDBRow>
            <MDBCol size="md-6" className='back'>
<h2 className=' text-dark fw-bold texth2'>Complete this form to<br/><span className='text-dark fw-bold'> book an <br/>appointment </span>with one<br/> of our specialists.</h2>
<p className='text-dark'>Description (optional)</p>

<MDBBtn className='fw-bold but'><NavLink to="/location" className="text-light">Schedule</NavLink></MDBBtn>
            </MDBCol>
            <MDBCol size="md-6" >
<img src='https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000' alt='..' className='bannerimgs'/>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default Banner
