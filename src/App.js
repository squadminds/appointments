import "./App.css";
import { Route, Routes } from "react-router-dom";
import Banner from "./Components/Banner";
import Location from "./Components/Location";
import Problem from "./Components/Problem";
import BrainSpecilist from "./Components/BrainSpecilist";
import Entspecilist from "./Components/EntSpecilist";
import ProblemDrop from "./Components/ProblemDrop";
import SkinSpecilist from "./Components/SkinSpecilist";
import HeartSpecilist from "./Components/Heartspecilist";
import Doctor from "./Components/Doctor";
import Slots from "./Components/Slots";
import DateSlot from "./Components/Calender";
import BoneSpecilist from "./Components/BoneSpecilist";
import ScrollTopBottom from "./Components/ScrollTopBottom";
import MultiStepForm from "./Multistep.js/MultiStepForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/location" element={<Location />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/brainspecilist" element={<BrainSpecilist />} />
        <Route path="/ent" element={<Entspecilist />} />
        <Route path="/dropdownlist" element={<ProblemDrop />} />
        <Route path="/skinspecilist" element={<SkinSpecilist />} />
        <Route path="/heartspecilist" element={<HeartSpecilist />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/slot" element={<Slots />} />
        <Route path="/calender" element={<DateSlot />} />
        <Route path="/info" element={<MultiStepForm />} />
        <Route path="/bone" element={<BoneSpecilist />} />
      </Routes>
      <ScrollTopBottom />
    </>
  );
}

export default App;
