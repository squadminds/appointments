import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import data from "./contents/CountryCodes.json";
import { matchedCountry } from "./Calls";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Button,
  Container,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCol = styled(Grid)(({ theme }) => ({
  padding: 0,
  display: "flex",
  flexDirection: "column",
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
});

const Location = () => {
  const [country, setCountry] = useState("");
  const [val, setVal] = useState("");
  const navigate = useNavigate();
  const mainDiv = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const greetUser = async (e) => {
    if (!country) {
      setErrorMessage("Location Is Not  Available");
      return;
    }
    await matchedCountry(country);

    if (localStorage.getItem("countryRef")) {
      navigate("/doctor");
      setErrorMessage("");
    } else {
      setErrorMessage("Location Is Not  Available");
    }
  };

  const Back = () => navigate("/problem");

  const formik = useFormik({
    initialValues: {
      location: val ? val : "",
    },
    onSubmit: (values) => {
      const str =
        values.location.charAt(0).toUpperCase() + values.location.slice(1);
      setCountry(str);
    },
    validate: (values) => {
      let errors = {};
      if (values.location !== "") errors.location = "Location is required";
      else if (!/^[a-zA-Z\s]+$/.test(data.location))
        errors.location = "Location should only contain alphabets and spaces";
      if (formik.touched.location) {
        setErrorMessage("");
      } else {
        setErrorMessage("");
      }
      const str =
        values.location.charAt(0).toUpperCase() + values.location.slice(1);
      setCountry(str);
      return errors;
    },
  });

  useEffect(() => {
    mainDiv.current.focus();
  }, []);

  const callMe = async () => {
    if (localStorage.getItem("countryRef") !== null) {
      const Locationdata = await getDoc(
        doc(db, "Locations", localStorage.getItem("countryRef"))
      );
      setVal(Locationdata.data().name);
      formik.setFieldValue("location", Locationdata.data().name);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("countryRef")) {
      callMe();
    }
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
  }, []);

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" ? greetUser() : "")}
        ref={mainDiv}
        style={{ outline: "none" }}
      >
        <Container
          maxWidth
          className="text-dark text-center p-0"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container>
            <StyledCol item xs={12} md={6}>
              <StyledImage
                src="https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000"
                alt=".."
              />
            </StyledCol>
            <StyledCol
              item
              xs={12}
              md={6}
              className="backall back text-dark  justify-content-center "
             
            >
              {" "}
              <div
                className="m-5 text-dark  justify-content-center"
                style={{ textAlign: "start" }}
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-duration="2000"
              >
                 <div
              className="m-5 text-dark  justify-content-center"
              style={{ textAlign: "start" }}
              
            >
                <h4>
                 <span style={{color:"rgb(196, 70, 101)"}}>*</span> The Assessment of our partner doctors relies on complete
                  accuracy and <br/> honesty in your answers to the Questions below.
                </h4>

                <h4 className="text-primary mt-3">
                  Currently, we have available doctors in India, Israel,
                  America, England.
                </h4>

                <h4 className="mt-3">
                  What is the name of your country of residence?
                </h4>
                
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ width: "600px" }} mt={5}>
                  <TextField
                    type="text"
                    label="Fill your location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-100 p-2 mb-2 "
                    variant="standard"
                    inputProps={{
                      style: { borderColor: "rgb(196, 70, 101)" },
                    }}
                    InputLabelProps={{
                      style: { color: "rgb(196, 70, 101)" },
                    }}
                  />
                </Box>
                
                <Grid
              container
              spacing={2}
            >
               <Grid item xs={12} md={9} className={"form__item button__items d-flex justify-content-between mt-5"} >
                      <Button
                        variant="outlined"
                        className="buttheme mt-3  text-light"
                        onClick={Back}
                      >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        className="buttheme mt-3  text-light"
                        onClick={(e) => greetUser(e)}
                      >
                        Next
                      </Button>
                      </Grid>
                    </Grid>
                      <Grid container >
                  <Grid item xs={12} md={9}  >
                    {errorMessage && (
                      <div
                        className="alert alert-danger mt-3 d-flex justify-content-start"
                        role="alert"
                      >
                        {errorMessage}
                      </div>
                    )}
                    </Grid>
                    </Grid>
              </form>
              </div>
              </div>
            </StyledCol>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Location;
