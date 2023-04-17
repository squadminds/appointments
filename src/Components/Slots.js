import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Slots = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/info");
  }
  function ProblemList() {
    navigate("/calender");
  }

  function Back() {
    navigate("/doctor");
  }
  //Time Slots
  let intime = "09:00Am-10:00Am";
  let outtime = "03:00Pm-04:00 Pm";
  const [result] = useState([]);
  console.log("Array", result);

  function intervals(startString, endString) {
    var start = moment(startString, "hh:mm a");
    var end = moment(endString, "hh:mm a");
    start.minutes(Math.ceil(start.minutes() / 60) * 60);

    var current = moment(start);

    while (current <= end) {
      if (result.includes(current.format("hh:mm a"))) {
        return null;
      } else {
        result.push(current.format("hh:mm a"));
        current.add(60, "minutes");
      }
    }

    return result;
  }

  intervals(intime, outtime);

  return (
    <MDBContainer fluid className="backall">
    <MDBContainer>
      <MDBRow >
      <h3 className="text-center mt-5">Select Time & Date </h3>
        <MDBCol size="md-3 " className="mt-5">
          <MDBBtn className="glassbut fw-bold me-3"> today </MDBBtn>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                09:00Am - 10:00Am
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                {" "}
                10:00Am - 11:00Am
              </MDBBtn>
            </MDBCol>

            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                11:00Am - 12:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                12:00Pm - 01:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                01:00Pm - 02:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                02:00Pm - 03:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                03:00Pm - 04:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                04:00Pm - 05:00Pm
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>

        <MDBCol size="md-3" className="mt-5">
          <MDBBtn className="glassbut fw-bold me-3"> tomorrow </MDBBtn>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                09:00Am - 10:00Am
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                {" "}
                10:00Am - 11:00Am
              </MDBBtn>
            </MDBCol>

            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                11:00Am - 12:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                12:00Pm - 01:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                01:00Pm - 02:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                02:00Pm - 03:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                03:00Pm - 04:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                04:00Pm - 05:00Pm
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol size="md-3" className="mt-5">
          <MDBBtn className="glassbut fw-bold me-3"> 19/04/2023 </MDBBtn>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                09:00Am - 10:00Am
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                {" "}
                10:00Am - 11:00Am
              </MDBBtn>
            </MDBCol>

            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                11:00Am - 12:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                12:00Pm - 01:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                01:00Pm - 02:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                02:00Pm - 03:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                03:00Pm - 04:00Pm
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={greetUser}
              >
                04:00Pm - 05:00Pm
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol size="md-3" className="mt-5">
          <MDBBtn className="glassbut fw-bold me-3" onClick={ProblemList}>
            {" "}
            Select Other...{" "}
          </MDBBtn>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                className="me-5 mt-3 buttheme1 fw-bold"
                onClick={ProblemList}
              >
                Next Date select
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow></MDBRow>
      <div
        className={"form__item button__items d-flex justify-content-between"}
      >
        <MDBBtn type={"default"} className="buttheme me-2 mt-3" onClick={Back}>
          Back
        </MDBBtn>
        <MDBBtn type={"primary"} className="buttheme mt-3" onClick={greetUser}>
          Next
        </MDBBtn>
      </div>
    </MDBContainer>
    </MDBContainer>
  );
};

export default Slots;
