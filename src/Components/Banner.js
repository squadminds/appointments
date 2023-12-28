import React, { useEffect, useRef } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles.css";
import { styled } from "@mui/system";
import { NavLink, useNavigate } from "react-router-dom";
import { statusUpdate } from "./Calls";
const StyledCol = styled(Grid)(({ theme }) => ({
  padding: 0,
}));

const StyledImage = styled("img")({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
});
const StyledButton = styled(Button)({
  textDecoration: "none",
});

const Banner = () => {
  const mainDivRef = useRef();
  const navigate = useNavigate();

  const greetUser = () => navigate("/problem");

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    statusUpdate();
    localStorage.clear();
  }, []);
  useEffect(() => {
    mainDivRef.current.focus();
  }, []);
  return (
    <Container
      ref={mainDivRef}
      fluid
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" ? greetUser() : "")}
      maxWidth className="p-0"
    >
       <Grid container>
        <StyledCol item xs={12} md={6}>
          <StyledImage
            src="https://img.freepik.com/free-photo/interior-view-operating-room_1170-2255.jpg?w=2000"
            alt=".."
          />
        </StyledCol>
        <StyledCol item xs={12} md={6} className="back ">
          <div  data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000">
          <Typography
            variant="h4"
            className="text-dark fw-bold texth2"
          >
            Complete this form to
            <span className="text-dark fw-bold"> book an appointment </span>
            with one of our specialists.
          </Typography>
          <Typography
            variant="body1"
            className="text-dark"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-duration="2000"
          >
            Description (optional)
            
          </Typography>
          <StyledButton
            variant="contained"
            className="fw-bold NePreBtn mt-3 justify-content-center"
            color="primary"
            onClick={() => greetUser()}
          >
            Schedule
          </StyledButton>
          </div>
        </StyledCol>
        
      </Grid>
     
    </Container>
  );
};
export default Banner;
