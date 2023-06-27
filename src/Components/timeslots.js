// import React, { useEffect,useMemo,useRef,useState } from 'react'
// import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBInput} from "mdb-react-ui-kit";
// import { useSelector,useDispatch } from 'react-redux';
// import { modalShow ,BookAppointment, selectedDate, SelectedDisease,setShowSlot} from '../redux/HealthSlice';
// import ToggleModal from "./modal";
// import { useNavigate,useLocation } from "react-router-dom";
// import {BsFillForwardFill} from "react-icons/bs";
// import {ImArrowLeft} from "react-icons/im"

// function Timeslots() {
//   const ActiveSlot=useSelector((state)=>state.HealthReducer.appointment?.TimeSlot)
//   const show=useSelector((state)=>state.HealthReducer.showSlot)
//   const location=useLocation()


//   const [ActiveDate,setActiveDate]=useState()
//   const dispatch=useDispatch()
//   const currentIndex=useRef(0)
//   const lastIndex=useRef(5)

 
//   const navigate = useNavigate();
// const greetUser=(e)=>{
//   console.log("object",e.target.id,e.target.innerText)
//   const date=e.target.id
//   const TimeSlot=e.target.innerText
//   dispatch(BookAppointment({date,TimeSlot}))
//   navigate("/info");

// }

// const handleBack=()=>{
//   navigate("/doctor",{state:location.state});

// }
// const handleNext=()=>{

//   if(ActiveDate && ActiveSlot){
//     navigate("/info");
//   }else{
//     dispatch(modalShow("Select Slot"))
//   }
// }
// const handleOther=()=>{
//    setCurrentYear({year:dates[dates.length-1].day.split('-')[0],month:dates[dates.length-1].day.split('-')[1],day:dates[dates.length-1].day.split('-')[2]})
// const item=dates[dates.length-1].day.toString().split('-');

//  const value=[]
//  dates.map((val,i)=>{
//     if(i===dates.length-1){   
// if(item[1] == '4'|| item[1]=='6'|| item[1]=='9'|| item[1]== '11'){
//   console.log("i am inside even",item[1])
//   for(let i=Number(item[2])+1;i<Number(item[2])+6;i++){
//   if(i<31){
//     value.push({day:`${year}-${month}-${i}`,timeSlot:slots})
//   }else{
//     value.push({day:`${year}-${month+1}-${1}`,timeSlot:slots})
//     break;
//   }
// } }
// else if(item[1]=="1" || item[1]=="3"|| item[1]=="5"|| item[1]=="7" || item[1]=="8" || item[1]=="10" || item[1]=="12") {


//   for(let i=Number(item[2])+1;i<Number(item[2])+6;i++){
//     if(i<32){
//     value.push({day:`${year}-${month}-${i}`,timeSlot:slots})
//     }else{
//       value.push({day:`${year}-${month+1}-${1}`,timeSlot:slots})
//       break;
//     }
// }
//   }
//   else if(item[1]=="2"){
//     if(Number(item[0])%4===0){
//     console.log("i in leap year ")

//     for(let i=Number(item[2])+1;i<Number(item[2])+6;i++){
//       if(i<30){
//       value.push({day:`${year}-${month}-${i}`,timeSlot:slots})
//     }else{
//       value.push({day:`${year}-${month+1}-${1}`,timeSlot:slots})
//       break;
//     }
//   }
// }else{
//   for(let i=Number(item[2])+1;i<Number(item[2])+6;i++){
//    if(i<29){

//     value.push({day:`${year}-${month}-${i}`,timeSlot:slots})
//    } else{
//     value.push({day:`${year}-${month+1}-${1}`,timeSlot:slots})
//     break;
//   }
// }
// }
//   }
//   }})
//  setDates([...dates,...value])
//  currentIndex.current=lastIndex.current;
//  lastIndex.current=lastIndex.current+5
// dispatch(setShowSlot(true))
// }
// const handlePrevious=()=>{
//   currentIndex.current=0;
//   lastIndex.current=lastIndex.current-5;
//   dispatch(setShowSlot(false))
// }


// return (
//     <MDBContainer fluid className="backall">
//         <ToggleModal/>
//         <MDBContainer>
//             <MDBRow>
//     {show===true &&  <MDBCol size="md-2" className="mt-5">
// <MDBBtn className={"glassbut Day fw-bold me-3"} onClick={()=>handlePrevious()}>
// <ImArrowLeft color="brown" size="50"/>{"...Previous"}
// </MDBBtn>
// </MDBCol>}
//             {dates?.slice(currentIndex.current,lastIndex.current).map((val,ind)=>{
//               return(
//             <MDBCol size={"md-2"} className="mt-5">
//           <MDBBtn    name={val.day} className={ActiveDate===val.day?"glassbut activeDay fw-bold me-3":"glassbut Day fw-bold me-3"}  >
//            {val.day} </MDBBtn>
      
  
    
//           {val && val.timeSlot?.map((item,i)=>{
// return(
//             <MDBBtn
//           id={val.day}
//           className={ActiveSlot===item.time && ActiveDate===val.day?"me-5 activeSlot mt-3 fw-bold":"me-5 timeSlot mt-3 fw-bold"}
//           onClick={(e)=>greetUser(e)}
//         > {item.time}</MDBBtn>)})}
//           <MDBRow>
         
      
            
//             </MDBRow>
//             </MDBCol>) })}
        
        

// {show===false &&<MDBCol size="md-2" className="mt-5">
// <MDBBtn className={"glassbut Day fw-bold me-3"} onClick={()=>handleOther()}>{"...Select Other"}
// <BsFillForwardFill color='brown'  size="50" />
// </MDBBtn>
// </MDBCol>
// }


        
//             {/* <MDBCol size="md-3" className="mt-5">
//           <MDBBtn className={"glassbut Day fw-bold me-3"} onClick={()=>dispatch(modalShow("Select Date"))}>
//             {"Select Other..."}

//           </MDBBtn>
      
  
    
//           {slots.map((val,i)=>{
// return(
//             <MDBBtn
//           id={SelectedDate}
//           className={ActiveDate===SelectedDate && ActiveSlot===val.time? "activeSlot me-5 mt-3 fw-bold":"me-5 timeSlot mt-3 fw-bold"}
//           onClick={(e)=>greetUser(e)}
//         > {val.time}</MDBBtn>)})}
//           <MDBRow>
         
      
            
//             </MDBRow>
//             </MDBCol> */}
//             </MDBRow>
//             <div
//         className={"form__item button__items d-flex justify-content-between"}
//       >
//         <MDBBtn type={"default"} className="NePreBtn buttheme me-2 mt-3" onClick={handleBack} >
//           Back
//         </MDBBtn>
//         <MDBBtn type={"danger"} className=" NePreBtn buttheme mt-3" onClick={handleNext} >
//           Next
//         </MDBBtn>
//       </div>
//         </MDBContainer>
//     </MDBContainer>
//   )
// }

// export default Timeslots
