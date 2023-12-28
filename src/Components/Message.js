import React, { useRef, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";
const Message = () => {
  const navigate = useNavigate();

  const mainDiv = useRef(null);
  const greetUser = () => {
    navigate("/formReview");
  };
  useEffect(() => {
    mainDiv.current.focus();
  }, []);
  // const goToInfo = () => {
  //   localStorage.getItem("user");
  //   navigate("/info");
  // };
  return (
    <Container
    fluid
    maxWidth
    ref={mainDiv}
    tabIndex={1}
    onKeyDown={(e) => (e.key === "Enter" ? greetUser() : "")}
    className="backall d-flex align-items-center justify-content-center p-0"
  >
   <Grid container>
        <Grid item xs={12} className="text-center">
        
          <Typography variant="h5">
              Your information has been submitted successfully.
              <br />
              We will review and be in touch soon.
            </Typography>
            <Grid container justifyContent="center">
            <Grid item>
            <img
              src="assest/banner.png"
              alt="Hospital Confirmation"
              className="thnkimgs"
            />
          </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="mt-3 text-dark text-center">
          <Typography variant="h5">
            Thank you for completing the assessment.
            <br />
            We appreciate your time and honesty.
          </Typography>
        </Grid>
        <Grid item xs={12} className="mt-3">
          
            <div
              className={
                "form__item button__items d-flex justify-content-center"
              }
            >
              <Button
                type={"primary"}
                className="buttheme mt-3 text-light"
                onClick={() => greetUser()}
              >
                View Receipt
              </Button>
            </div>
      
        </Grid>
      </Grid>
  </Container>
  
  );
};

export default Message;
