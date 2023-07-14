import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Snake from "./Snake";
import Chess from "./ChessGame";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGame } from "../redux/slices/userSlice";

const GameDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { idGame } = useParams();
  const game = useSelector((state) => state.user.game);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
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

  let gameComponent;
  if (idGame === "155d3957-1857-48f7-bcdc-9d56fce1712b") {
    gameComponent = <Snake />;
  } else if (idGame === "f69314d6-23c1-48d1-aa8c-1ec30071c603") {
    gameComponent = <Chess />;
  }

  const handleEditGame = async (event) => {
    event.preventDefault();
    try {
      const putResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/game/${idGame}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(gameData),
        },
      );
      const putData = await putResponse.json();
      if (putResponse.ok) {
        console.log("Gioco aggiornato con successo");
        window.location.reload();
      } else {
        console.log(putData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGame = async (idGame) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/game/${idGame}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        setShowDeleteModal(false);
        setShowModal(false);
        navigate("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Effettua la richiesta al backend per recuperare i dettagli del gioco
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/game/${idGame}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const game = response.data;

        // Aggiorna lo stato del gioco nel tuo store Redux
        dispatch(setGame(game));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameDetails();
  }, [idGame, token, dispatch]);
  return (
    <div className="bg-home">
      <Container fluid className=" p-5 justify-content-center ">
        <Row className="py-3 text-link">
          <Col
            xs={12}
            md={7}
            className=" hero-container me-4 mb-5 bg-elements rounded-1"
          >
            <div className="d-flex justify-content-between pt-3 position-relative ">
              <>
                <h2>{game.name}</h2>
                <Image
                  width={100}
                  src={game.image}
                  className="position-absolute me-2 end-0 rounded-1 hero-container"
                  fluid
                />
                {userRole === "ADMIN" && (
                  <button
                    className="btn-modal-game position-absolute   bg-transparent rounded-pill "
                    onClick={() => setShowModal(true)}
                  >
                    ✏️
                  </button>
                )}
              </>
            </div>
            <p>{game.description}</p>
            <p>Valutazione: {game.ratings}/5</p>
            <h3>Come giocare</h3>
            <p>{game.infoToPlay}</p>
            <h3>Comandi</h3>
            <p>{game.commands}</p>
          </Col>
          <Col
            xs={12}
            md={4}
            className="hero-container h-75 pb-4 px-4 bg-elements rounded-1"
          >
            <h3 className="pt-3">Classifica</h3>
            <ListGroup className=" ">
              {game &&
                game.leaderboard &&
                game.leaderboard.map((player, index) => (
                  <ListGroup.Item
                    className="hero-container bg-elements text-link"
                    key={index}
                  >
                    {player.name}: {player.score}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="my-3 ">
          <Col className="justify-content-center d-flex hero-container bg-elements text-link rounded-1">
            {gameComponent}
          </Col>
        </Row>
      </Container>

      <Modal className="" show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleEditGame}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica il gioco!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">
                Immagine del gioco (URL)
              </Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={gameData.image}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label">Nome del gioco</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={gameData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label">
                Descrizione del gioco
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={gameData.description}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label">Ratings</Form.Label>
              <Form.Control
                type="number"
                name="ratings"
                value={gameData.ratings}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label">
                Descrizione su come giocare
              </Form.Label>
              <Form.Control
                type="text"
                name="infoToPlay"
                value={gameData.infoToPlay}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <label htmlFor="commands" className="form-label">
                Comandi
              </label>
              <Form.Control
                type="text"
                name="commands"
                value={gameData.commands}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button type="submit" variant="primary">
              Salva
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Elimina
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className=""
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vuoi eliminare veramente il gioco?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Back
          </button>
          <button
            type="submit"
            variant="primary"
            onClick={() => handleDeleteGame(idGame)}
          >
            Save and Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameDetails;
