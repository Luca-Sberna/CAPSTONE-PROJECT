import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Ranking = () => {
  return (
    <Container>
      <h3>Ranking</h3>
      <hr className="divisori" />
      <Row>
        <Col xs={3}>
          <h5>Pos.</h5>
        </Col>
        <Col xs={6}>
          <h5>User</h5>
        </Col>
        <Col xs={3}>
          <h5>Score</h5>
        </Col>
      </Row>
      {/* Esempi di righe della classifica */}
      <Row>
        <Col xs={3}>1.</Col>
        <Col xs={6}>User 1</Col>
        <Col xs={3}>100</Col>
      </Row>
      <Row>
        <Col xs={3}>2.</Col>
        <Col xs={6}>User 2</Col>
        <Col xs={3}>90</Col>
      </Row>
      <Row>
        <Col xs={3}>3.</Col>
        <Col xs={6}>User 3</Col>
        <Col xs={3}>80</Col>
      </Row>
      {/* Altre righe della classifica */}
    </Container>
  );
};

export default Ranking;
