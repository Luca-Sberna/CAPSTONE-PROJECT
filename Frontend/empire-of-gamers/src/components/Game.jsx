import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../redux/slices/userSlice";

const Game = () => {
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userRole = userCurrent.role;
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    ratings: "",
    infoToPlay: "",
    commands: "",
    image: "",
  });

  const handleInputChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddGame = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    // make POST request to backend to insert game into database
    fetch(`${process.env.REACT_APP_API_URL}/game`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gameData),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle successful POST request
        console.log(data);

        // make GET request to retrieve updated list of games
        fetch(
          `${process.env.REACT_APP_API_URL}/game?page=0&size=20&sortBy=name`,
          {
            headers: headers,
          },
        )
          .then((response) => response.json())
          .then((data) => {
            // handle successful GET request
            console.log(data);

            // update Redux store using slices
            const games = data.content;
            setGames(games);
            dispatch(setGame(games));
            setShowModal(false);
          });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(`${process.env.REACT_APP_API_URL}/game?page=0&size=20&sortBy=name`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const games = data.content;
        setGames(games);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <Container className="game-container overflow-hidden bg-elements rounded-1 p-2 text-link ">
        <div className="d-flex align-items-center">
          <h2 className="m-0 me-3">Games</h2>
          {userRole === "ADMIN" && (
            <button
              className="btn-vip rounded-1"
              onClick={() => setShowModal(true)}
            >
              ➕
            </button>
          )}
        </div>
        <hr className="divisori" />
        <Row className="text-center">
          {games &&
            games.map((game, index) => (
              <Col key={index} xs={6} md={4} lg={3} className="mb-3">
                <div className="game-card pb-3">
                  {" "}
                  <Link
                    to={`/game/${game.idGame}`}
                    className="p-0 text-decoration-none"
                  >
                    <img
                      width={90}
                      src={game.image}
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddGame}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi un gioco</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={gameData.name}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={gameData.description}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Valutazione</Form.Label>
              <Form.Control
                type="number"
                name="ratings"
                value={gameData.ratings}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Come giocare</Form.Label>
              <Form.Control
                type="text"
                name="infoToPlay"
                value={gameData.infoToPlay}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comandi</Form.Label>
              <Form.Control
                type="text"
                name="commands"
                value={gameData.commands}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Immagine (URL)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={gameData.image}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={() => setShowModal(false)}>
              Back
            </button>
            <button type="submit" variant="primary">
              Save Game
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Game;
