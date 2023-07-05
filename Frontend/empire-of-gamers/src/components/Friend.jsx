import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Friend = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleUp = <span className="icons-color bg-transparent">▲</span>;
  const toggleDown = <span className="icons-color bg-transparent">▼</span>;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container className="friend-container position-absolute d-flex overflow-hidden ">
      <Row
        className="friend-header custom-dropdown-friends"
        onClick={toggleDropdown}
      >
        <Col xs={""} className="d-flex align-items-center ">
          <h5 className="me-2  mb-0 ">Your Friends</h5>
          <span className={`arrow ${isDropdownOpen ? "down" : "up"}`}>
            {isDropdownOpen ? toggleDown : toggleUp}
          </span>
        </Col>
        {isDropdownOpen && (
          <Row className="friend-content bg-transparent">
            <span className="friend-content-element mb-2">
              Contenuto della dropdown
            </span>
            <span className="friend-content-element mb-2">
              Contenuto della dropdown
            </span>
            <span className="friend-content-element mb-2">
              Contenuto della dropdown
            </span>
            <span className="friend-content-element mb-2">
              Contenuto della dropdown
            </span>
            <span className="friend-content-element">
              Contenuto della dropdown
            </span>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default Friend;
