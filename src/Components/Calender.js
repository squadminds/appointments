import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ScheduleMeeting } from "react-schedule-meeting";
import { useNavigate } from "react-router-dom";

const DateSlot = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/slot");
  }
  function ProblemList() {
    navigate("/info");
  }

  const availableTimeslots = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

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
      <MDBContainer
        fluid
        className="backall"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        {" "}
        <MDBContainer fluid className="backall">
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <ScheduleMeeting
                  borderRadius={10}
                  primaryColor="#3F5B85"
                  className="mt-5"
                  eventDurationInMinutes={30}
                  availableTimeslots={availableTimeslots}
                  onStartTimeSelect={console.log}
                />
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
      </MDBContainer>
    </>
  );
};

export default DateSlot;
