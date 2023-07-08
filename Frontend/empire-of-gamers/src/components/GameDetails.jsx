import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";

const GameDetails = () => {
  // Dati del gioco
  const game = {
    name: "Nome del gioco",
    image: "https://via.placeholder.com/500",
    description: "Descrizione del gioco",
    rating: 4,
    howToPlay: "Descrizione su come giocare",
    controls: "Comandi da usare",
    leaderboard: [
      { name: "Utente 1", score: 100 },
      { name: "Utente 2", score: 90 },
      { name: "Utente 3", score: 80 },
      { name: "Utente 4", score: 70 },
      { name: "Utente 5", score: 60 },
    ],
  };

  return (
    <Container
      fluid
      className="bg-home pb-5 px-5 justify-content-center d-flex flex-column"
    >
      <Row className="py-3">
        <Col xs={12} md={8}>
          <h2>{game.name}</h2>
          <Image src={game.image} fluid />
          <p>{game.description}</p>
          <p>Valutazione: {game.rating}/5</p>
          <h3>Come giocare</h3>
          <p>{game.howToPlay}</p>
          <h3>Comandi</h3>
          <p>{game.controls}</p>
        </Col>
        <Col xs={12} md={4}>
          <h3>Classifica</h3>
          <ListGroup>
            {game.leaderboard.map((player, index) => (
              <ListGroup.Item key={index}>
                {player.name}: {player.score}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="my-3 ">
        <Col className="justify-content-center d-flex">Finestra gioco</Col>
      </Row>
    </Container>
  );
};

export default GameDetails;
