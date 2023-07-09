import React, { useState } from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import friends from "../assets/imgs/friends.png";
import FriendList from "./FriendList";

const Friend = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleUp = <span className="icons-color bg-transparent">▲</span>;
  const toggleDown = <span className="icons-color bg-transparent">▼</span>;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container className="friend-container position-fixed bottom-0 end-0 d-flex overflow-hidden d-flex align-items-center justify-content-center">
      <Row className="friend-header ">
        <Col
          xs={""}
          className="d-flex align-items-center justify-content-center"
          onClick={(e) => toggleDropdown(e)}
        >
          <h5 className="me-2  mb-0 bg-transparent d-flex ">
            <Image src={friends} alt="friend-icon-list" width={40} />
          </h5>
          <span className={`arrow ${isDropdownOpen ? "down" : "up"}`}>
            {isDropdownOpen ? toggleDown : toggleUp}
          </span>
        </Col>
        {isDropdownOpen && (
          <>
            <hr className="divisori mt-2 mb-0" />
            <Container
              fluid
              className="friend-content bg-transparent  align-items-center justify-content-center "
            >
              <FriendList />
            </Container>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Friend;
