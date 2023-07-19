import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setCurrentUser,
  setCurrentUserId,
  setIsVip,
} from "../../redux/slices/userSlice";
import axios from "axios";

const NavbarLg = () => {
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const [userProfile, setUserProfile] = useState({});
  const isVip = useSelector((state) => state.user.isVip);
  const isVipIdUser = isVip && isVip.length > 0 ? isVip[0].user.idUser : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const currentUser = response.data.username;
        dispatch(setCurrentUser(currentUser));
        const currentUserId = response.data.idUser;
        dispatch(setCurrentUserId(currentUserId));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCurrentUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userProfile/user/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const currentUserProfile = response.data.content[0];
        if (currentUserProfile) {
          setUserProfile(currentUserProfile);
        } else {
          // L'utente non ha un profilo associato, creane uno di default
          const defaultUserProfile = {
            imgProfile:
              "https://th.bing.com/th/id/OIP.gg4LQf_og484KnvKc30JmgHaG6?w=221&h=206&c=7&r=0&o=5&dpr=1.8&pid=1.7", // Valore vuoto o un URL di immagine di default
          };
          const createProfileResponse = await axios.put(
            `${process.env.REACT_APP_API_URL}/userProfile/${currentUserProfile}`,
            defaultUserProfile,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUserProfile(createProfileResponse.data);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVipStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/vipUser/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        const isVip = data.content; // Verifica se la risposta contiene dati per determinare se l'utente è un VIP
        dispatch(setIsVip(isVip));
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
      fetchCurrentUserProfile();
      fetchVipStatus();
    }
  }, [dispatch, isLoggedIn, token, currentUserId]);

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
                to={"/social"}
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
                    <Link
                      to={`/profile/${userId}`}
                      className="p-0 text-decoration-none"
                    >
                      <Image
                        fluid
                        className="profile-image "
                        src={userProfile.imgProfile}
                        alt="Profile"
                      />
                    </Link>
                    <span className="align-middle px-2 text-link bg-transparent position-relative">
                      {currentUser}
                      {isVipIdUser === userId && (
                        <div className="crown-vip position-absolute">👑</div>
                      )}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-elements mt-1 ms-5 overflow-hidden">
                    {/* Esempi di elementi nella dropdown */}
                    <Dropdown.Item
                      data-aos="flip-up"
                      href="#action1"
                      className="dropdown-custom-hover text-link"
                    >
                      <Link
                        className="text-decoration-none text-link"
                        to={`/profile/${userId}`}
                      >
                        Profilo utente
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      data-aos="flip-up"
                      href="#action2"
                      className="dropdown-custom-hover text-link"
                    >
                      <Link
                        className="text-decoration-none text-link"
                        to={`/profile-settings/${userId}`}
                      >
                        Impostazioni profilo
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider className="elements" />
                    <Dropdown.Item
                      data-aos="flip-up"
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
