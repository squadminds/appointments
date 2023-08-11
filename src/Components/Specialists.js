import React, { useEffect, useState, useRef } from "react";
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
import { modalShow } from "../redux/HealthSlice";
import ToggleModal from "./Modal";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

const Doctor = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);
  const [totalPage, setTotalPage] = useState([]);

  const mainDivRef = useRef();

  const handleActive = (user) => {
    localStorage.setItem("Doctor", user.id);
    navigate("/slot");
  };

  const greetUser = async () => {
    if (localStorage.getItem("Doctor")) {
      navigate("/slot");
    } else {
      dispatch(modalShow("Specilists Needed"));
    }
  };
  function Back() {
    navigate("/problem");
    localStorage.removeItem("countryRef");
  }
  const handleBack = () => {
    navigate("/problem");
    setShow(true);
    localStorage.removeItem("countryRef");
  };

  const handleSearchFilter = (e) => {
    const query = e.target.value;
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
    try {
      const Diseasedata = await getDoc(
        doc(db, "DiseaseList", localStorage.getItem("DiseaseRef"))
      );
      const Locationdata = await getDoc(
        doc(db, "Locations", localStorage.getItem("countryRef"))
      );

      if (Diseasedata.exists && Locationdata.exists) {
        const Disease = Diseasedata.data().name;
        const Location = Locationdata.data().name;

        if (Disease) {
          const q = query(
            collection(db, "DoctorList"),
            where("specilist", "==", Disease),
            where("Location", "==", Location)
          );
          const doctors = await getDocs(q);
          if (!doctors.empty) {
            const dat = [];
            doctors.forEach((doc) => {
              dat.push({ id: doc.id, doctor: doc.data() });
            });

            setFilteredUsers(dat);
            setUser(dat);
          } else {
            setShow(false);
          }
        }
      }
    } catch (e) {}
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const cindex = currentIndex - 4;
      setCurrentIndex(cindex);
      const lIndex = lastIndex - 4;
      setLastIndex(lIndex);
    } else {
      dispatch(modalShow("Previous"));
    }
  };
  const handleNext = () => {
    if (lastIndex < filteredUsers.length) {
      const cindex = currentIndex + 4;
      setCurrentIndex(cindex);
      const lIndex = lastIndex + 4;
      setLastIndex(lIndex);
    } else {
      dispatch(modalShow("Next"));
    }
  };

  useEffect(() => {
    mainDivRef.current.focus();
    fetchDoctorList();
  }, []);

  useEffect(() => {
    const totalLength = filteredUsers.length;
    const total = Array.from(
      { length: Math.ceil(totalLength / 4) },
      (x, i) => i + 1
    );
    setTotalPage(total);
  }, [filteredUsers]);

  return (
    <MDBContainer
      fluid
      className="backall"
      ref={mainDivRef}
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" ? greetUser() : "")}
    >
      {show ? (
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
                {filteredUsers
                  ?.slice(currentIndex, lastIndex)
                  .map((user, i) => (
                    <MDBCol key={i} size="md-6" className="text-center mt-3 ">
                      <MDBCard>
                        <MDBRow
                          onClick={() => handleActive(user)}
                          className={
                            localStorage.getItem("Doctor") === user.id
                              ? "g-0 active"
                              : "g-0"
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
                            <MDBCardBody>
                              <MDBCardTitle className={"fw-bold"}>
                                {user.doctor.specilist}
                              </MDBCardTitle>
                              <hr
                                className="w-50"
                                style={{ marginLeft: "25%" }}
                              />
                              <MDBCardText
                                className={
                                  localStorage.getItem("Doctor") === user.id
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
                  <span style={{ color: "brown" }}> PreviousPage</span>
                </MDBPaginationLink>
              </MDBPaginationItem>
              <div>
                {totalPage.map((x) => {
                  return (
                    <MDBPaginationItem key={x} className="mx-3 mt-1">
                      <span
                        className={lastIndex / 4 === x ? "activePage" : "page"}
                      >
                        {x}
                      </span>
                    </MDBPaginationItem>
                  );
                })}
              </div>
              <MDBPaginationItem>
                <MDBPaginationLink className="pagination" onClick={handleNext}>
                  <span style={{ color: "brown"  }}>NextPage</span>
                </MDBPaginationLink>
              </MDBPaginationItem>
            </MDBPagination>
          </MDBRow>
          <div
            className={
              "form__item button__items d-flex justify-content-between"
            }
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
      ) : (
        <MDBContainer>
          <MDBRow>
            <div className="d-flex justify-content-center  mt-5">
              <h3 className="text-center mt-5">
                Sorry No Doctor Available For this Disease In that area
              </h3>
            </div>
          </MDBRow>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3 NePreBtn"
            onClick={() => handleBack()}
          >
            Go Back
          </MDBBtn>
        </MDBContainer>
      )}
      <ToggleModal />
    </MDBContainer>
  );
};
export default Doctor;
