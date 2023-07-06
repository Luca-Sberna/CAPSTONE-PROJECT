import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import avatar from "../assets/imgs/avatar.png";
import NavbarLg from "./NavbarLg";
import $ from "jquery";
import logo2 from "../assets/imgs/logo-7.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //funzione per l'animazione dei testi speciali
  useEffect(() => {
    $(".special-text-link").on("mouseenter", function () {
      var colors = getComputedStyle(document.documentElement)
        .getPropertyValue("--random-color")
        .split(", ");
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      $(this).css("color", randomColor);
    });

    $(".special-text-link").on("mouseleave", function () {
      $(this).css("color", ""); // Ripristina il colore originale
    });
  }, []);

  return (
    <>
      <header className="header bg-elements shadow position-sticky  w-100 d-flex flex-column ">
        <Row className="">
          <Col className="d-flex align-items-center justify-content-between navbar-lg ">
            <Link
              to={"/"}
              className="logo text-decoration-none special-text-link p-0"
            >
              <Image
                width={61}
                fluid
                src={logo2}
                alt="logo"
                className=" ms-1"
              />
            </Link>

            <NavbarLg />

            <input
              type="text"
              placeholder="Search a game..."
              className="input-search rounded-4   me-lg-3"
            />

            <input
              type="checkbox"
              className="menu-btn"
              id="menu-btn"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
          </Col>

          <Col xs="auto" className="d-flex d-lg-none  justify-content-end">
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
          </Col>
        </Row>

        <ul
          className={`menu list-unstyled d-lg-none justify-content-center align-items-center m-0 ${
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
            <Link to={"/"} className="text-decoration-none text-link">
              Empire Social{" "}
            </Link>
          </li>
          <li className="mt-2 mt-lg-0 custom-dropdown">
            <Link to={"/about"} className="text-decoration-none text-link">
              About Us
            </Link>
          </li>
          <li className="mb-2 mb-lg-0 d-flex align-items-center custom-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="text-decoration-none d-flex align-items-center "
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
              <Dropdown.Menu className=" bg-elements mt-1 ms-5 overflow-hidden ">
                {/* Esempi di elementi nella dropdown */}
                <Dropdown.Item
                  href="#action1"
                  className="dropdown-custom-hover text-link"
                >
                  Action 1
                </Dropdown.Item>
                <Dropdown.Item
                  href="#action2"
                  className="dropdown-custom-hover text-link"
                >
                  Action 2
                </Dropdown.Item>
                <Dropdown.Divider className="elements " />
                <Dropdown.Item
                  href="#action3"
                  className="dropdown-custom-hover text-link"
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
