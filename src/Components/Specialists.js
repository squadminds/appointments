import React, { useEffect, useState, useRef } from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDoctorPage } from "../redux/HealthSlice";
import {
  Grid,
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Pagination,
  PaginationItem,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
const Doctor = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);
  const [totalPage, setTotalPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainDivRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const selectedDoctor = useSelector(
    (state) => state.HealthReducer.selectedDoctor
  );
  const selectedDoctorPage = useSelector(
    (state) => state.HealthReducer.selectedDoctorPage
  );
  const handleActive = (user) => {
    const doctorId = user.id;
    localStorage.setItem("Doctor", doctorId);
    navigate("/slot");
  };

  useEffect(() => {
    if (selectedDoctorPage) {
      dispatch(setSelectedDoctorPage(selectedDoctorPage));
      console.log("text", dispatch(setSelectedDoctorPage(selectedDoctorPage)));
    }
  }, [selectedDoctorPage, dispatch]);
  const greetUser = async () => {
    if (localStorage.getItem("Doctor")) {
      navigate("/slot");
      dispatch(setSelectedDoctorPage(selectedDoctorPage));
    } else {
      setErrorMessage("Please Select A Specialist To Proceed.");
    }
  };
  function Back() {
    navigate("/location");
  }
  const handleBack = () => {
    navigate("/location");
    setShow(true);
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
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     const cindex = currentIndex - 4;
  //     setCurrentIndex(cindex);
  //     const lIndex = lastIndex - 4;
  //     setLastIndex(lIndex);
  //   } else {
  //     dispatch(modalShow("Previous"));
  //   }
  // };
  // const handleNext = () => {
  //   if (lastIndex < filteredUsers.length) {
  //     const cindex = currentIndex + 4;
  //     setCurrentIndex(cindex);
  //     const lIndex = lastIndex + 4;
  //     setLastIndex(lIndex);
  //   } else {
  //     dispatch(modalShow("Next"));
  //   }
  // };

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
  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
  }, []);
  return (
    <Container
      fluid
      maxWidth
      className="backall p-0"
      ref={mainDivRef}
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" ? greetUser() : "")}
    >
      {show ? (
        <Container
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-duration="2000"
        >
          <Grid container>
            <Grid item xs={12} md={12} mt={5}>
              <Typography variant="h5" className=" text-center mx-auto mt-5">
                Select Specialists According Your Problem
              </Typography>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <FaSpinner className="fa-spin" size={40} />
                </div>
              ) : (
                <Grid container spacing={2} className="user-list">
                  <Grid item xs={12} md={12}>
                    <div className="d-flex flex-row-reverse mt-3">
                      <div className="searchbar">
                        <form className="d-flex input-group w-auto"  >
                          <TextField
                            type="search"
                            label="Search doctor..."
                            value={searchQuery}
                            onChange={handleSearchFilter}
                            style={{ cursor: "pointer" }}
                          />
                          <Button className="buttheme">
                            <SearchIcon className="text-light" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    className="justify-content-between align-item-center mt-3"
                    style={{ cursor: "pointer" }}
                  >
                    {filteredUsers.length > 0 ? (
                      filteredUsers
                        ?.slice(currentIndex, lastIndex)
                        .map((user, i) => (
                          <Grid
                            key={i}
                            item
                            lg={6}
                            md={12}
                            className="mt-3 text-center"
                          >
                            <Card
                              sx={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Grid
                                container
                                onClick={() => handleActive(user)}
                                className={
                                  localStorage.getItem("Doctor") === user.id
                                    ? "g-0 active"
                                    : "g-0"
                                }
                              >
                                <Grid item xs={12} md={5}>
                                  <CardMedia
                                    component="img"
                                    src={user.doctor.img}
                                    alt={user.doctor.img}
                                    height="100%"
                                    width="100px"
                                  />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  md={7}
                                  className={
                                    localStorage.getItem("Doctor") === user.id
                                      ? "g-0 active"
                                      : "g-0"
                                  }
                                >
                                  <CardContent>
                                    <h6 className="fw-bold mt-3">
                                      <h5 className={"fw-bold"}>
                                        {user.doctor.specilist}
                                      </h5>
                                      <hr
                                        className="w-50"
                                        style={{ marginLeft: "25%" }}
                                      />
                                      <div className="ms-5 "  style={{textAlign:"start"}}> 
                                      <h6
                                        className={
                                          localStorage.getItem("Doctor") ===
                                          user.id
                                            ? "active-text"
                                            : ""
                                        }
                                      >
                                        Name: {user.doctor.firstName}
                                      </h6>
                                      <h6>
                                        Qualification:{" "}
                                        {user.doctor.qualification}
                                      </h6>
                                      <h6>
                                        Contact: {user.doctor.helpline_number}
                                      </h6>
                                      <h6>Location: {user.doctor.Location}</h6>
                                      </div>
                                    </h6>
                                  </CardContent>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                        ))
                    ) : (
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <Typography
                            variant="h5"
                            className="text-center mx-auto mt-5"
                          >
                            {searchQuery
                              ? "No doctors found with the given name"
                              : "Select Specialists According to Your Problem"}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            className="d-flex justify-content-center"
            style={{ marginTop: "32px" }}
          >
            <Stack spacing={2} className="jmb-0 d-flex justify-content-center">
              <Pagination
                count={2}
                variant="outlined"
                color="secondary"
                // hidePrevButton hideNextButton
                renderItem={(item) => (
                  <PaginationItem
                    // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
                onChange={(event, page) => {
                  setCurrentIndex((page - 1) * 4);
                  setLastIndex(page * 4);
                  setSelectedDoctorPage(page);
                }}
              />
            </Stack>
          </Grid>

          <div
            className={
              "form__item button__items d-flex justify-content-between"
            }
          >
            <Button
              type={"default"}
              className="buttheme me-2 mt-3 text-light"
              onClick={Back}
            >
              Back
            </Button>
            <Button
              type={"primary"}
              className="buttheme mt-3 text-light"
              onClick={() => greetUser()}
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
      ) : (
        <Container>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" className="text-center mx-auto mt-5">
                Sorry No Doctor Available For this Disease In that area
              </Typography>
            </Grid>
          </Grid>
          <Button
            type={"primary"}
            className="buttheme mt-3 NePreBtn text-light"
            onClick={() => handleBack()}
          >
            Go Back
          </Button>
        </Container>
      )}
      {selectedDoctor && (
        <div className="mt-3">
          <Typography variant="h6">Selected User:</Typography>
          <pre>{JSON.stringify(selectedDoctor, null, 2)}</pre>
          <Typography variant="h6">
            Selected Page: {selectedDoctorPage}
          </Typography>
          {console.log("use", selectedDoctor, "used", selectedDoctorPage)}
        </div>
      )}
    </Container>
  );
};
export default Doctor;
