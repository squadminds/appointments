import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Problem = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/doctor");
  }
  function ProblemList() {
    navigate("/dropdownlist");
  }
  function barinsplecilist() {
    navigate("/brainspecilist");
  }

  function Entspecilist() {
    navigate("/ent");
  }
  function Skinspecilist() {
    navigate("/skinspecilist");
  }
  function Bone() {
    navigate("/bone");
  }
  function Back() {
    navigate("/location");
  }
  function Heartspecilist() {
    navigate("/heartspecilist");
  }
  return (
    <MDBContainer fluid className="backall">
      <MDBContainer>
        <MDBRow>
          <h6 className="text-center mt-5">
            TO BEGIN, PLEASE SELECT THE IMAGE THAT BEST DESCRIBES YOUR HEALTH
            PROBLEM.
          </h6>
          <h3 className="text-center mt-5">Select Problem</h3>
          <MDBRow>
            <MDBCol size="md-4" className="mt-3 text-center">
              <MDBCard  onClick={barinsplecilist}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                        Brain Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
              <MDBCard onClick={Entspecilist}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                        ENT Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={Skinspecilist}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Skin Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              
            </MDBCol>
            
          </MDBRow>
          <MDBRow>
          <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={Heartspecilist}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Heart Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={greetUser}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Ear Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
              
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={Bone}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Bone Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
              
            </MDBCol>
             </MDBRow>
             <MDBRow>
             <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={greetUser}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Depression
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard> 
            </MDBCol>
            <MDBCol size="md-4" className="mt-3 text-center">
            <MDBCard onClick={greetUser}>
                <MDBRow className="g-0">
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
                      <MDBCardTitle className="fw-bold">
                        {" "}
                          Other Problem
                      </MDBCardTitle>
                      <MDBCardTitle>
                        <MDBIcon
                          fas
                          icon="long-arrow-alt-right"
                        />
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
      </MDBContainer>
    </MDBContainer>
  );
};

export default Problem;
