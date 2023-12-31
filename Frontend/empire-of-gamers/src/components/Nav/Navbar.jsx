import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Dropdown, Image, Container } from "react-bootstrap";
import NavbarLg from "../Nav/NavbarLg";
import logo2 from "../../assets/imgs/logo-7.png";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setCurrentUser,
  setCurrentUserEmail,
  setCurrentUserId,
  setRanking,
  setUserCurrent,
} from "../../redux/slices/userSlice";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserImgProfile = useSelector((state) => state.user.imgProfile);
  const [userProfile, setUserProfile] = useState({});
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const isVip = useSelector((state) => state.user.isVip);
  const isVipIdUser = isVip && isVip.length > 0 ? isVip[0].user.idUser : null;

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
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
        const userCurrent = response.data;
        dispatch(setUserCurrent(userCurrent));
        const currentUser = response.data.username;
        dispatch(setCurrentUser(currentUser));
        const currentUserEmail = response.data.email;
        dispatch(setCurrentUserEmail(currentUserEmail));
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
          const createProfileResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/userProfile`,
            defaultUserProfile,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUserProfile(createProfileResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAllScore = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ranking?page=0&size=10&sortBy=score`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const ranking = response.data.content;
        ranking.sort((a, b) => b.score - a.score);
        console.log(ranking);
        dispatch(setRanking(ranking));
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
      fetchCurrentUserProfile();
      getAllScore();
    }
  }, [dispatch, isLoggedIn, token, currentUserId, currentUserImgProfile]);
  return (
    <>
      <Container
        fluid
        className="header   bg-elements  shadow position-sticky  w-100 d-flex flex-column "
      >
        <Row className="">
          <Col className="px-0 d-flex align-items-center justify-content-between navbar-lg ">
            <Link
              to={"/"}
              onClick={() => {}}
              className="logo text-decoration-none special-text-link p-0 "
            >
              <Image width={51} src={logo2} alt="logo" className=" " />
            </Link>

            <NavbarLg />

            <input
              type="text"
              placeholder="Search a game..."
              className="input-search rounded-4  my-1  me-lg-3"
            />

            <input
              type="checkbox"
              className="menu-btn"
              id="menu-btn"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
          </Col>

          <Col
            xs="auto"
            className="d-flex d-lg-none  justify-content-end align-items-center"
          >
            {isLoggedIn && ( // Mostra il menu solo se l'utente è loggato
              <label
                htmlFor="menu-btn"
                className={`menu-icon d-flex align-items-center justify-content-center ${
                  menuOpen ? "open" : ""
                }`}
              >
                <span
                  className="nav-icon"
                  style={{
                    backgroundColor: menuOpen ? "transparent" : "#A4C639",
                  }}
                ></span>
              </label>
            )}
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
          </Col>
        </Row>
        <ul
          className={`menu list-unstyled d-lg-none justify-content-center align-items-center   m-0 ${
            menuOpen ? "" : "ul-mobile"
          }`}
          style={{ maxHeight: menuOpen ? "300px" : "0px" }}
        >
          <li className="my-2 my-lg-0 custom-dropdown text-link">
            <Link to={"/vip"} className="text-decoration-none text-link">
              Vip 👑 Premium
            </Link>
          </li>
          <li className="my-2 my-lg-0 custom-dropdown">
            <Link to={"/ranking"} className="text-decoration-none text-link">
              Ranking
            </Link>
          </li>
          <li className="my-2 my-lg-0 custom-dropdown">
            <Link to={"/social"} className="text-decoration-none text-link">
              Empire Social{" "}
            </Link>
          </li>
          <li className="mt-2 mt-lg-0 custom-dropdown">
            <Link to={"/about"} className="text-decoration-none text-link">
              About Us
            </Link>
          </li>

          <li className="mb-2 mb-lg-0 d-flex align-items-center custom-dropdown">
            <Dropdown className="position-relative">
              {isVipIdUser === userId && (
                <div className="crown-vip-mobile position-absolute">👑</div>
              )}
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="text-decoration-none d-flex align-items-center "
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
                <span className="align-middle px-2 text-link">
                  {currentUser}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className=" bg-elements mt-1 ms-5 overflow-hidden ">
                <Dropdown.Item
                  data-aos="flip-up"
                  href="#action1"
                  className="dropdown-custom-hover text-link"
                >
                  {" "}
                  <Link
                    className="text-decoration-none text-link"
                    to={`/profile/${userId}`}
                  >
                    Profilo utente
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  data-aos="flip-up"
                  href="#action1"
                  className="dropdown-custom-hover text-link"
                >
                  {" "}
                  <Link
                    className="text-decoration-none text-link"
                    to={`/profile-settings/${userId}`}
                  >
                    Impostazioni profilo
                  </Link>
                </Dropdown.Item>

                <Dropdown.Divider className="elements " />

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
          </li>
        </ul>
      </Container>
    </>
  );
};

export default Navbar;
