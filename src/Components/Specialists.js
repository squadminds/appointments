import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalShow, selectedDoc } from "../redux/HealthSlice";
import ToggleModal from "./modal";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";

import { selectedSpecalist,getSpecalist, getDisease,getTimeSlot } from "./Calls";
const Doctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [Selected,setSelected]=useState()
  const [filteredUsers, setFilteredUsers] = useState();
   const [searchQuery, setSearchQuery] = useState("");
   const [searchValue, setSearchValue] = React.useState("");
  const [user, setUser] = useState([]);
  const location=useLocation()
  const currentIndex = useRef(0);
  const lastIndex = useRef(4);
  const handleActive =async (user) => {
const value=await selectedSpecalist(user)
console.log("this is ",value)
navigate("/slot",{state:value});
  };

  const  greetUser=async()=> {
 const v=await getSpecalist()
     if(v){
      navigate("/slot");
     }else{
     
      dispatch(modalShow("Specilists Needed"));
    }
  }
  function Back() {
    navigate("/problem",{state:location.state});
  }
  //doctor api
 

  const handleSearchFilter = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const newFilter = filteredUsers?.filter((val, i) => {
        return val.firstName.toLowerCase().includes(query.toLowerCase());
      });
      // setFilteredUsers(newFilter)
    } else {
      // setFilteredUsers(user)
    }
  };
 

  const fetchDoctorsList = async () => {
const Disease=await getDisease();
     await getDocs(collection(db, "doctors")).then((querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))[0]
          .specalist?.filter((val, i) => {
            if(Disease==="users"){
              return val
            }
            return  val.specilist === Disease;
          });
        setFilteredUsers(data);
       
      });
    }
  
 const fetchActiveDoctor=async()=>{
  const v=await getSpecalist()
 
 setSelected(v)

 }


  useEffect(() => {
   fetchDoctorsList();
   fetchActiveDoctor();
   
  }, []);

  return (
    <MDBContainer fluid className="backall">
      <MDBContainer>
        <MDBRow>
          <MDBRow>
            <div className="d-flex flex-row-reverse mt-5">
              <div className="searchbar">
                <form className="d-flex input-group w-auto">
                  <MDBInput
                    type="search"
                    label="Search doctor..."
                    value={searchQuery}
                    onChange={handleSearchFilter}
                  />
                  <MDBBtn className="buttheme">
                    <MDBIcon fas icon="search" />
                  </MDBBtn>
                </form>
              </div>
            </div>
            <h3 className="text-center mx-auto">
              Select Specialists According Yor Problem
            </h3>

            <MDBRow className="user-list">
              {filteredUsers?.slice(0, 4).map((user, i) => (
                <MDBCol size="md-6" className="text-center mt-3 ">
                  <MDBCard>
                    <MDBRow
                      onClick={() => handleActive(user)}
                      className={
                        Selected === user.firstName ? "g-0 active" : "g-0"
                      }
                      tabIndex="1234"
                      key={user.id}
                    >
                      <MDBCol md="4">
                        <MDBCardImage
                          tabIndex="1234"
                          alt="..."
                          className="groupimgs"
                          src={user.img}
                        />
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody>
                          <MDBCardTitle
                            className={
                              Selected === user.firstName
                                ? "fw-bold active-text"
                                : "fw-bold"
                            }
                          >
                            {user.specilist}
                          </MDBCardTitle>
                          <hr className="w-50" style={{ marginLeft: "25%" }} />
                          <MDBCardText
                            className={
                              Selected === user.firstName ? "active-text" : ""
                            }
                          >
                            Name: {user.firstName}
                          </MDBCardText>
                          <MDBCardText
                            className={
                              Selected === user.firstName ? "active-text" : ""
                            }
                          >
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
        <MDBRow style={{ marginTop: "32px" }}></MDBRow>
        <div
          className={"form__item button__items d-flex justify-content-between"}
        >
          <MDBBtn
            type={"default"}
            className="buttheme me-2 mt-3 NePreBtn"
            onClick={Back}
          >
            Back
          </MDBBtn>
          <MDBBtn
            type={"primary"}
            className="buttheme mt-3 NePreBtn"
            onClick={()=>greetUser()}
          >
            Next
          </MDBBtn>
        </div>
      </MDBContainer>
      <ToggleModal />
    </MDBContainer>
  );
};
export default Doctor;
