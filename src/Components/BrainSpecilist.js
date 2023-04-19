import React from "react";
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
import { brain } from "./Data";
import _ from "lodash";

const BrainSpecilist = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/slot");
  }

  function Back() {
    navigate("/problem");
  }

  //doctor api

  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(brain);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(brain, (user) => {
        return _.includes(
          _.lowerCase(JSON.stringify(_.values(user))),
          _.lowerCase(searchValue)
        );
      });
      setFilteredUsers(filter);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <MDBContainer fluid className="backall  backall1">
      <MDBContainer>
        <MDBRow>
          <MDBRow>
            <div className="d-flex flex-row-reverse mt-5">
              <div className="searchbar">
                <form className="d-flex input-group w-auto">
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
            <h3 className="text-center mx-auto">Select Brain Specialists</h3>

            <MDBRow className="user-list">
              {filteredUsers.slice(0, 6).map((user, i) => (
                <MDBCol size="md-6 " className="text-center mt-3">
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
                          <MDBCardText>Name: {user.firstName}</MDBCardText>
                          <MDBCardText>
                            {" "}
                            Skill: {user.qualification}
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

        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="buttheme me-2 mt-3"
            onClick={Back}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3"
            onClick={greetUser}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBContainer>
  );
};

export default BrainSpecilist;
