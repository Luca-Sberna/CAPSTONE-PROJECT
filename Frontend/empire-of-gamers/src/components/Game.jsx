import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import game from "../assets/imgs/OIPpng.png";
import { Link } from "react-router-dom";

const Game = () => {
  const gameList = [
    {
      id: 1,
      name: "Snake",
      gameImg: game,
    },
    {
      id: 2,
      name: "Chess",
      gameImg: game,
    },
  ];
  return (
    <Container className="game-container overflow-hidden bg-elements rounded-1 p-2 text-link ">
      <h2>Games</h2>
      <hr className="divisori" />
      <Row className="text-center">
        {gameList.map((game, index) => (
          <Col key={index} xs={6} md={4} lg={3} className="mb-3">
            <div className="game-card pb-3">
              {" "}
              <Link to={"/game/:id"} className="p-0 text-decoration-none">
                <img
                  width={100}
                  src={game.gameImg}
                  alt={game.name}
                  className="game-img"
                />
                <div className="game-title">{game.name}</div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Game;
