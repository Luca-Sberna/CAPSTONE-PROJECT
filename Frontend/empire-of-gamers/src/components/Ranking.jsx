import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Navbar";

const Ranking = () => {
  const rankingData = [
    { position: 1, user: "User 1", score: 100 },
    { position: 2, user: "User 2", score: 90 },
    { position: 3, user: "User 3", score: 80 },
    // Aggiungi altri dati della classifica ottenuti dalla fetch
  ];

  return (
    <Container fluid className="px-xs-2 px-md-0 pt-5">
      <Container className="hero-container bg-elements   p-3 text-link ">
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
        {rankingData.map((item) => (
          <Row key={item.position}>
            <Col xs={3}>{item.position}.</Col>
            <Col xs={6}>{item.user}</Col>
            <Col xs={3}>{item.score}</Col>
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default Ranking;
