import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedDoctor:"",
  ModalTitle:"",
  DiseaseType:"",
  appointment:{
    date:"",
    TimeSlot:""
  },
 
Name:"",
Email:"",
Phone:"",
showSlot:false
}

export const HealthSlice = createSlice({
  name: 'HealthReducer',
  initialState,
  reducers: {
modalShow:(state,action)=>{

  state.ModalTitle=action.payload
  

},

selectedDoc:(state,action)=>{
  state.selectedDoctor=action.payload
},
SelectedDisease:(state,action)=>{
  state.DiseaseType=action.payload
},
SelectedSlot:(state,action)=>{
state.slot=action.payload;
},
selectedDate:(state,action)=>{
  state.Date=action.payload;
},
BookAppointment:(state,action)=>{
  state.appointment.date=action.payload.date;
  state.appointment.TimeSlot=action.payload.TimeSlot
},
InfoName:(state,action)=>{
state.Name=action.payload
},
InfoEmail:(state,action)=>{
state.Email=action.payload
},
InfoPhone:(state,action)=>{
state.Phone=action.payload
},
setShowSlot:(state,action)=>{
state.showSlot=action.payload
}

  
  },
})


export const {selectedDoc,modalShow,SelectedDisease,SelectedSlot,selectedDate,BookAppointment,InfoName,InfoPhone,InfoEmail,setShowSlot } =HealthSlice.actions;

export default HealthSlice.reducer;