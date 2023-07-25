import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { removeFriend, removeGameFav } from "../../redux/slices/userSlice";

const ProfileDetails = () => {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const [showModal, setShowModal] = useState(false);
  const [showDeleteFav, setShowDeleteFav] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { idGame } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userCurrentId = userCurrent.idUser;
  const isVip = useSelector((state) => state.user.isVip);
  const gamesFav = useSelector((state) => state.user.favGamesList);
  const isVipIdUser = isVip?.user?.idUser;
  const game = useSelector((state) => state.user.game);
  const gamesList = useSelector((state) => state.user.favGamesList); // Ottieni la lista di amici dallo state
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nationality: "",
    imgProfile: "",
    imgBackground: "",
  });
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const navigate = useNavigate();
  const handleModalInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userProfile/user/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const currentUserProfile = response.data.content[0];
        setUserProfile(currentUserProfile);
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUserProfile();
    }
  }, [dispatch, isLoggedIn, token, currentUserId]);

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    try {
      const putResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/userProfile/${userProfile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const putData = await putResponse.json();
      if (putResponse.ok) {
        navigate("/profile/:id");
        setShowModal(false);
        window.location.reload();
      } else {
        console.log(putData.error);
      }
    } catch (error) {
      console.log("Errore:", error);
      alert(
        "Si è verificato un errore durante la richiesta. Riprova più tardi.",
      );
    }
  };

  const handleRemoveGameFav = (idGame) => {
    dispatch(removeGameFav(idGame)); // Rimuovi il gioco dai preferiti utilizzando l'azione "removeGameFav"
    setShowDeleteFav(false);
  };

  return (
    <Container fluid className="bg-home-ranking px-0 py-5 ">
      <Container
        data-aos="zoom-in-down"
        className="rounded-1 hero-container rounded-5 px-5 pb-3   background-image position-relative"
      >
        <Image
          className="img-cover position-absolute rounded-5"
          src={userProfile.imgBackground}
          alt="img-bg"
        />
        {currentUserId === userCurrentId && (
          <button
            className="btn-modal position-absolute   bg-transparent rounded-pill "
            onClick={() => setShowModal(true)}
          >
            ✏️
          </button>
        )}
        <Row className="my-4 ">
          <Col
            md={3}
            lg={2}
            className="d-none d-md-flex  justify-content-center align-items-center position-relative background-img-profile  hero-container bg-elements rounded-5 me-4"
          >
            <Image
              alt="img-profile"
              src={userProfile.imgProfile}
              className="img-cover-2  position-absolute rounded-5 "
            />
          </Col>
          <Col
            xs={12}
            md={8}
            className=" hero-container bg-elements position-relative rounded-1 text-link"
          >
            <Image
              alt="img-profile"
              src={userProfile.imgProfile}
              width={60}
              height={60}
              className="img-cover-mobile position-absolute rounded-circle  d-md-none img-border"
              roundedCircle
            />
            <div className="d-flex justify-content-between align-items-center pt-2">
              <h2 className="m-0">{currentUser}</h2>
              {isVipIdUser && isVipIdUser === userCurrentId && <span>👑</span>}
            </div>
            <hr className="divisori" />
            <p>Name : {userProfile.name}</p>
            <p>Surname : {userProfile.surname}</p>
            <p>Nationality : {userProfile.nationality}</p>
            <div className="d-flex justify-content-end align-items-center">
              {currentUserId !== userCurrentId && (
                <button
                  variant="primary"
                  className="bg-transparent btn-vip rounded-1 fs-5 py-0 px-3 mb-3"
                >
                  ➕🫂
                </button>
              )}
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className=" hero-container bg-elements rounded-1 text-link">
            <h3>Informazioni</h3>
            <p>Ulteriori informazioni sull'utente</p>
          </Col>
        </Row>
      </Container>

      <Row
        data-aos="zoom-in-up"
        className="hero-container rounded-4 bg-elements text-link p-3 m-3  gap-5"
      >
        <h3>Favourite Games</h3>

        {gamesFav.length > 0 ? (
          gamesFav.map((game) => (
            <Col xs={6} md={4} lg={2} className="">
              <div className="game-card-fav position-relative">
                <img
                  width={130}
                  src={game.image} // Utilizza game.image invece di favGames.image
                  alt={game.name} // Utilizza game.name invece di favGames.name
                  className="game-img-fav"
                />
                <span
                  onClick={() => {
                    setShowDeleteFav(true);
                  }}
                  className="position-absolute img-review start-0 fs-4 bg-danger rounded-circle d-none"
                >
                  🗑️
                </span>
                <div className="game-title">{game.name}</div>
              </div>
            </Col>
          ))
        ) : (
          <p className="orange-text">
            Prova e aggiungi un gioco ai preferiti !
          </p>
        )}
      </Row>

      <Modal className="" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>
            {" "}
            Inserisci tutti i dati per aggiornare il tuo profilo!
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmit}>
          <Modal.Body className="modal-body">
            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label className="form-label orange-text">
                Profile Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgProfile}
                onChange={handleModalInputChange}
                type="text"
                className="form-control hero-container selected"
                name="imgProfile"
              />
            </Form.Group>

            <Form.Group controlId="formBackgroundImage" className="mb-3">
              <Form.Label className="form-label orange-text">
                Background Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgBackground}
                onChange={handleModalInputChange}
                type="text"
                className="form-control hero-container"
                name="imgBackground"
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="form-label orange-text">Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                type="text"
                className="form-control hero-container"
                onChange={handleModalInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurname" className="mb-3">
              <Form.Label className="form-label orange-text">
                Surname
              </Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.surname}
                name="surname"
                type="text"
                className="form-control hero-container"
              />
            </Form.Group>

            <Form.Group controlId="formNationality" className="mb-3">
              <Form.Label className="form-label orange-text">
                Nationality
              </Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.nationality}
                name="nationality"
                type="text"
                className="form-control hero-container"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <button
              className="btn-vip border-black"
              type="submit"
              variant="primary"
            >
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className=""
        show={showDeleteFav}
        onHide={() => setShowDeleteFav(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vuoi eliminare il gioco dai tuoi preferiti?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button onHide={() => setShowDeleteFav(false)}>Back</button>
          <button
            onClick={() => handleRemoveGameFav(game.idGame)}
            type="submit"
          >
            Save and Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileDetails;
