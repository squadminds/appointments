import React from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
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
function barinsplecilist (){
  navigate("/brainspecilist")
}

function Entspecilist (){
  navigate("/ent")
}
function Skinspecilist (){
    navigate("/skinspecilist")
  }
  function Back() {
    navigate("/location");
  }
  function Heartspecilist(){
    navigate("/heartspecilist");
  }
  return (
    <MDBContainer fluid className='backall'>
      <MDBContainer>
        <MDBRow>
          <h6 className="text-center mt-5">
            TO BEGIN, PLEASE SELECT THE IMAGE THAT BEST DESCRIBES YOUR HEALTH
            PROBLEM.
          </h6>
          <h3 className="text-center mt-5">Select Problem</h3>
          <MDBRow>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={barinsplecilist}
              >
                Brain Problem
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={Entspecilist}
              >
                ENT Problem
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={Skinspecilist}
              >
                Skin Problem
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={Heartspecilist}
              >
                Heart Problem
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={greetUser}
              >
                Ear Problem
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={greetUser}
              >
                Bone Problem
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={greetUser}
              >
                Depression
              </MDBBtn>
            </MDBCol>
            <MDBCol size="md-3" className="mt-3 text-center">
              <MDBBtn
                outline
                className="fw-bold text-dark glassbut"
                onClick={ProblemList}
              >
Other Problem
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBRow>
        <div
                    className={
                      "form__item button__items d-flex justify-content-between"
                    }
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
