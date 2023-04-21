import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
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

  // aos

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    Aos.refresh();
  }, []);

  return (
    <>
      {/* <MDBContainer
        fluid
        className="backall"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        {" "} */}
      <MDBContainer fluid className="backall backall1">
        <MDBContainer>
          <MDBRow
            className=""
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            <h3 className="text-center mt-4">Select Time & Date </h3>
            {/* <hr/> */}
            <MDBCol size="md-3 " className="mt-5">
              <MDBBtn className="glassbut fw-bold me-3"> today </MDBBtn>
              <MDBRow
                onChange={(e) =>
                  window.localStorage.setItem("Time", e.target.value)
                }
              >
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 09:00Am - 10:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    09:00Am - 10:00Am
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 10:00Am- 11:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    {" "}
                    10:00Am - 11:00Am
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "11:00Am - 12:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    11:00Am - 12:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 12:00Pm- 01:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    12:00Pm - 01:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "01:00Pm - 02:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    01:00Pm - 02:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "02:00pm - 03:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    02:00Pm - 03:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "03:00Pm - 04:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    03:00Pm - 04:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "04:00Pm - 05:00Pm")
                  }
                >
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
              <MDBRow
                onChange={(e) =>
                  window.localStorage.setItem("Time", e.target.value)
                }
              >
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 09:00Am - 10:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    09:00Am - 10:00Am
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 10:00Am- 11:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    {" "}
                    10:00Am - 11:00Am
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "11:00Am - 12:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    11:00Am - 12:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 12:00Pm- 01:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    12:00Pm - 01:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "01:00Pm - 02:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    01:00Pm - 02:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "02:00pm - 03:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    02:00Pm - 03:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "03:00Pm - 04:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    03:00Pm - 04:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "04:00Pm - 05:00Pm")
                  }
                >
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
              <MDBBtn className="glassbut fw-bold me-3"> 22/04/2023 </MDBBtn>
              <MDBRow
                onChange={(e) =>
                  window.localStorage.setItem("Time", e.target.value)
                }
              >
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 09:00Am - 10:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    09:00Am - 10:00Am
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 10:00Am- 11:00Am")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    {" "}
                    10:00Am - 11:00Am
                  </MDBBtn>
                </MDBCol>

                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "11:00Am - 12:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    11:00Am - 12:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", " 12:00Pm- 01:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    12:00Pm - 01:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "01:00Pm - 02:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    01:00Pm - 02:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "02:00pm - 03:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    02:00Pm - 03:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "03:00Pm - 04:00Pm")
                  }
                >
                  <MDBBtn
                    className="me-5 mt-3 buttheme1 fw-bold"
                    onClick={greetUser}
                  >
                    03:00Pm - 04:00Pm
                  </MDBBtn>
                </MDBCol>
                <MDBCol
                  onClick={() =>
                    window.localStorage.setItem("Time", "04:00Pm - 05:00Pm")
                  }
                >
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
          {/* <MDBRow></MDBRow> */}
        </MDBContainer>
        {/* <MDBRow
          className="d-flex flex-row-reverse"
          style={{ background: "#eadeda" }}
        >
          <MDBCol size={6}>
            <div className={"form__item button__items d-flex flex-row-reverse"}>
              <MDBBtn
                type={"primary"}
                className="buttheme mt-5"
                onClick={greetUser}
              >
                <MDBIcon fas icon="angle-right" className="fs-2" />
              </MDBBtn>
              <MDBBtn
                type={"default"}
                className="buttheme me-2 mt-5"
                onClick={Back}
              >
                <MDBIcon fas icon="angle-left" className="fs-2" />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow> */}
      </MDBContainer>
      {/* </MDBContainer> */}
    </>
  );
};

export default Slots;
