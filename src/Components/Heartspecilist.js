import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardSubTitle,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { cardiologist } from "./Data";
import _ from "lodash";

const HeartSpecilist = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/slot");
  }

  function Back() {
    navigate("/problem");
  }

  //doctor api

  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(cardiologist);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(cardiologist, (user) => {
        // localStorage.setItem('Specilist', JSON.stringify(user));
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(user))),
          _.lowerCase(searchValue)
        );
      });
      setFilteredUsers(filter);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  // aos

  useEffect(() => {
    Aos.init({
      duration: 500,
      offset: 100,
    });
    Aos.refresh();
  }, []);

  return (
    <MDBContainer fluid className="backall backall1">
      <MDBContainer>
        {/* <MDBRow> */}
        <MDBRow data-aos="fade-up" data-aos-offset="0">
          <div className="d-flex flex-row-reverse mt-2">
            <div className="searchbar">
              <form className="d-flex input-group w-auto mt-5">
                <MDBInput
                  type="search"
                  label="Search doctor..."
                  value={searchValue}
                  onChange={handleSearchFilter}
                />
                <MDBBtn className="buttheme">
                  <MDBIcon fas icon="search" />
                </MDBBtn>
              </form>
            </div>
          </div>
          {/* <h3 className="text-center mx-auto">Select Heart Specialists</h3> */}

          <MDBRow className="user-list">
            {filteredUsers.slice(0, 6).map((user, i) => (
              <MDBCol size="md-6" className="text-center mt-3">
                <MDBCard onClick={greetUser}>
                  <MDBRow className="g-0" key={user.id}>
                    <MDBCol md="4">
                      <MDBCardImage
                        alt="..."
                        className="groupimgs"
                        src={user.img}
                      />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody>
                        <MDBCardTitle className="fw-bold">
                          {user.specilist}
                        </MDBCardTitle>
                        <hr className="w-50" style={{ marginLeft: "25%" }} />
                        <MDBCardText>
                          Name: {user.firstName}{" "}
                          {localStorage.setItem(
                            "Specilist",
                            JSON.stringify(user.firstName)
                          )}
                        </MDBCardText>
                        <MDBCardText> Skill: {user.qualification}</MDBCardText>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
          {/* </MDBRow> */}
        </MDBRow>
      </MDBContainer>
      {/* <MDBRow
        className="d-flex flex-row-reverse"
        style={{ background: "#eadeda" }}
      >
        <MDBCol size={6}>
          <div className={"form__item button__items d-flex flex-row-reverse"}>
            <MDBBtn
              type={"primary"}
              className="buttheme mt-5"
              onClick={greetUser}
            >
              <MDBIcon fas icon="angle-right" className="fs-2" />
            </MDBBtn>
            <MDBBtn
              type={"default"}
              className="buttheme me-2 mt-5"
              onClick={Back}
            >
              <MDBIcon fas icon="angle-left" className="fs-2" />
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow> */}
    </MDBContainer>
  );
};

export default HeartSpecilist;
