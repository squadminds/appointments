import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  modalShow,
  BookAppointment,
  SelectedDisease,
  setShowSlot,
} from "../redux/HealthSlice";
import { useNavigate } from "react-router-dom";
import { BsFillForwardFill } from "react-icons/bs";
import { ImArrowLeft } from "react-icons/im";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import Aos from "aos";
import "aos/dist/aos.css";
import { Grid, Button, Container, Typography } from "@mui/material";
function TimeSlots() {
  const ActiveDate = useSelector(
    (state) => state.HealthReducer.appointment.date
  );
  const ActiveSlot = useSelector(
    (state) => state.HealthReducer.appointment?.TimeSlot
  );

  const show = useSelector((state) => state.HealthReducer.showSlot);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const currentIndex = useRef(0);
  const lastIndex = useRef(5);
  const mainDiv = useRef(null);
  const [dates, setDates] = useState();
  const navigate = useNavigate();
  const [previousDates, setPreviousDates] = useState([]);
  const Disease = useSelector((state) => state.HealthReducer.DiseaseType);

  const fetchDoctor = async () => {
    try {
      let currentDoctor = await getDoc(
        doc(db, "DoctorList", localStorage.getItem("Doctor"))
      );
      if (currentDoctor.exists) {
        const q = query(
          collection(db, "Appointment"),
          where("Doctor", "==", doc(db, "DoctorList", currentDoctor.id))
        );

        const querySnapshot = await getDocs(q);

        const data = [];

        querySnapshot.docs.map((val) => {
          if (data.some((item) => item["date"] === val.data().Date)) {
            const ind = data.findIndex(
              (item) => item["date"] === val.data().Date
            );

            return data[ind].Slots.push(val.data().Time);
          } else {
            return data.push({
              id: val.id,
              date: val.data().Date,
              Slots: [val.data().Time],
            });
          }
        });

        setPreviousDates(data);
      }
    } catch (e) {}
  };

  const greetUser = async (e) => {
    const date = e.target.id;
    const TimeSlot = e.target.innerText;

    if (TimeSlot !== "NOT-AVAILABLE") {
      localStorage.setItem("date", date);
      localStorage.setItem("time", TimeSlot);

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
      setErrorMessage("Please Select a TimeSlot first");
    }
  };

  const dateSlot = useCallback(async () => {
    const currentDate = new Date();
    let datesSelected = [];
    let i = 0;
    while (i < 10) {
      let futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);
      datesSelected.push({
        date: `${futureDate.getDate()}-${
          futureDate.getMonth() + 1
        }-${futureDate.getFullYear()}`,
        Slots: "",
      });
      i++;
    }

    if (datesSelected.length > 8) {
      const dat = await getDoc(
        doc(db, "DoctorList", localStorage.getItem("Doctor"))
      );

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
                    array2SlotsMap[item.date].some(
                      (slot2) => `${slot.startTime}-${slot.endTime}` === slot2
                    )
                  ) {
                    return Object.assign({}, slot, {
                      startTime: "NOT",
                      endTime: "AVAILABLE",
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
        }
      }
    }
  }, [previousDates]);
  const handlePrevious = () => {
    dispatch(setShowSlot(false));
    currentIndex.current = 0;
    lastIndex.current = 5;
  };
  const handleOther = () => {
    dispatch(setShowSlot(true));
    currentIndex.current = 5;
    lastIndex.current = 10;
  };
  useEffect(() => {
    fetchDoctor();

    mainDiv.current.focus();
  }, []);

  useEffect(() => {
    dateSlot();
  }, [dateSlot]);
  useEffect(() => {
    if (show === false) {
      currentIndex.current = 0;
      lastIndex.current = 5;
    } else {
      currentIndex.current = 5;
      lastIndex.current = 10;
    }
  }, [show]);
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
  }, []);
  return (
    <Container
      className="backaslot p-0"
      maxWidth
      ref={mainDiv}
      tabIndex={1}
      onKeyDown={(e) => (e.key === "Enter" ? handleNext() : "")}
    >
      <Container
        data-aos="fade-up"
        data-aos-offset="0"
        data-aos-duration="2000"
      >
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" className=" text-center mx-auto mt-5">
              Select preferred Time
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          {show === true && (
            <Grid item md={2} className="mt-5">
              <Button
                className={"glassbut Day fw-bold me-5"}
                onClick={() => handlePrevious()}
              >
                <ImArrowLeft color="brown" size="30" />
                {"Previous Time-Slots"}
              </Button>
            </Grid>
            
          )}
          {dates
            ?.slice(currentIndex.current, lastIndex.current)
            ?.map((val, ind) => {
              return (
                <Grid key={ind} item className="mt-5">
                  <Button
                    name={val.date}
                    style={{width:"90%"}}
                    className={
                      localStorage.getItem("date") === val.date
                        ? "glassbut activeDay fw-bold me-3"
                        : "glassbut Day fw-bold me-3"
                    }
                  >
                    {val.date}
                  </Button>
                  <Grid container direction="column" spacing={1}>
                    {val.Slots?.map((item, i) => {
                      return (
                        <Grid item key={i}>
                          <Button
                            id={val.date}
                            key={i}
                            fullwidth
                            className={
                              localStorage.getItem("date") === val.date &&
                              localStorage.getItem("time") ===
                                `${item.startTime}-${item.endTime}`
                                ? "me-3 activeSlot mt-3 fw-bold"
                                : `${item.startTime}-${item.endTime}` ===
                                  "NOT-AVAILABLE"
                                ? "me-3 notAvaialble mt-3 fw-bold"
                                : "me-3 timeSlot mt-3 fw-bold"
                            }
                            onClick={(e) => greetUser(e)}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {`${val.Slots[i].startTime}-${val.Slots[i].endTime}`}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })}

          {show === false && (
            <Grid item md={2} className="mt-5">
              <Button
                className={"glassbut Day fw-bold me-3"}
                onClick={() => handleOther()}
              >
                {"Next Time-Slots"}
                <BsFillForwardFill color="brown" size="30" />
              </Button>
            </Grid>
          )}
        </Grid>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <Button
            type={"default"}
            className=" buttheme me-2 mt-3  text-light"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type={"danger"}
            className="  buttheme mt-3  text-light"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </Container>
    </Container>
  );
}

export default TimeSlots;
