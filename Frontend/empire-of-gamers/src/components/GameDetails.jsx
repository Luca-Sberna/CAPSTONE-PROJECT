import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Modal,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router";
import Snake from "./Snake";
import Chess from "./ChessGame";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGame } from "../redux/slices/userSlice";

const GameDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const { idGame } = useParams();
  const game = useSelector((state) => state.user.game);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  let gameComponent;
  if (idGame === "155d3957-1857-48f7-bcdc-9d56fce1712b") {
    gameComponent = <Snake />;
  } else if (idGame === "f69314d6-23c1-48d1-aa8c-1ec30071c603") {
    gameComponent = <Chess />;
  }

  const handleEditGame = () => {
    // function to handle adding a new game
    // make Put request to backend to insert game into database
    // make GET request to retrieve updated list of games
    // update Redux store using slices
  };
  const handleDeleteGame = () => {
    // function to handle adding a new game
    // make delete request to backend to insert game into database
    // update Redux store using slices
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
    <>
      <Container fluid className=" py-5 px-5 justify-content-center bg-home">
        <Row className="py-3 text-link">
          <Col
            xs={12}
            md={7}
            className=" hero-container me-4 mb-5 bg-elements rounded-1"
          >
            <div className="d-flex justify-content-between pt-3 position-relative ">
              <h2>{game.name}</h2>
              <Image
                width={100}
                src={game.image}
                className="position-absolute me-2 end-0 rounded-1 hero-container"
                fluid
              />
              <button
                className="btn-modal-game position-absolute   bg-transparent rounded-pill "
                onClick={() => setShowModal(true)}
              >
                ✏️
              </button>
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
        <Modal.Header closeButton>
          <Modal.Title>Modifica il gioco!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="gameImage" className="form-label">
                Immagine del gioco
              </label>
              <input type="file" className="form-control" id="gameImage" />
            </div>

            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Nome del gioco
              </label>
              <input type="text" className="form-control" id="firstName" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descrizione del gioco
              </label>
              <textarea className="form-control" id="description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descrizione su come giocare
              </label>
              <textarea className="form-control" id="description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="commands" className="form-label">
                Comandi
              </label>
              <textarea className="form-control" id="commands"></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button type="submit" variant="primary">
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameDetails;
