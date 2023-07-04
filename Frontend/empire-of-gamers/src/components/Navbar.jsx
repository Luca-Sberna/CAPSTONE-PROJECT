import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Image } from "react-bootstrap";
import avatar from "../assets/imgs/avatar.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header bg-dark shadow pt-2  position-fixed w-100 d-flex flex-column ">
        <Row>
          <Col className="d-flex align-items-center">
            <Link to={"/"} className="logo text-decoration-none">
              EoG
            </Link>
            <input
              type="checkbox"
              className="menu-btn"
              id="menu-btn"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
          </Col>

          <Col xs="auto" className="d-flex justify-content-end">
            <label
              htmlFor="menu-btn"
              className={`menu-icon d-flex align-items-center justify-content-center ${
                menuOpen ? "open" : ""
              }`}
            >
              <span
                className="nav-icon"
                style={{
                  backgroundColor: menuOpen ? "transparent" : "gray",
                }}
              ></span>
            </label>
          </Col>
        </Row>

        <ul
          className="menu list-unstyled"
          style={{ maxHeight: menuOpen ? "300px" : "0px" }}
        >
          <li className="my-2">
            <Link to={"/"} className="text-decoration-none">
              Vip 👑 Premium
            </Link>
          </li>
          <li className="my-2">
            <Link to={"/"} className="text-decoration-none">
              Ranking
            </Link>
          </li>
          <li className="my-2">
            <Link to={"/"} className="text-decoration-none">
              Empire Social{" "}
            </Link>
          </li>
          <li className="mt-2">
            <Link to={"/"} className="text-decoration-none">
              About Us
            </Link>
          </li>
          <li className="mb-2 d-flex align-items-center ">
            <Dropdown drop="down">
              <Dropdown.Toggle
                variant="link"
                id="profile-dropdown"
                className="text-decoration-none d-flex align-items-center "
              >
                <Image
                  fluid
                  className="profile-image "
                  src={avatar}
                  alt="Profile"
                />

                <span className="align-middle px-2">Your Profile</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Esempi di elementi nella dropdown */}
                <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
                <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
                <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
