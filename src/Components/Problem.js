import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaSpinner } from "react-icons/fa";
const Problem = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disease, setDisease] = useState([]);
  const handleBack = () => navigate("/");
  const [loading, setLoading] = useState(true);
  const mainDivRef = useRef(null);

  const handleNext = async (e) => {
    if (!e) {
      setErrorMessage(
        "Kindly Select A Specialized Category Related To Your Medical Condition."
      );
      return;
    }
    localStorage.setItem("DiseaseRef", e);
    // localStorage.setItem("DiseaseName", disease.find(d => d.id === e)?.data?.name || "");
    setErrorMessage("");
    navigate("/location");
  };
  const handleNextPage = () => {
    if (localStorage.getItem("DiseaseRef")) {
      navigate("/location");
    } else {
      setErrorMessage(
        "Kindly Select A Specialized Category Related To Your Medical Condition."
      );
    }
  };
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    fetchDiseaselist();
  }, []);
  useEffect(() => {
    mainDivRef.current.focus();
  }, []);
  return (
    <Container
      ref={mainDivRef}
      fluid
      maxWidth
      className="backall backall1 d-flex flex-column align-items-center p-0"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? handleNextPage(e) : "")}
    >
      <Container>
        <Grid
          container
          lassName="justify-content-center mt-5 mb-4"
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-duration="1000"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid container>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" className=" text-center mx-auto mt-5">
              Select Problem
              </Typography>
            </Grid>
          </Grid>
          {loading ? (
            <>
              <div style={{ textAlign: "center" }}>
                <FaSpinner className="fa-spin" size={40} />
              </div>
            </>
          ) : (
            <Grid
              container
              spacing={2}
              className="justify-content-between align-item-center mt-5"
              style={{ cursor: "pointer" }}
            >
              {disease?.map((val, i) => {
                return (
                  <Grid key={i} item lg={4} md={6} className="mt-3 text-center" >
                  <Card  onClick={() => handleNext(val.id)} >
                     <Grid container>
                <Grid item md={4}>
                  <CardMedia
                    component="img"
                    src={val.data.image}
                    alt={val.data.name}
                    height="100px"
                    width="100px"
                  />
                </Grid>
                     
                <Grid item md={8} className={
                    localStorage.getItem("DiseaseRef") === val.id
                      ? "g-0 active"
                      : "g-0"
                  }>
                  <CardContent>
                    <Typography variant="h6" className="fw-bold mt-3">
                      {val.data.name}
                    </Typography>
                  </CardContent>
                </Grid>
                 </Grid>
                </Card>
                </Grid>
                );
              })}
            </Grid>
          )}
<Grid
              container
              spacing={2}
              className={"form__item button__items d-flex justify-content-between mt-5 ms-2"}
             
            >
           
              <Button
                type={"default"}
                className="buttheme me-2 mt-3 text-light "
                onClick={() => handleBack()}
              >
                Back
              </Button>
              <Button
                type={"primary"}
                className="buttheme mt-3 text-light"
                onClick={() => handleNextPage()}
              >
                Next
              </Button>
        
            </Grid>
          <Grid className="justify-content-center mt-auto" md={12}>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Problem;