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
  Accordion,
  ModalBody,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import Snake from "./Snake";
import Chess from "./ChessGame";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGame } from "../redux/slices/userSlice";
import antenna from "../assets/imgs/antenna.png";

const GameDetails = () => {
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);
  const [reviewIdToEdit, setReviewIdToEdit] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false); // Aggiunto lo stato per il form
  const [userReviews, setUserReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { idGame } = useParams();
  const game = useSelector((state) => state.user.game);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;
  const userRole = userCurrent.role;

  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    ratings: "",
    infoToPlay: "",
    commands: "",
    image: "",
  });

  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });

  const handleInputChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value,
    });
    setReviewData({
      ...reviewData,
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

  const handleAddReview = async () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    try {
      // Make POST request to backend to insert game into database
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/review/${idGame}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(reviewData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Review aggiunta con successo");
        console.log(data);
        window.location.reload();
      } else {
        // Handle error
        throw new Error("Error occurred while adding the review");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const handleEditReview = async () => {
    try {
      const putResponse = await axios.put(
        `http://localhost:3202/review/${reviewIdToEdit}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (putResponse.status === 200) {
        console.log(
          `Recensione con ID ${reviewIdToEdit} modificata con successo`,
        );
        setShowForm(false);
        window.location.reload();
      } else {
        console.log(putResponse.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 204) {
        console.log(`Recensione con ID ${reviewId} eliminata con successo`);
        // Aggiorna la lista delle recensioni dopo l'eliminazione
        const updatedReviews = reviews.filter(
          (review) => review.idReview !== reviewId,
        );
        setReviews(updatedReviews);

        // Aggiorna le recensioni dell'utente corrente dopo l'eliminazione
        const updatedUserReviews = userReviews.filter(
          (review) => review.idReview !== reviewId,
        );
        setUserReviews(updatedUserReviews);
        setShowForm(true);
        window.location.reload();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserReviews = async (reviews) => {
    const userReviews = await Promise.all(
      reviews.map(async (review) => {
        try {
          // Verifica se la recensione esiste ancora
          const reviewResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/review/${review.idReview}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (reviewResponse.data) {
            // Se la recensione esiste ancora, esegui la richiesta GET per ottenere i dettagli dell'utente
            const userResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/user/${review.user.idUser}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            const user = userResponse.data;
            return { ...review, user };
          } else {
            // Se la recensione non esiste più, restituisci la recensione senza i dettagli dell'utente
            window.location.reload();
            return review;
          }
        } catch (error) {
          console.log(
            `Error fetchingg user details for review ID ${review.idReview}: ${error.message}`,
          );
          return review; // Return the review without user details in case of an error
        }
      }),
    );

    return userReviews;
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

    const getAllReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/review/game/${idGame}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const reviews = response.data.content;
        console.log(reviews);

        const userReviews = await fetchUserReviews(reviews);

        console.log(userReviews);
        setReviews(reviews);
        setUserReviews(
          userReviews.filter(
            (review) => review.user.idUser === userCurrent.idUser,
          ),
        );
        // Controlla se l'utente ha già pubblicato una recensione
        if (
          userReviews.some(
            (review) => review.user.idUser === userCurrent.idUser,
          )
        ) {
          setHasReviewed(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllReviews();
    fetchGameDetails();
  }, [idGame, token, dispatch, userCurrent]);
  return (
    <div className="bg-home">
      <Container fluid className=" p-5 justify-content-center ">
        <Row className="pt-2  text-link">
          <Col
            xs={12}
            md={7}
            className=" hero-container me-4 mb-4 bg-elements rounded-1"
          >
            <div className="d-flex justify-content-between pt-3 position-relative ">
              <>
                <h2>{game.name}</h2>
                <Image
                  width={100}
                  src={game.image}
                  className="img-game-details position-absolute me-2  rounded-1 hero-container"
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
            <h3 className="m-0">Comandi</h3>
            <div className="d-flex justify-content-between align-items-center pb-1">
              <span>{game.commands}</span>
              <span showAddToFav className="img-review fs-4">
                +💗
              </span>
            </div>
          </Col>
          <Col
            xs={12}
            md={4}
            className="hero-container d-none d-md-flex h-75 pb-3 mb-5 mb-md-0 px-4 bg-elements rounded-1 "
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
      </Container>
      <Container className="pb-5">
        <Row className="games-container position-relative mx-auto pb-3">
          <Col className="justify-content-center d-flex hero-container bg-elements text-link rounded-1 ">
            <Image
              className="position-absolute img-antenna"
              width={63}
              src={antenna}
            />
            {gameComponent}
          </Col>
        </Row>

        <Row className=" p-2 mt-5  rounded-1">
          <Col className="">
            {userReviews.map((review) => (
              <div
                key={review.idReview}
                className="mt-2 bg-elements hero-container mb-4 p-1 rounded-2 position-relative"
              >
                <span
                  onClick={() => {
                    setShowEditReviewModal(true);
                    setReviewIdToEdit(review.idReview);
                  }}
                  className="img-review position-absolute end-0 pe-5"
                >
                  ✏️
                </span>
                <span
                  onClick={() => {
                    setShowDeleteReviewModal(true);
                    setReviewIdToDelete(review.idReview);
                  }}
                  className="img-review position-absolute end-0 pe-2"
                >
                  🗑️
                </span>

                <div className="d-flex align-items-center gap-3">
                  <h6 className="m-0 green-text">{review.user.username}</h6>
                  <span className="orange-text">Rating: {review.rating}</span>
                </div>
                <p className=" text-link rounded-2 p-2">{review.comment}</p>
                {/* Aggiungi qui i bottoni per modificare o eliminare la recensione */}
              </div>
            ))}

            {reviews
              .filter((review) => review.user.idUser !== userCurrent.idUser)
              .map((review) => (
                <div
                  key={review.idReview}
                  className="hero-container bg-elements mb-4 p-1 rounded-2"
                >
                  <div className="d-flex align-items-center gap-3">
                    <h6 className="m-0 green-text">{review.user.username}</h6>
                    <span className="orange-text">Rating: {review.rating}</span>
                  </div>
                  <p className=" text-link rounded-2 p-2">{review.comment}</p>
                  {/* Aggiungi qui i bottoni per modificare o eliminare la recensione */}
                </div>
              ))}

            <hr className="divisori" />

            {!showForm && !hasReviewed && (
              <div className="bg-elements rounded-2  hero-container d-flex align-items-center justify-content-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-100 btn-vip rounded-2 py-2 px-3 d-block mx-auto "
                >
                  Aggiungi una recensione
                </button>
              </div>
            )}
            {showForm && (
              <Form
                onSubmit={handleAddReview}
                className="bg-elements hero-container rounded-2 p-2"
              >
                <Form.Group className="pb-3">
                  <Form.Label className="text-link">
                    Dai un voto al gioco: (1/5){" "}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-link">
                    Aggiungi una recensione:{" "}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <button
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                    className="mt-2 btn-vip rounded-3"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    variant="primary"
                    className="mt-2 btn-vip rounded-2"
                  >
                    Invia
                  </button>
                </div>
              </Form>
            )}
          </Col>
        </Row>

        <Col
          xs={12}
          md={4}
          className="hero-container d-md-none h-75 pb-3 my-5 mb-md-0 px-4 bg-elements rounded-1 text-link"
        >
          <h3 className="pt-3">Classifica mobile</h3>
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

      <Modal
        className=""
        show={showDeleteReviewModal}
        onHide={() => setShowDeleteReviewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vuoi eliminare veramente la tua recensione?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button onClick={() => setShowDeleteReviewModal(false)}>Back</button>
          <button
            type="submit"
            onClick={() => handleDeleteReview(reviewIdToDelete)}
          >
            Save and Delete
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        className=""
        show={showEditReviewModal}
        onHide={() => setShowEditReviewModal(false)}
      >
        <Form onSubmit={handleEditReview}>
          <Modal.Header closeButton>
            <Modal.Title>Vuoi modificare la tua recensione?</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={reviewData.rating}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Comment</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={reviewData.comment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </ModalBody>
          <Modal.Footer>
            <button onClick={() => setShowEditReviewModal(false)}>Back</button>
            <button
              type="submit"
              onClick={() => handleEditReview(reviewIdToEdit)}
            >
              Save and Update
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default GameDetails;
