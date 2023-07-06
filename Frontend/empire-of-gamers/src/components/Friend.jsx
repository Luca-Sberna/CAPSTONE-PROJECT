import React, { useState } from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import avatar from "../assets/imgs/avatar.png";

const Friend = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleUp = <span className="icons-color bg-transparent">▲</span>;
  const toggleDown = <span className="icons-color bg-transparent">▼</span>;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container className="friend-container position-absolute d-flex overflow-hidden custom-dropdown-friends">
      <Row className="friend-header ">
        <Col
          xs={""}
          className="d-flex align-items-center "
          onClick={(e) => toggleDropdown(e)}
        >
          <h5 className="me-2  mb-0 bg-transparent">Your Friends</h5>
          <span className={`arrow ${isDropdownOpen ? "down" : "up"}`}>
            {isDropdownOpen ? toggleDown : toggleUp}
          </span>
        </Col>
        {isDropdownOpen && (
          <Container
            fluid
            className="friend-content bg-transparent p-1 d-flex align-items-center justify-content-center p-3"
          >
            <Row className="friend-list d-flex align-items-center p-0 py-1 bg-transparent">
              <Col xs={"2"} className="p-0 ">
                <Image
                  fluid
                  className="profile-image rounded-circle ms-2"
                  src={avatar}
                  alt="profile-img"
                />
              </Col>
              <Col className="bg-transparent pe-0 text-truncate custom-dropdown-friends">
                <span className="friend-content-element mb-2  ">
                  usernameeeeeeee
                </span>
              </Col>
              <Row className="p-0 d-flex justify-content-between bg-transparent">
                <Col className="bg-transparent"></Col>
                <Col xs={"2"} className="bg-transparent ">
                  🟢
                </Col>
                <Col xs={"2"} className="bg-transparent friend-list-icon ">
                  🗑️
                </Col>
              </Row>

              <Dropdown.Divider className="elements my-2" />

              <Col xs={"2"} className="p-0 ">
                <Image
                  fluid
                  className="profile-image rounded-circle ms-2"
                  src={avatar}
                  alt="profile-img"
                />
              </Col>
              <Col className="bg-transparent pe-0 text-truncate custom-dropdown-friends">
                <span className="friend-content-element mb-2  ">
                  usernameeeeeeee
                </span>
              </Col>
              <Row className="p-0 d-flex justify-content-between bg-transparent">
                <Col className="bg-transparent"></Col>
                <Col xs={"2"} className="bg-transparent ">
                  🟢
                </Col>
                <Col xs={"2"} className="bg-transparent friend-list-icon ">
                  🗑️
                </Col>
              </Row>
              <Dropdown.Divider className="elements my-2" />

              <Col xs={"2"} className="p-0 ">
                <Image
                  fluid
                  className="profile-image rounded-circle ms-2"
                  src={avatar}
                  alt="profile-img"
                />
              </Col>
              <Col className="bg-transparent pe-0 text-truncate custom-dropdown-friends">
                <span className="friend-content-element mb-2  ">
                  usernameeeeeeee
                </span>
              </Col>
              <Row className="p-0 d-flex justify-content-between bg-transparent">
                <Col className="bg-transparent"></Col>
                <Col xs={"2"} className="bg-transparent ">
                  🟢
                </Col>
                <Col xs={"2"} className="bg-transparent friend-list-icon ">
                  🗑️
                </Col>
              </Row>
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default Friend;
