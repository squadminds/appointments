import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";

const ProblemDrop = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/problem");
  }
  function ProblemList() {
    navigate("/doctor");
  }

  const options = [
    { label: "Depression", value: 0 },
    { label: "Allergies ", value: 1 },
    { label: "Food poisoning ", value: 2 },
    { label: "Cold and Flu", value: 3 },
    { label: "Diabetes", value: 4 },
    { label: "Asthma ", value: 6 },
    { label: "Chickenpox ", value: 6 },
    { label: "Other", value: 7 },
  ];
  return (
    <MDBContainer fluid className='backall'>
<MDBContainer>
    <MDBRow>
        <MDBCol>
        <label for="" className="fw-bold  text-dark mt-5">
                      <h4>Describe Your Problem</h4>
                    </label>
                    <Select
                              className="mt-5 dropset fw-bold"
                placeholder='select problem'
        options={options}
        onChange={(value) => console.log(value)} 
      />
          
                    <MDBTextArea
                      id="form7"
                      className="md-textarea form-control mt-5"
                      rows="6"
                      cols="600"
                    ></MDBTextArea> 
                  
        </MDBCol>
    </MDBRow>
    <div
                    className={
                      "form__item button__items d-flex justify-content-between"
                    }
                  >
                    <MDBBtn
                      type={"default"}
                      className="buttheme me-2 mt-3"
                      onClick={greetUser}
                    >
                      Back
                    </MDBBtn>
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-3"
                      onClick={ProblemList}
                    >
                      Next
                    </MDBBtn>
                  </div>
</MDBContainer>
</MDBContainer>
  )
}

export default ProblemDrop;
