import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Banner from "./components/Banner";
import Location from "./components/Location";
import Problem from "./components/Problem";
import Information from "./components/Information";
import Message from "./components/Message";
import ErrorPage from "./components/ErrorPage";
import FormView from "./components/FormView";
import SubmitPage from "./components/SubmitPage";
import TimeSlots from "./components/TimeSlots";
import Doctor from "./components/Specialists";
import {
  React_Banner,
  React_Problem,
  React_Error,
  React_Info,
  React_Message,
  React_Specalists,
  React_view,
  React_submit,
  React_TimeSlots,
  React_Location,
} from "./components/Routes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={React_Banner} element={<Banner />} />
          <Route path={React_Problem} element={<Problem />} />
          <Route path={React_Location} element={<Location />} />
          <Route path={React_Specalists} element={<Doctor />} />
          <Route path={React_TimeSlots} element={<TimeSlots />} />
          <Route path={React_Info} element={<Information />} />
          <Route path={React_Error} element={<ErrorPage />} />
          <Route path={React_Message} element={<Message />} />
          <Route path={React_view} element={<FormView />} />
          <Route path={React_submit} element={<SubmitPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
