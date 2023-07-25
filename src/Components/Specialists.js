import React, { useEffect, useState } from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalShow } from "../Redux/HealthSlice";
import ToggleModal from "./Modal";
import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

import { setSpecalist } from "./Calls";
const Doctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);
  const today = new Date();
  const currentDate = today.getDate();

  const handleActive = async (user) => {
    const value = await setSpecalist(user);
    navigate("/slot");
  };

  const greetUser = async () => {
    if (active) {
      navigate("/slot");
    } else {
      dispatch(modalShow("Specilists Needed"));
    }
  };
  function Back() {
    navigate("/problem");
  }
  //doctor api

  const handleSearchFilter = (e) => {
    const query = e.target.value;

    console.log("object", e.target.value);
    setSearchQuery(query);
    if (query) {
      const newFilter = filteredUsers.filter((val, i) => {
        return val.doctor.firstName.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredUsers(newFilter);
    } else {
      setFilteredUsers(user);
    }
  };

  const fetchDoctorList = async () => {
    const ref = localStorage.getItem("reference");
    try {
      const value = await getDoc(doc(db, "Temp", ref));
      if (value.exists) {
        const disease = value.data().Disease;
        const Location = value.data().Location;
        const Diseasedata = await getDoc(doc(db, disease.path));
        const Locationdata = await getDoc(doc(db, Location.path));

        if (Diseasedata.exists && Locationdata.exists) {
          const Disease = Diseasedata.data().name;
          const Location = Locationdata.data().name;

          if (Disease !== "Multispecalist") {
            const q = query(
              collection(db, "DoctorList"),
              where("specilist", "==", Disease),
              where("Location", "==", Location)
            );
            const doctors = await getDocs(q);

            const dat = [];
            doctors.forEach((doc) => {
              dat.push({ id: doc.id, doctor: doc.data() });
            });
            if (dat) {
              setFilteredUsers(dat);
              setUser(dat);
            }
          } else {
            const doctors = await getDocs(
              collection(db, "DoctorList"),
              where("Location", "===", Location)
            );
            const dat = [];
            if (!doctors.empty) {
              doctors.forEach((doc) => {
                dat.push({ id: doc.id, doctor: doc.data() });
              });
            }
            setFilteredUsers(dat);
            setUser(dat);
          }
        }
      }
    } catch (e) {}
    if (filteredUsers) {
      callingDoctor();
    }
  };
  const callingDoctor = async () => {
    const ref = localStorage.getItem("reference");
    const value = await getDoc(doc(db, "Temp", ref));
    if (value.exists) {
      const val = value.data().doctor;
      if (val) {
        const data = await getDoc(doc(db, val.path));
        if (!data.empty) {
          setActive(data.data().firstName);
        }
      }
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const cindex = currentIndex - 4;
      setCurrentIndex(cindex);
      const lIndex = lastIndex - 4;
      setLastIndex(lIndex);
    }
  };
  const handleNext = () => {
    console.log("u click me");
    if (currentIndex > 0) {
      const cindex = currentIndex + 4;
      setCurrentIndex(cindex);
      const lIndex = lastIndex + 4;
      setLastIndex(lIndex);
    }
  };

  useEffect(() => {
    fetchDoctorList();
  }, []);

  return (
    <MDBContainer fluid className="backall">
      <MDBContainer>
        <MDBRow>
          <MDBRow>
            <div className="d-flex flex-row-reverse mt-5">
              <div className="searchbar">
                <form className="d-flex input-group w-auto">
                  <MDBInput
                    type="search"
                    label="Search doctor..."
                    value={searchQuery}
                    onChange={handleSearchFilter}
                  />
                  <MDBBtn className="buttheme">
                    <MDBIcon fas icon="search" />
                  </MDBBtn>
                </form>
              </div>
            </div>
            <h3 className="text-center mx-auto">
              Select Specialists According Yor Problem
            </h3>

            <MDBRow className="user-list">
              {filteredUsers?.slice(currentIndex, lastIndex).map((user, i) => (
                <MDBCol key={i} size="md-6" className="text-center mt-3 ">
                  <MDBCard  >
                    <MDBRow
                      onClick={() => handleActive(user)}
                      className={
                        active === user.doctor.firstName ? "g-0 active" : "g-0"
                      }
                      tabIndex="1234"
                      
                    >
                      <MDBCol md="4">
                        <MDBCardImage
                          tabIndex="1234"
                          alt="..."
                          className="groupimgs"
                          src={user.doctor.img}
                        />
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody >
                          <MDBCardTitle className={"fw-bold"}>
                            {user.doctor.specilist}
                          </MDBCardTitle>
                          <hr className="w-50" style={{ marginLeft: "25%" }} />
                          <MDBCardText
                            className={
                              active === user.doctor.firstName
                                ? "active-text"
                                : ""
                            }
                          >
                            Name: {user.doctor.firstName}
                          </MDBCardText>
                          <MDBCardText>
                            Skill: {user.doctor.qualification}
                          </MDBCardText>
                          <MDBCardText>
                            Contact: {user.doctor.helpline_number}
                          </MDBCardText>
                          <MDBCardText>
                            Location: {user.doctor.Location}
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBRow>
        </MDBRow>
        <MDBRow
          className="d-flex justify-content-center"
          style={{ marginTop: "32px" }}
        >
          <MDBPagination className="mb-0 d-flex justify-content-center">
            <MDBPaginationItem>
              <MDBPaginationLink
                className="pagination"
                onClick={handlePrevious}
              >
                Previous
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink
                className="pagination"
                onClick={() => {
                  setCurrentIndex(0);
                  setLastIndex(4);
                }}
              >
                1
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink
                className="pagination"
                onClick={() => {
                  setCurrentIndex(4);
                  setLastIndex(8);
                }}
              >
                2
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink
                className="pagination"
                onClick={() => {
                  setCurrentIndex(8);
                  setLastIndex(12);
                }}
              >
                3
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem>
              <MDBPaginationLink className="pagination" onClick={handleNext}>
                Next
              </MDBPaginationLink>
            </MDBPaginationItem>
          </MDBPagination>
        </MDBRow>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="buttheme me-2 mt-3 NePreBtn"
            onClick={Back}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3 NePreBtn"
            onClick={() => greetUser()}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
      <ToggleModal />
    </MDBContainer>
  );
};
export default Doctor;
