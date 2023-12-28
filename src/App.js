import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Banner from "./Components/Banner";
import Location from "./Components/Location";
import Problem from "./Components/Problem";
import Information from "./Components/Information";
import Message from "./Components/Message";
import ErrorPage from "./Components/ErrorPage";
import FormView from "./Components/FormView";
import SubmitPage from "./Components/SubmitPage";
import TimeSlots from "./Components/TimeSlots";
import Doctor from "./Components/Specialists";
// import {
//   React_Banner,
//   React_Problem,
//   React_Error,
//   React_Info,
//   React_Message,
//   React_Specalists,
//   React_view,
//   React_submit,
//   React_TimeSlots,
//   React_Location,
// } from "./Components/Routes";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Banner />} />
          <Route path="/Problem" element={<Problem />} />
          <Route path='/location' element={<Location />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path="/slot" element={<TimeSlots />} />
          <Route path="/info" element={<Information />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/msg" element={<Message />} />
          <Route path="/formReview" element={<FormView />} />
          {/* <Route path="/Submit" element={<SubmitPage />} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
