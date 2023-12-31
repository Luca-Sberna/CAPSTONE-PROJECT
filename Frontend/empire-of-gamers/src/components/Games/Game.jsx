import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../../redux/slices/userSlice";
import $ from "jquery";

const Game = () => {
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userRole = userCurrent.role;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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

        {isLoggedIn ? (
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
        ) : (
          <div className="text-center special-text-link">
            Loggati per visualizzare i giochi
          </div>
        )}
      </Container>

      <Modal
        className="pt-5 confirm-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Form onSubmit={handleAddGame}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi un gioco</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Nome</Form.Label>
              <Form.Control
                className="hero-container"
                type="text"
                name="name"
                value={gameData.name}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Descrizione</Form.Label>
              <Form.Control
                className="hero-container"
                type="text"
                name="description"
                value={gameData.description}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Valutazione</Form.Label>
              <Form.Control
                className="hero-container"
                type="number"
                name="ratings"
                value={gameData.ratings}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Come giocare</Form.Label>
              <Form.Control
                className="hero-container"
                type="text"
                name="infoToPlay"
                value={gameData.infoToPlay}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Comandi</Form.Label>
              <Form.Control
                className="hero-container"
                type="text"
                name="commands"
                value={gameData.commands}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="orange-text">Immagine (URL)</Form.Label>
              <Form.Control
                className="hero-container"
                type="text"
                name="image"
                value={gameData.image}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-vip rounded-1 border-black"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <button
              className="btn-vip rounded-1 border-black"
              type="submit"
              variant="primary"
            >
              Save Game
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Game;
