import React from "react";
import Game from "./Game";
import News from "./News";
import Hero from "./Hero";
import { Col, Container, Image, Row } from "react-bootstrap";
import img from "../assets/imgs/logo-7.png";
import img1 from "../assets/imgs/img-bg.png";
import img2 from "../assets/imgs/img-game.png";
import img3 from "../assets/imgs/studio.png";

const HomeContent = () => {
  return (
    <Container fluid className="p-0 pt-5 px-1 position-relative">
      <Row className="d-flex pb-3 ">
        <Col md={"12"} className="">
          <Image
            fluid
            className="img-hero position-absolute   end-0"
            src={img3}
            alt="img"
            width={55}
          />
          <Hero />
        </Col>
      </Row>

      <Row className="d-none d-md-flex ">
        <Col md={"4"}></Col>
        <Col md={"6"} className="mb-1 position-relative">
          <Image
            className="img-filters-2 position-absolute  "
            src={img1}
            alt="img"
            width={85}
          />
          <div className="hero-container overflow-hidden  bg-elements rounded-1 p-1 text-link ">
            filters
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={"4"} className="pb-5 pb-md-0">
          <News />
        </Col>

        <Col
          xs={"2"}
          className="ms-3 pb-md-0 d-md-none hero-container   bg-elements rounded-1  text-link position-relative"
        >
          <Image
            className="img-filters position-absolute   "
            src={img1}
            alt="img"
            width={85}
          />
          <div>filters</div>
        </Col>

        <Col md={""} className="position-relative">
          <Image
            fluid
            className="img-game position-absolute  bottom-0 end-0"
            src={img2}
            alt="img"
            width={70}
          />
          <Game />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeContent;
