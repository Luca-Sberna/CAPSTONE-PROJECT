import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Friend = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container className="friend-container position-absolute d-flex overflow-hidden ">
      <Row className="friend-header" onClick={toggleDropdown}>
        <Col xs={""} className="d-flex align-items-center">
          <h5 className="me-2  mb-0 ">Your Friends</h5>
          <span className={`arrow ${isDropdownOpen ? "down" : "up"}`}>
            {isDropdownOpen ? "▼" : "▲"}
          </span>
        </Col>
        {isDropdownOpen && (
          <div className="friend-content">
            {/* Contenuto della dropdown */}
            <p>Contenuto della dropdown</p>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Friend;
