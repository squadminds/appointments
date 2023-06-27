import React, { useEffect,useMemo,useRef,useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBInput} from "mdb-react-ui-kit";
import { useSelector,useDispatch } from 'react-redux';
import { modalShow ,BookAppointment, selectedDate, SelectedDisease,setShowSlot} from '../redux/HealthSlice';
import ToggleModal from "./modal";
import { useNavigate,useLocation } from "react-router-dom";
import {BsFillForwardFill} from "react-icons/bs";
import {ImArrowLeft} from "react-icons/im"
import { timeSlot } from './Calls';
function Timeslots() {
const location=useLocation()
  const [ActiveDate,setActiveDate]=useState()
  const dispatch=useDispatch()
 const [startIndex,setStartIndex]=useState(0)
 const [lastIndex,setLastIndex]=useState(5)
  const [show,setShow]=useState(true)
  const navigate = useNavigate();
  const [dates,setDates]=useState([]);
  const greetUser=(e)=>{
 
  const date=e.target.id
  const TimeSlot=e.target.innerText
  dispatch(BookAppointment({date,TimeSlot}))
  navigate("/info");
 }

const handleBack=()=>{
  navigate("/doctor",{state:location.state});

}
const handleNext=()=>{
if(ActiveDate){
    navigate("/info");
  }else{
    dispatch(modalShow("Select Slot"))
  }
}
const handleOther=()=>{
if(startIndex===0){
    setStartIndex(5)
    setLastIndex(10)
}
setShow(false)
}
const handlePrevious=()=>{
setStartIndex(0)
setLastIndex(5)
 setShow(true)
}
const dataAccess=async()=>{
 const value=await timeSlot(location.state)
 setDates(value)
}
useEffect(()=>{
   dataAccess()
},[location.state])
useEffect(()=>{
console.log("these are dates ",dates)
},[dates])
return (
    <MDBContainer fluid className="backall">
         <ToggleModal/>
        <MDBContainer>
            <MDBRow>
    {show===false &&  <MDBCol size="md-2" className="mt-5">
<MDBBtn className={"glassbut Day fw-bold me-3"} onClick={()=>handlePrevious()}>
<ImArrowLeft color="brown" size="35"/>{"...Previous"}
</MDBBtn>
</MDBCol>}
            {dates?.slice(startIndex,lastIndex).map((val,ind)=>{
              return(
            <MDBCol size={"md-2"} className="mt-5">
          <MDBBtn    name={val.slot} className={"glassbut Day fw-bold me-3"}  >
           {val.slot} </MDBBtn>
      
   {val && val.timeSlot?.map((item,i)=>{
            return(
            <MDBBtn
          id={val.day}
          className={"me-5 timeSlot mt-3 fw-bold"}
          onClick={(e)=>greetUser(e)}
        > {item}</MDBBtn>)})}
          <MDBRow>
         
      
            
            </MDBRow>
            </MDBCol>) })} 
        {show &&    
         <MDBCol size="md-2" className="mt-5">
          <MDBBtn className={"glassbut Day fw-bold me-3"} onClick={()=>handleOther()}>
            {"Select Other..."} </MDBBtn></MDBCol> }
            </MDBRow>
            <div
        className={"form__item button__items d-flex justify-content-between"}
      >
        <MDBBtn type={"default"} className="NePreBtn buttheme me-2 mt-3" onClick={handleBack} >
          Back
        </MDBBtn>
        <MDBBtn type={"danger"} className=" NePreBtn buttheme mt-3" onClick={handleNext} >
          Next
        </MDBBtn>
      </div>
        </MDBContainer>
    </MDBContainer> 
  )
}

export default Timeslots
