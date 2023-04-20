import React,{useState} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBTextArea,
  MDBIcon,
} from "mdb-react-ui-kit";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";

const ProblemDrop = () => {
  const [state, setState] = useState();
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

  const changeValue = (e) => {
    if (e.key === "Enter") {
      setState(e.target.value);
      ProblemList();
    }
  };

  return (
    <MDBContainer fluid className="backall">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <label for="" className="fw-bold  text-dark mt-5">
              <h4>Describe Your Problem</h4>
            </label>
            <Select
              className="mt-5 dropset fw-bold"
              placeholder="select problem"
              options={options}
              onChange={(value) => console.log(value)}
              onKeyPress={changeValue}
            />

            <MDBTextArea
              id="form7"
              className="md-textarea form-control mt-5"
              rows="6"
              cols="600"
              onKeyPress={changeValue}
            ></MDBTextArea>
          </MDBCol>
        </MDBRow>
        
      </MDBContainer>
      <MDBRow className="d-flex flex-row-reverse" style={{background:"#eadeda"}}>
                <MDBCol size={6}>
                  <div
                    className={
                      "form__item button__items d-flex flex-row-reverse"
                    }
                  >
                    <MDBBtn
                      type={"primary"}
                      className="buttheme mt-5"
                    onClick={ProblemList}
                      >
<MDBIcon fas icon="angle-right" className="fs-2" />
                    </MDBBtn>
                    <MDBBtn
                      type={"default"}
                      className="buttheme me-2 mt-5"
                      onClick={greetUser} 
                    >
<MDBIcon fas icon="angle-left" className="fs-2" />

                    </MDBBtn>
                   
                  </div>
                </MDBCol>
              </MDBRow>
    </MDBContainer>
  );
};

export default ProblemDrop;
