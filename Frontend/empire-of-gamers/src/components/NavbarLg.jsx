import React, { useState } from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../assets/imgs/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";

const NavbarLg = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Implementa qui la logica per effettuare il logout
    dispatch(logout());
  };
  return (
    <Container
      fluid
      className="px-0  d-none d-lg-block align-items-center navbar-lg"
    >
      <Row className="menu-2 list-unstyled d-flex align-items-center m-0  ">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex ">
            <Col className="d-flex align-items-center custom-dropdown me-xxl-3">
              <Link
                to={"/vip"}
                className="text-link link-navbar-lg d-flex text-decoration-none align-items-center  px-2 py-3 rounded-1"
              >
                <Col className="bg-transparent">👑</Col>{" "}
                <Col className="bg-transparent">Vip</Col>
              </Link>
            </Col>

            <Col className="d-flex align-items-center mx-4 custom-dropdown d-xxl-none">
              <Link
                to={"/ranking"}
                className=" text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                Ranking
              </Link>
            </Col>

            <Col
              lg={"4"}
              xxl={"6"}
              className=" d-flex align-items-center me-2 me-xxl-0 custom-dropdown"
            >
              <Link
                to={"/"}
                className="text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                Empire Social{" "}
              </Link>
            </Col>

            <Col
              lg={"3"}
              xxl={"4"}
              className="d-flex align-items-center custom-dropdown"
            >
              <Link
                to={"/about"}
                className="text-link link-navbar-lg text-decoration-none  px-2 py-3 rounded-1"
              >
                About Us
              </Link>
            </Col>
          </div>
          <div>
            {!isLoggedIn && ( // Mostra i bottoni di login e signup solo se l'utente non è loggato
              <>
                <Link to={"/login"} className="text-decoration-none text-black">
                  <span className="login-btn rounded-start-pill p-1">
                    Login
                  </span>
                </Link>
                <Link
                  to={"/signup"}
                  className="text-decoration-none text-black"
                >
                  <span className="signup-btn rounded-end-pill p-1">
                    SignUp
                  </span>
                </Link>
              </>
            )}
          </div>
          <div>
            {isLoggedIn && ( // Mostra la dropdown del profilo solo se l'utente è loggato
              <Col className="custom-dropdown">
                <Dropdown className="link-navbar-lg  py-2 rounded-1 ">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="text-decoration-none d-flex align-items-center bg-transparent "
                  >
                    {" "}
                    <Link
                      to={"/profile/:id"}
                      className="p-0 text-decoration-none"
                    >
                      <Image
                        fluid
                        className="profile-image "
                        src={avatar}
                        alt="Profile"
                      />
                    </Link>
                    <span className="align-middle px-2 text-link bg-transparent">
                      Your Profile
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-elements mt-1 ms-5 overflow-hidden">
                    {/* Esempi di elementi nella dropdown */}
                    <Dropdown.Item
                      href="#action2"
                      className="dropdown-custom-hover text-link"
                    >
                      <Link
                        className="text-decoration-none text-link"
                        to={"/profile-settings/:id"}
                      >
                        {" "}
                        Impostazioni profilo
                      </Link>{" "}
                    </Dropdown.Item>
                    <Dropdown.Divider className="elements" />
                    <Dropdown.Item
                      href="#action3"
                      className="dropdown-custom-hover text-link"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            )}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default NavbarLg;
