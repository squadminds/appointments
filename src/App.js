import './App.css';
import React,{useState} from "react"
import { Route, Routes } from 'react-router-dom';
import Banner from './Components/Banner';
import Location from './Components/Location';
import Problem from './Components/Problem';
import ProblemDrop from './Components/ProblemDrop';
import Doctor from './Components/Specialists';

import Information from './Components/Information';
import Message from './Components/Message';
import Timeslots from './Components/timeslots';

import ErrorPage from './Components/ErrorPage';
import FormView from './Components/formView';

import Todo from './Components/firebaseCon';
function App() {
  return (
    <div>
<Routes>
  <Route path='/' element={<Banner/>} />
  <Route path='/location' element={<Location/>}/>
  <Route path='/problem' element={<Problem/>} />
  <Route path='/dropdownlist' element={<ProblemDrop/>} />
  <Route path='/doctor' element={<Doctor/>} />
  <Route path='/slot' element={<Timeslots/>} />
 
  <Route path='/info' element={<Information/>} />
  <Route path="*" element={<ErrorPage/>}/>
  <Route path='/msg' element={<Message/>} />
  <Route path='/formReview' element={<FormView/>} />
</Routes>
{/* <Todo/> */}
</div>
  );
}

export default App;
