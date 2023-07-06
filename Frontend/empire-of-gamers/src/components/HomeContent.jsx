import React from "react";
import Game from "./Game";
import News from "./News";
import Hero from "./Hero";
import { Col, Container, Row } from "react-bootstrap";
const HomeContent = () => {
  return (
    <Container fluid className="p-0 pt-5 px-1 ">
      <Row className="d-flex pb-3">
        <Col md={"12"}>
          <Hero />
        </Col>
      </Row>

      <Row className="d-none d-md-flex">
        <Col md={"4"}></Col>
        <Col md={"6"} className="mb-1">
          <div className="hero-container overflow-hidden  bg-elements rounded-1 p-1 text-link ">
            filters
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={"4"} className="pb-2 pb-md-0">
          <News />
        </Col>
        <Col
          xs={"2"}
          className="ms-3 pb-md-0 d-md-none hero-container overflow-hidden  bg-elements rounded-1  text-link"
        >
          filters
        </Col>
        <Col md={""}>
          <Game />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeContent;
