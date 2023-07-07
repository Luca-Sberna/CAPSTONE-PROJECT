import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import game from "../assets/imgs/OIPpng.png";

const Game = () => {
  return (
    <Container className="game-container overflow-hidden bg-elements rounded-1 p-2 text-link ">
      <h2>Games</h2>
      <hr className="divisori" />
      <Row className="text-center">
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 1" className="game-img" />
            <div className="game-title">Snake</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 2" className="game-img" />
            <div className="game-title">Chess</div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 1" className="game-img" />
            <div className="game-title">Snake</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 2" className="game-img" />
            <div className="game-title">Chess</div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 1" className="game-img" />
            <div className="game-title">Snake</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 2" className="game-img" />
            <div className="game-title">Chess</div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 1" className="game-img" />
            <div className="game-title">Snake</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 2" className="game-img" />
            <div className="game-title">Chess</div>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 1" className="game-img" />
            <div className="game-title">Snake</div>
          </div>
        </Col>
        <Col xs={6} md={4} lg={3} className="mb-3">
          <div className="game-card pb-3">
            <img width={100} src={game} alt="Game 2" className="game-img" />
            <div className="game-title">Chess</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
