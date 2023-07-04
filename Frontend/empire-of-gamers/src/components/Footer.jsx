import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <Container>
        <Row>
          <Col xs={"12"} className="">
            <h5 className="m-0">Unisciti all'impero anche su</h5>
            <div className="social-icons py-2">
              <Link to="https://www.instagram.com/">
                <FaInstagram className="fs-2" />
              </Link>
              <Link to="https://www.facebook.com/">
                <FaFacebook className="fs-2" />
              </Link>
              <Link to="https://twitter.com/">
                <FaTwitter className="fs-2" />
              </Link>
              <Link to="https://www.linkedin.com/">
                <FaLinkedin className="fs-2" />
              </Link>
            </div>
          </Col>
          <Col xs={"12"}>
            <address className="m-0">
              Via Example, 12345, Città, Stato
              <br />
              ©️ Developed by{" "}
              <Link className="text-decoration-none">Luca Sberna</Link>{" "}
              {new Date().getFullYear()} ©️
              <br />
            </address>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
