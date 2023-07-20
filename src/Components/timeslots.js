import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import { MDBDatePickerV5 } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import {
  modalShow,
  BookAppointment,
  selectedDate,
  SelectedDisease,
  setShowSlot,
} from "../redux/HealthSlice";
import ToggleModal from "./modal";
import { useNavigate } from "react-router-dom";
import { BsFillForwardFill } from "react-icons/bs";
import { ImArrowLeft } from "react-icons/im";
import {
  getDoc,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
function Timeslots() {
  const ActiveDate = useSelector(
    (state) => state.HealthReducer.appointment.date
  );
  const ActiveSlot = useSelector(
    (state) => state.HealthReducer.appointment?.TimeSlot
  );

  const show = useSelector((state) => state.HealthReducer.showSlot);
  const currentDate = new Date();
  const dispatch = useDispatch();
  const currentIndex = useRef(0);
  const lastIndex = useRef(5);
  const [selectedSlot, setSelectedSlot] = useState();
  const [dates, setDates] = useState();
  const navigate = useNavigate();
  const Disease = useSelector((state) => state.HealthReducer.DiseaseType);

  const fetchDoctor = async () => {
    //need to fix else quota reach limited
    // try {
    //   let currentDoctor = await getDoc(
    //     doc(db, "Appointment", localStorage.getItem("reference"))
    //   );
    //   if (currentDoctor.exists) {
    //     const q = query(
    //       collection(db, "Appointment"),
    //       where("doctor", "==", doc(db, currentDoctor.data().doctor.path))
    //     );
    //     const dat = await getDocs(q);
    //     let references = [];
    //     dat.forEach((doc) => {
    //       references.push(doc.id);
    //     });
    //     if (references) {
    //    references.forEach(async (val) => {
    //        const data=await getDoc(doc(db, "Appointment", val));
    //         if (data.exists) {
    //          var filteredDate = dates?.map((val) => {
    //             if (val.day === data.data().date) {
    //               return {
    //                 day: data.data().date,
    //                 Slots: val.Slots?.filter(
    //                   (v) => v.startTime + "-" + v.endTime !== data.data().day
    //                 ),
    //               };
    //             } else {
    //               return val;
    //             }

    //           });

            
    //         }
    //         setDates(filteredDate)
    //       })
    //     console.log("object",dat)
    //     }
    //   }
    // } catch (e) {
    //   console.log("object", e);
    // }
  };
  const greetUser = async (e) => {
    const date = e.target.id;
    const TimeSlot = e.target.innerText;
    localStorage.setItem("time", TimeSlot);
    localStorage.setItem("date", date);
    try {
      const ref = localStorage.getItem("reference");
      await updateDoc(doc(db, "Appointment", ref), {
        date: date,
        day: TimeSlot,
      });
    } catch (e) {
      console.log("object", e);
    }

    dispatch(BookAppointment({ date, TimeSlot }));
    navigate("/info");
  };

  const handleBack = () => {
    navigate("/doctor");
    dispatch(SelectedDisease(Disease));
  };
  const handleNext = () => {
    if (ActiveDate && ActiveSlot) {
      navigate("/info");
    } else {
      dispatch(modalShow("Select Slot"));
    }
  };
  const handleOther = () => {
    currentIndex.current = lastIndex.current;
    lastIndex.current = 10;
    dispatch(setShowSlot(true));
  };
  const handlePrevious = () => {
    currentIndex.current = 0;
    lastIndex.current = 5;
    dispatch(setShowSlot(false));
  };

  const dateSlot = async () => {
    let datesSelected = [];
    let i = 0;
    while (i < 10) {
      let futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);
      datesSelected.push({
        day: `${futureDate.getDate()}-${futureDate.getMonth()}-${futureDate.getFullYear()}`,
        Slots: "",
      });
      i++;
    }

    if (datesSelected.length > 8) {
      const ref = localStorage.getItem("reference");
      const value = await getDoc(doc(db, "Appointment", ref));
      if (value.exists) {
        const val = value.data().doctor;

        const dat = await getDoc(doc(db, val.path));

        let daySlots = [];

        if (!dat.empty) {
          const start = new Date();
          start.setHours(9, 0, 0);
          const end = new Date();
          end.setHours(18, 0, 0);
          const slotDuration = dat.data().Duration * 60 * 1000;
          let currentTime = start;
          while (currentTime <= end) {
            const slotStartTime = currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            currentTime.setTime(currentTime.getTime() + slotDuration);
            const slotEndTime = currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            daySlots.push({
              startTime: slotStartTime,
              endTime: slotEndTime,
            });
          }
        }
        if (daySlots.length > 2) {
          const select = datesSelected?.map((val) => {
            return Object.assign({}, val, {
              day: val.day,
              Slots: daySlots,
            });
          });
          setDates(select);
        }
      }
    }
  };

  useEffect(() => {
    dateSlot();
  }, []);
  useEffect(() => {
    fetchDoctor();
  }, [dates]);
  return (
    <MDBContainer fluid className="backaslot">
      <ToggleModal />
      <MDBContainer>
        <MDBRow>
          <h3 className=" mt-3 text-center mx-auto">Select preferred Time</h3>
        </MDBRow>
        <MDBRow>
          {show === true && (
            <MDBCol size="md-2" className="mt-5">
              <MDBBtn
                className={"glassbut Day fw-bold me-3"}
                onClick={() => handlePrevious()}
              >
                <ImArrowLeft color="brown" size="50" />
                {"...Previous"}
              </MDBBtn>
            </MDBCol>
          )}
          {dates?.slice(currentIndex.current, lastIndex.current)
            .map((val, ind) => {
              return (
                <MDBCol size={"md-2"} className="mt-5">
                  <MDBBtn
                    name={val.day}
                    className={
                      localStorage.getItem("date") === val.day
                        ? "glassbut activeDay fw-bold me-3"
                        : "glassbut Day fw-bold me-3"
                    }
                  >
                    {val.day}
                  </MDBBtn>

                  {val &&
                    val.Slots?.map((item, i) => {
                      return (
                        <MDBBtn
                          id={val.day}
                          className={
                            localStorage.getItem("date") === val.day &&
                            localStorage.getItem("time") ===
                              `${item.startTime}-${item.endTime}`
                              ? "me-5 activeSlot mt-3 fw-bold"
                              : "me-5 timeSlot mt-3 fw-bold"
                          }
                          onClick={(e) => greetUser(e)}
                        >
                          {" "}
                          {`${item.startTime}-${item.endTime}`}
                        </MDBBtn>
                      );
                    })}
                  <MDBRow></MDBRow>
                </MDBCol>
              );
            })}

          {show === false && (
            <MDBCol size="md-2" className="mt-5">
              <MDBBtn
                className={"glassbut Day fw-bold me-3"}
                onClick={() => handleOther()}
              >
                {"...Select Other"}
                <BsFillForwardFill color="brown" size="50" />
              </MDBBtn>
            </MDBCol>
          )}
        </MDBRow>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="NePreBtn buttheme me-2 mt-3"
            onClick={handleBack}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"danger"}
            className=" NePreBtn buttheme mt-3"
            onClick={handleNext}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBContainer>
  );
}

export default Timeslots;
