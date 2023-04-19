import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import "../styles.css";

const ScrollTopBottom = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0) {
      setVisible(false);
    } else if (scrolled <= 0) {
      setVisible(true);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  //top scroll

  const [showBtn, setShowBtn] = useState("mybtn none");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowBtn("mybtn");
    } else {
      setShowBtn("none");
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <MDBContainer fluid className="scrollTopBottom">
      <div className="d-flex flex-row-reverse">
        <form className="d-flex w-auto scrollbut">
          <MDBIcon
            fas
            icon="chevron-down"
            onClick={scrollToBottom}
            id="myBtn"
            className="showBtn fw-bold fs-1"
            title="Go to bottom"
          />
          <MDBIcon
            fas
            icon="angle-up"
            onClick={topFunction}
            id="myBtn"
            className="showBtn fw-bold fs-1"
            title="Go to top"
          />
        </form>
      </div>
    </MDBContainer>
  );
};

export default ScrollTopBottom;
