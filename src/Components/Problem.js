import React, { useCallback, useEffect,useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle
} from "mdb-react-ui-kit";
import { useNavigate,useLocation } from "react-router-dom";
import {useDispatch } from "react-redux";
import { modalShow} from "../redux/HealthSlice";
import ToggleModal from "./modal";
import { getDisease, SelectedDisease } from "./Calls"; 
const Problem = () => {
  const [state, setState] = useState();
  const navigate = useNavigate();
  const [disease,setDisease]=useState()
  const location=useLocation()
  const dispatch=useDispatch()
  // Access the value of the "id" parameter

const handleBack=()=>{
  navigate("/location")

}
const handleNext= async(e)=>{
await SelectedDisease(e)
navigate("/doctor")

}
const handleNextPage=async()=>{
const v=await getDisease()

if(v){
  navigate("/doctor",{state:location.state})
}else{
  dispatch(modalShow("Disease"))
}

}
const activeFunction=async()=>{
  const v=await getDisease()
  console.log(v)
  setDisease(v)
}

useEffect(()=>{
activeFunction()
},[])
  return (
    <MDBContainer fluid className="backall backall1">
      <MDBContainer>
        <MDBRow
          className=" d-flex justify-content-evenly"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-duration="1000"
        >
          {/* <h5 className="text-center mt-5">
            TO BEGIN, PLEASE SELECT THE IMAGE THAT BEST DESCRIBES YOUR HEALTH
            PROBLEM.
          </h5> */}

          <h3 className="text-center mt-5">Select Problem</h3>
          <MDBRow>
            <MDBCol size="md-4" className="mt-3 text-center ">
              <MDBCard  onClick={(e)=>handleNext("Neurologist",e)}>
                <MDBRow className={disease==="Neurologist"?`g-0 active`:"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://img.freepik.com/premium-vector/neurosurgeon-neurologist-examine-brain-doctor-pointing-medical-signboard-board-with-human-brain-physician-scientist-teaching-about-alzheimer-dementia-disease-mental-neurology-sickness_458444-222.jpg?w=2000"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold  mt-3">
                        Brain Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
              <MDBCard onClick={()=>handleNext("ENT")}>
                <MDBRow className={disease==="ENT"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://thumbs.dreamstime.com/b/otolaryngology-icon-set-flat-style-doctor-treating-ear-throat-nose-ent-collection-design-elements-isolated-white-background-102443270.jpg"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">                      
                        ENT Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center nepre">
            <MDBCard onClick={()=>handleNext("Dermatologist")}>
                <MDBRow className={disease==="Dermatologist"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://img.freepik.com/free-vector/cosmetologist-concept-skin-care-treatment-young-woman-treating-skin-cosmetic-procedure-problematic-skin-beauty-plastic-treatment-isolated-vector-illustration_613284-3213.jpg"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Skin Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            
          </MDBRow>
          <MDBRow>
          <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={()=>handleNext("cardiologist")}>
                <MDBRow className={disease==="cardiologist"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://static.vecteezy.com/system/resources/thumbnails/005/661/856/small/cardiologists-doctor-pointing-at-heart-diagram-free-vector.jpg"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Heart Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={()=>handleNext("Otolaryngologists")}>
                <MDBRow className={disease==="Otolaryngologists"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://img.freepik.com/free-vector/tiny-doctors-treating-examining-patients-ear-using-otology-tool-carrying-bottles-blisters-with-pills-vector-illustration-otolaryngology-health-care-hearing-loss-concept_74855-13256.jpg"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Ear Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={()=>handleNext("orthopedic")}>
                <MDBRow className={disease==="orthopedic"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWomseA6RiIP70GFCOKvcfIE6gn_l6D00DA&usqp=CAU"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Bone Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
             </MDBRow>
             <MDBRow>
             <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={()=>handleNext("Psychiatrist")}>
                <MDBRow className={disease==="Psychiatrist"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://img.freepik.com/free-vector/trance-effect-woman-during-session-hypnosis-therapy-isolated-flat-vector-illustration-abstract-psychedelic-whirlpool-chatelaine-watch-altered-state-mind-unconsciousness-concept_74855-10179.jpg?w=360"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Depression
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={()=>handleNext("users")}>
                <MDBRow className={disease==="users"?"g-0 active":"g-0"}>
                  <MDBCol md="4">
                    <MDBCardImage
                      src="https://static.vecteezy.com/system/resources/previews/004/578/683/original/a-patient-consults-a-doctor-and-nurse-free-vector.jpg"
                      alt="..."
                      height="100px"
                      width="100px"
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="fw-bold mt-3">
                          Other Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                      
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
            </MDBCol>
         
             </MDBRow>
        </MDBRow>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="buttheme me-2 mt-3 NePreBtn"
            onClick={()=>handleBack()}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3 NePreBtn"
            onClick={()=>handleNextPage()}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
      <ToggleModal/>
    </MDBContainer>
  );
};

export default Problem;
