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
    MDBCardSubTitle,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle
} from "mdb-react-ui-kit";
import {  useNavigate } from "react-router-dom";
import { users } from "./Data";
import _ from "lodash";

const Doctor = () => {
  const navigate = useNavigate();
  function greetUser() {
    navigate("/slot");
  }
  function ProblemList() {
    navigate("/dropdownlist1");
  }

  
  function Back() {
    navigate("/problem");
  }


  //doctor api

  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  const handleSearchFilter = (e) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(users, (user) => {
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
    <MDBContainer fluid className="backall">
      <MDBContainer>
        <MDBRow>
          <h3 className="text-center mt-5">Select Doctor</h3>
          <MDBRow>
          <div className="d-flex justify-content-center ">
          <div className="searchbar">
          <form className='d-flex input-group w-auto'>
            <MDBInput
             type="search"
              label="Search doctor..."
              value={searchValue}
              onChange={handleSearchFilter} />
                          <MDBBtn className="buttheme"><MDBIcon fas icon="search" /></MDBBtn>

          </form>
          </div>
        </div>

        <MDBRow className="user-list">
        {_.map(filteredUsers, (user) => ( 
            <MDBCol size="md-4" className="text-center mt-5">
                <MDBCard onClick={greetUser}>
                    <MDBCardBody>
                        
          <MDBCardSubTitle key={user.id}>
            <MDBCardImage src={user.img} alt=".." height="50%" width="50%"/>
                        <MDBCardTitle>{user.specilist}</MDBCardTitle>  
                        <hr className="w-50" style={{marginLeft:"25%"}}/>   
                        <MDBCardText> Name: {user.firstName}</MDBCardText>
          </MDBCardSubTitle>
          
          </MDBCardBody>
                </MDBCard>
            </MDBCol>
        ))}
      </MDBRow>
           </ MDBRow>
        </MDBRow>
        <div
                    className={
                      "form__item button__items d-flex justify-content-between"
                    }
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

export default Doctor;
