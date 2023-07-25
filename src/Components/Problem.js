import React, {  useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ToggleModal from "./Modal";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useDispatch } from "react-redux";
import { modalShow } from "../Redux/HealthSlice";
const Problem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disease, setDisease] = useState();
  const [active, setActive] = useState();

  const handleBack = () => {
    navigate("/");
  };
  const handleNext = async (e) => {
    try {
      const ref = localStorage.getItem("reference");
      await updateDoc(doc(db, "Temp", ref), {
        Disease: doc(db, "DiseaseList", e),
      });
    } catch (e) {}
    navigate("/location");
  };
  const handleNextPage = async () => {
    if (active) {
      navigate("/location");
    } else {
      dispatch(modalShow("Disease"));
    }
  };
  const activeFunction = async () => {};
  const fetchDiseaselist = async () => {
    try {
      const DiseaseList = await getDocs(collection(db, "DiseaseList"));
      if (!DiseaseList.empty) {
        const data = DiseaseList.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });

        setDisease(data);
      }
    } catch (e) {
      console.log("object", e);
    }
  };
  const callingDisease = async () => {
    const ref = localStorage.getItem("reference");

    if (ref) {
      const value = await getDoc(doc(db, "Temp", ref));
      if (value.exists) {
        const val = value.data()?.Disease;
        if (val) {
          const dat = await getDoc(doc(db, val.path));

          if (!dat.empty) {
            setActive(dat.data()?.name);
          }
        }
      }
    }
  };
  useEffect(() => {
    if (!disease) {
      fetchDiseaselist();
    }
  }, [disease]);
  useEffect(() => {
    callingDisease();
  }, []);
  return (
    <MDBContainer fluid className="backall backall1">
      <MDBContainer>
        <MDBRow
          className=" d-flex justify-content-evenly"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-duration="1000"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <h3 className="text-center mt-5">Select Problem</h3>

          <MDBRow size="lg-4" className="flex  justify-content-between">
            {disease &&
              disease?.map((val) => {
                return (
                  <MDBCol size="md-4" className="mt-3 text-center">
                    <MDBCard onClick={() => handleNext(val.id)}>
                      <MDBRow
                        className={
                          active === val.data.name ? `g-0 active` : "g-0"
                        }
                      >
                        <MDBCol md="4">
                          <MDBCardImage
                            src="https://img.freepik.com/premium-vector/neurosurgeon-neurologist-examine-brain-doctor-pointing-medical-signboard-board-with-human-brain-physician-scientist-teaching-about-alzheimer-dementia-disease-mental-neurology-sickness_458444-222.jpg?w=2000"
                            alt="..."
                            height="100px"
                            width="100px"
                          />
                        </MDBCol>
                        <MDBCol md="8">
                          <MDBCardBody>
                            <MDBCardTitle className="fw-bold  mt-3">
                              {val.data.name}
                            </MDBCardTitle>
                            <MDBCardTitle></MDBCardTitle>
                          </MDBCardBody>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                );
              })}
          </MDBRow>
        </MDBRow>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="buttheme me-2 mt-3 NePreBtn"
            onClick={() => handleBack()}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3 NePreBtn"
            onClick={() => handleNextPage()}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
      <ToggleModal />
    </MDBContainer>
  );
};

export default Problem;
