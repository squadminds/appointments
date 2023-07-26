import React, { useEffect, useState, useMemo } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { ImNotification } from "react-icons/im";
import { BsCalendarDate } from "react-icons/bs";
import { modalShow, selectedDate } from "../Redux/HealthSlice";
export default function ToggleModal() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState();
  const modalTitle = useSelector((state) => state.HealthReducer.ModalTitle);
  const content = useMemo(() => {
    if (modalTitle === "Specilists Needed") {
      return "Speclist Need To Be Selected";
    } else if (modalTitle === "Country Needed") {
      return "Select a Country First";
    } else if (modalTitle === "Disease") {
      return "Please Select a Desease First";
    } else if (modalTitle === "Location") {
      return "Location is required";
    } else if (modalTitle === "Error Location") {
      return "Location Is Not  Available";
    } else if (modalTitle === "Error Code") {
      return "Code Doesn't Exist";
    } else if (modalTitle === "Select Date") {
      setShow(true);
      return "select your Date";
    } else if (modalTitle === "Select Slot") {
      return "Please Select a TimeSlot first";
    } else if (modalTitle === "Contact Needed") {
      return "Please Enter Your Name";
    } else if (modalTitle === "Invalid Email Address") {
      return "The Address You Entered is Not Available";
    }  else if (modalTitle === "Name Should contains Alphabets") {
      return "Name Should Only Contains Alphabets";
    }
    
    else {
      return "";
    }
  }, [modalTitle]);

  const handleSave = () => {
    dispatch(selectedDate(selectedDay));
    dispatch(modalShow(""));
  };
  useEffect(() => {
    if (modalTitle !== "") {
      setShow(true);
    } else if (modalTitle === "") {
      setShow(false);
    }
  }, [modalTitle]);

  return (
    <>
      <MDBModal show={show}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              {modalTitle === "Select Date" ? (
                <MDBModalTitle style={{ color: "brown" }}>
                  <BsCalendarDate />
                  <span style={{ marginLeft: "10px" }}>{modalTitle}</span>
                </MDBModalTitle>
              ) : (
                <MDBModalTitle style={{ color: "red" }}>
                  <ImNotification color={"red"} />
                  <span style={{ marginLeft: "10px" }}>{modalTitle}</span>
                </MDBModalTitle>
              )}
            </MDBModalHeader>
            {modalTitle !== "Select Date" ? (
              <MDBModalBody style={{ color: "Black" }}>
                <span style={{ color: "black" }}>{content}</span>{" "}
              </MDBModalBody>
            ) : (
              <MDBModalBody>
                <span>
                  {modalTitle === "Select Date" && (
                    <MDBInput
                      type="date"
                      onChange={(e) => setSelectedDay(e.target.value)}
                    />
                  )}
                </span>
              </MDBModalBody>
            )}

            <MDBModalFooter>
              <MDBBtn
                className="cancelBtn"
                onClick={() => dispatch(modalShow(""))}
              >
                Cancel
              </MDBBtn>
              {modalTitle === "Select Date" && (
                <MDBBtn className="saveBtn" onClick={() => handleSave()}>
                  save
                </MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
