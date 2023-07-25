import React, { useEffect, useRef, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";

import { useSelector, useDispatch } from "react-redux";
import {
  modalShow,
  BookAppointment,
  SelectedDisease,
  setShowSlot,
} from "../Redux/HealthSlice";
import ToggleModal from "./Modal";
import { useNavigate } from "react-router-dom";
import { BsFillForwardFill } from "react-icons/bs";
import { ImArrowLeft } from "react-icons/im";
import {
  getDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
function TimeSlots() {
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

  const [dates, setDates] = useState();
  const navigate = useNavigate();
  const [previousDates, setPreviousDates] = useState([]);
  const Disease = useSelector((state) => state.HealthReducer.DiseaseType);
  const fetchDoctor = async () => {
    try {
      let currentDoctor = await getDoc(
        doc(db, "Temp", localStorage.getItem("reference"))
      );
      if (currentDoctor.exists) {
        const q = query(
          collection(db, "Appointment"),
          where("doctor", "==", doc(db, currentDoctor.data().doctor.path))
        );

        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.docs.map((val) => {
          if (data.some((item) => item["date"] === val.data().date)) {
            const ind = data.findIndex(
              (item) => item["date"] === val.data().date,
              data
            );

            data[ind].Slots.push(val.data().Slot);
          } else {
            data.push({ date: val.data().date, Slots: [val.data().Slot] });
          }
        });
        setPreviousDates(data);
      }
    } catch (e) {
      console.log("object", e);
    }

    dateSlot();
  };
  const greetUser = async (e) => {
    const date = e.target.id;
    const TimeSlot = e.target.innerText;
   
    localStorage.setItem("date", date);
    localStorage.setItem("time", TimeSlot);
    if (TimeSlot !== "NOT-AVAILABLE") {
      try {
        const ref = localStorage.getItem("reference");
        await updateDoc(doc(db, "Temp", ref), {
          date: date,
          Slot: TimeSlot,
        });
      } catch (e) {
        console.log("object", e);
      }

      dispatch(BookAppointment({ date, TimeSlot }));
      navigate("/info");
    }
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
        date: `${futureDate.getDate()}-${futureDate.getMonth()}-${futureDate.getFullYear()}`,
        Slots: "",
      });
      i++;
    }

    if (datesSelected.length > 8) {
      const ref = localStorage.getItem("reference");
      const value = await getDoc(doc(db, "Temp", ref));
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
          const value = datesSelected.map((val) => {
            return Object.assign({}, val, {
              Slots: daySlots,
            });
          });
          if (value) {
            filterSlots(value);
          }
        }
      }
    }
  };

  const filterSlots = (value) => {
    const array2SlotsMap = {};
    previousDates.forEach((item) => {
      array2SlotsMap[item.date] = item.Slots;
    });

    const filteredArray1 = value.map((item) => {
      if (array2SlotsMap.hasOwnProperty(item.date)) {
        return Object.assign({}, item, {
          date: item.date,
          Slots: item.Slots.map((slot) => {
            if (
              array2SlotsMap[item.date].every(
                (slot2) => `${slot.startTime}-${slot.endTime}` === slot2
              )
            ) {
              return Object.assign({}, slot, {
                startTime: "Not",
                endTime: "Available",
              });
            } else {
              return slot;
            }
          }),
        });
      } else {
        return Object.assign({}, item, {
          date: item.date,
          Slots: item.Slots,
        });
      }
    });
    setDates(filteredArray1);
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

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
          {dates
            ?.slice(currentIndex.current, lastIndex.current)
            ?.map((val, ind) => {
              return (
                <MDBCol key={ind} size={"md-2"} className="mt-5">
                  <MDBBtn
                    name={val.date}
                    className={
                      localStorage.getItem("date") === val.date
                        ? "glassbut activeDay fw-bold me-3"
                        : "glassbut Day fw-bold me-3"
                    }
                  >
                    {val.date}
                  </MDBBtn>

                  {val.Slots?.map((item, i) => {
                    return (
                      <MDBBtn
                        id={val.date}
                        key={i}
                        className={
                          localStorage.getItem("date") === val.date &&
                          localStorage.getItem("time") ===
                            `${item.startTime}-${item.endTime}`
                            ? "me-3 activeSlot mt-3 fw-bold"
                            : `${item.startTime}-${item.endTime}` ===
                              "Not-Available"
                            ? "me-3 notAvaialble mt-3 fw-bold"
                            : "me-3 timeSlot mt-3 fw-bold"
                        }
                        onClick={(e) => greetUser(e)}
                      >
                        {" "}
                        {`${val.Slots[i].startTime}-${val.Slots[i].endTime}`}
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

export default TimeSlots;
