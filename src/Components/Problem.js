import React, { useEffect, useState, useRef  } from "react";
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { modalShow } from "../redux/HealthSlice";
const Problem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disease, setDisease] = useState([]);
  const handleBack = () => navigate("/")
    const mainDivRef=useRef(null)
  
  const handleNext = async (e) => {
    localStorage.setItem("DiseaseRef", e);
    navigate("/location");
  };
  const handleNextPage = () => {
 
    if (localStorage.getItem("DiseaseRef")) {
      navigate("/location");
    } else {
      dispatch(modalShow("Disease"));
    }
   
  };
  const fetchDiseaselist = async() => {
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


  useEffect(() => {

   fetchDiseaselist();
 
 },[]);
useEffect(()=>{
  mainDivRef.current.focus()
},[])
  return (
    <MDBContainer
    ref={mainDivRef}
      fluid
      className="backall backall1"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? handleNextPage(e) : "")}
   >
      <MDBContainer>
        <MDBRow
          className="d-flex justify-content-evenly"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-duration="1000"
          sx={{ display:"flex", flexDirection: "row" }}
        >
          <h3 className="text-center mt-5">Select Problem</h3>

          <MDBRow size="lg-4" className="flex  justify-content-between">
            {
              disease?.map((val, i) => {
                return (
         
                    <MDBCol key={i} size="md-4" className="mt-3 text-center">
                      <MDBCard onClick={() => handleNext(val.id)}>
                        <MDBRow
                          className={
                            localStorage.getItem("DiseaseRef") === val.id
                              ? `g-0 active`
                              : "g-0"
                          }
                        >
                          <MDBCol  md="4">
                            <MDBCardImage
                              src={val.data.image}
                              alt="..."
                              height="100px"
                              width="100px"
                            />
                          </MDBCol>
                          <MDBCol md="8">
                            <MDBCardBody>
                              <MDBCardTitle className="fw-bold  mt-3" >
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
 