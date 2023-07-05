import React from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../assets/imgs/avatar.png";

const NavbarLg = () => {
  return (
    <Container
      fluid
      className="px-0  d-none d-lg-block align-items-center navbar-lg"
    >
      <Row className="menu-2 list-unstyled d-flex align-items-center m-0  ">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex ">
            <Col className="d-flex align-items-center custom-dropdown">
              <Link
                to={"/"}
                className="text-link link-navbar-lg d-flex text-decoration-none align-items-center  px-2 py-3 rounded-1"
              >
                <Col>👑</Col> <Col className=" ">Vip</Col>
              </Link>
            </Col>

            <Col className="d-flex align-items-center mx-4 custom-dropdown">
              <Link
                to={"/"}
                className=" text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                Ranking
              </Link>
            </Col>

            <Col
              lg={"4"}
              className=" d-flex align-items-center me-2 custom-dropdown"
            >
              <Link
                to={"/"}
                className="text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                Empire Social{" "}
              </Link>
            </Col>

            <Col lg={"3"} className="d-flex align-items-center custom-dropdown">
              <Link
                to={"/"}
                className="text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                About Us
              </Link>
            </Col>
          </div>

          <div>
            <Col className="custom-dropdown">
              <Dropdown className="link-navbar-lg  py-2 rounded-1 ">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="text-decoration-none d-flex align-items-center  "
                >
                  <Image
                    fluid
                    className="profile-image "
                    src={avatar}
                    alt="Profile"
                  />

                  <span className="align-middle px-2 text-link">
                    Your Profile
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-elements mt-1 ms-5 overflow-hidden">
                  {/* Esempi di elementi nella dropdown */}
                  <Dropdown.Item
                    href="#action1"
                    className="dropdown-custom-hover text-link  "
                  >
                    Action 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#action2"
                    className="dropdown-custom-hover text-link"
                  >
                    Action 2
                  </Dropdown.Item>
                  <Dropdown.Divider className="elements" />
                  <Dropdown.Item
                    href="#action3"
                    className="dropdown-custom-hover text-link"
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default NavbarLg;
