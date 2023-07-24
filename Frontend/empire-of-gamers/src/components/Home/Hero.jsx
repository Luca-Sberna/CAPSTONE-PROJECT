import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import hero from "../../assets/imgs/hero-img.png";
import snake from "../../assets/imgs/snake.png";
import { Link } from "react-router-dom";
import king from "../../assets/imgs/king.png";

import $ from "jquery";

const Hero = () => {
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
    <Container
      fluid
      className="position-relative hero-container overflow-hidden  bg-elements rounded-1 p-2 text-link "
    >
      <Row className="d-flex justify-content-center text-center">
        <Col xs={"7"} md={"9"} className="p-3 hero-container rounded-1">
          <h1 className="special-text-link">Empire of Gamers</h1>
          <p className="fs-4 orange-text">
            Entra anche tu nell'impero dei giochi retro che premia i tuoi punti
            e abilità!
          </p>
        </Col>
        <Col>
          <Image
            fluid
            alt="hero-img"
            src={hero}
            className="position-absolute hero-img"
          />
        </Col>
      </Row>
      <Row className="text-center position-relative mt-3 py-1 hero-container">
        <Col>
          <p className="fs-4 green-text">
            Ogni mese , una nuova stagione! Incredibili premi attendono i primi
            10 classificati dell'Impero!
          </p>
          <Image
            fluid
            alt="hero-img"
            src={king}
            className="position-absolute hero-king"
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center text-center">
        <Col className=" pt-4 pb-2">
          <h5 className="special-text-link">
            Scopri i servizi e vantaggi del nostro Vip!
          </h5>
          <Link to={"/vip"}>
            <button className="btn-vip  rounded-3 fs-5">Vip</button>
          </Link>
        </Col>
      </Row>
      <Image
        alt="hero-img"
        src={snake}
        width={150}
        className="img-hero-snake position-absolute"
      />
    </Container>
  );
};

export default Hero;
