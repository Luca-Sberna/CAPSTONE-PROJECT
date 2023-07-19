import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import $ from "jquery";

const Footer = () => {
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
    <footer className="footer bg-home text-light text-center">
      <Container fluid className="bg-elements py-2">
        <Row>
          <Col xs={"12"} className="">
            <h5 className="m-0">Follow us everywhere!</h5>
            <div className="social-icons py-2">
              <Link to="https://www.instagram.com/" className="icons-color">
                <FaInstagram className="fs-1 insta-icon " />
              </Link>
              <Link to="https://www.facebook.com/" className="icons-color">
                <FaFacebook className="fs-1 fb-icon mx-3 " />
              </Link>
              <Link to="https://twitter.com/" className="icons-color">
                <FaTwitter className="fs-1 twitter-icon " />
              </Link>
              <Link to="https://www.linkedin.com/" className="icons-color">
                <FaLinkedin className="fs-1 ms-3 linkedin-icon " />
              </Link>
            </div>
          </Col>
          <Col xs={"12"}>
            <address className="m-0">
              Via Example, 12345, City, State
              <p className="d-block m-0 ">
                Developed by{" "}
                <Link className="text-decoration-none special-text-link ">
                  Luca Sberna{" "}
                </Link>{" "}
                v1.0.0 {new Date().getFullYear()} ©️
              </p>
            </address>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
