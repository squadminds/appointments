import React, { useState, useRef } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCard,
} from "mdb-react-ui-kit";
import { useReactToPrint } from "react-to-print";

//localstorage data get set

function printPage() {
  window.print();
}
console.log(printPage);

function useLocalStorage(key) {
  const [state, setState] = useState(localStorage.getItem(key));
  function setStorage(item) {
    localStorage.setItem(key, item);
    setState(item);
  }
  return [state, setStorage];
}
const Review = ({ formData, navigation }) => {
  const { name, phone, email } = formData;
  const { go } = navigation;

  const [item, setItem] = useLocalStorage("location");
  const [detailed, setDetailed] = useLocalStorage("details");
  const value = window.localStorage.getItem("Time", "");
  const problem = window.localStorage.getItem("problem", "");
  const other = window.localStorage.getItem("otherProblem", "");
  const [specilist, setSpecilist] = useLocalStorage("Specilist", " ");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <MDBContainer fluid className="backall " ref={componentRef}>
      <MDBRow>
        <MDBContainer>
          <MDBRow className="mt-5">
            <MDBCol className=" text-dark d-flex justify-content-center">
              <h2> Review your data</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol size="md-6" className="mt-3 text-dark">
              <div className="form">
                <MDBCard className="p-5">
                  <div>
                    <h4>
                     <i> Address:</i> <span className="fs-5 me-5"> {item},</span>
                    </h4>
                  </div>
                  <div>
                    <h4>
                      <i>Problem Name:</i>
                      <span className="fs-5 me-5"> {problem},</span>
                      <br /><i> other problem :</i>
                      <span className="fs-5 me-5"> {other},</span> <br />{" "}
                     <i> problem detail :</i>
                      <span className="fs-5 me-5"> {detailed},</span>
                    </h4>
                  </div>
                  <div>
                    <h4>
                      {" "}
                     <i> Specialists:</i>
                      <span className="fs-5 me-5"> {specilist},</span>
                    </h4>
                  </div>
                  <div>
                    <h4>
                      {" "}
                     <i> Time:</i><span className="fs-5 me-5"> {value},</span>
                    </h4>
                  </div>

                  <div>
                    <h4>
                      {" "}
                      <i>First name:</i>{" "}
                      <span className="fs-5 me-5"> {`${name}`},</span>
                    </h4>
                  </div>
                  <div>
                    <h4>
                    <i>  Contact :</i> <span className="fs-5 me-5"> {`${phone}`}</span>
                      <br />
                     <i> E-mail: </i><span className="fs-5 me-5"> {`${email}`}</span>
                    </h4>
                  </div>
                </MDBCard>

              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex justify-content-center">

            <MDBCol size={6}>
              <div
                className={
                  "form__item button__items d-flex justify-content-between"
                }
              >
                {/* <MDBBtn
                   type={"default"}
                   className="buttheme me-2 mt-3"
                   onClick={Back}
                 >
                   Back
                 </MDBBtn> */}
                                 <MDBBtn onClick={handlePrint}                    className="buttheme me-2 mt-3"  >
                  Print
                </MDBBtn>
                <MDBBtn
                  onClick={() => go("submit")}
                  className="buttheme me-2 mt-3"
                >
                  Submit
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBRow>
    </MDBContainer>
  );
};

export default Review;
