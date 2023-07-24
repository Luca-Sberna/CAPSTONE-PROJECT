import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Accordion,
  Card,
  Modal,
  Image,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setCurrentUserId,
  setCurrentUser,
  logout,
  setCreditCard,
  setCreditCardObj,
} from "../../redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router";

const ProfileSettings = () => {
  const userCurrent = useSelector((state) => state.user.userCurrent); //username
  const [creditCards, setCreditCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null); // Stato per l'ID della carta selezionata
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const creditCardObj = useSelector((state) => state.user.creditCardObj);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const [selectedCardIdToDelete, setSelectedCardIdToDelete] = useState(null);
  const birthDate = userCurrent.birthDate.substring(0, 10);
  const expirationDate = creditCardObj.expirationDate.substring(0, 10);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
  });

  const [formDataCard, setFormDataCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    name: "",
    surname: "",
  });

  const [formDataEditCard, setFormDataEditCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    name: "",
    surname: "",
  });

  const fetchCreditCard = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/creditCards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataCard),
        },
      );
      const data = await response.json();
      if (response.ok) {
        const cardId = data.id;
        setSelectedCardId(cardId);
        const creditCardObj = data;
        dispatch(setCreditCardObj(creditCardObj));
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCreditCards = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/creditCards/user/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const dataGetAll = await response.json();
      if (response.ok) {
        dispatch(setCreditCards(dataGetAll.content));
      } else {
        alert(dataGetAll.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormDataCard({
      ...formDataCard,
      [event.target.name]: event.target.value,
    });
    setFormDataEditCard({
      ...formDataEditCard,
      [event.target.name]: event.target.value,
    });
  };

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

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const currentUser = response.data.username;
      dispatch(setCurrentUser(currentUser));
      const currentUserId = response.data.idUser;
      dispatch(setCurrentUserId(currentUserId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = (event) => {
    setShowAlert(false);
    handleSubmit(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.birthDate) {
      // Mostra un messaggio di avviso o esegui altre azioni necessarie
      return (
        <>
          <Alert>Compila tutti i campi</Alert>
        </>
      );
    }
    try {
      const putResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${currentUserId}`,
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
        console.log("Utente aggiornato con successo");
        // Aggiorna le carte di credito se è stata selezionata una carta
        fetchCurrentUser();
        fetchCurrentUserProfile();
        handleLogout();
      } else {
        console.log(putData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCard = async (selectedCardIdToDelete) => {
    try {
      const putCreditCardResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/creditCards/${selectedCardIdToDelete}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataEditCard),
        },
      );
      const putCreditCardData = await putCreditCardResponse.json();
      if (putCreditCardResponse.ok) {
        setShowModal(false);
        window.location.reload();
        fetchAllCreditCards();
        console.log("Carta di credito aggiornata con successo");
      } else {
        console.log(putCreditCardData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleEditCard(cardId) {
    // Trova la carta di credito corrispondente all'ID
    const creditCard = creditCards.find((card) => card.id === cardId);
    setSelectedCardIdToDelete(cardId); // Set the selected card ID for deletion
    const creditCardObj = creditCard;
    dispatch(setCreditCardObj(creditCardObj));
    if (creditCard) {
      // Aggiorna lo stato del form con i dati della carta di credito
      setFormDataEditCard({
        editCardNumber: creditCard.cardNumber,
        editExpirationDate: creditCard.expirationDate,
        editCvv: creditCard.cvv,
        editName: creditCard.name,
        editSurname: creditCard.surname,
      });

      // Mostra il modale
      setShowModal(true);
    } else {
      // La carta di credito non è stata trovata, gestisci l'errore qui
      console.log("La carta di credito non esiste");
    }
  }

  const handleDelete = async (selectedCardIdToDelete) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/creditCards/${selectedCardIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        // Se la richiesta DELETE ha esito positivo, aggiorna lo stato delle carte di credito
        setCreditCards(
          creditCards.filter((card) => card.id !== selectedCardIdToDelete),
        );
        setShowDeleteModal(false);
        setShowModal(false);
      } else {
        // Gestisci l'errore della richiesta DELETE qui
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    fetchAllCreditCards();
  }, []);

  return (
    <>
      <Container fluid className=" bg-home-ranking py-5 px-3 px-sm-4 px-md-5">
        <Row data-aos="zoom-in-down" className="pb-5  ">
          <Col className="hero-container bg-elements rounded-1 text-link p-2 ">
            <h2>Profile Settings</h2>
            <hr className="divisori" />
            <Form onSubmit={(event) => event.preventDefault()} className="">
              <div className="px-3">
                <h3 className="green-text">Modifica i tuoi dati</h3>
                <h6>Reinserisci i tuoi dati per apportare le modifiche</h6>
                <h6>Anche se si vuole modificare un solo campo</h6>
                <Form.Group controlId="formName" className="my-3">
                  <Form.Label className="form-label green-text">
                    Username ({userCurrent.username})
                  </Form.Label>
                  <Form.Control
                    value={formData.username}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    placeholder={userCurrent.username}
                    className="form-container mb-3"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="green-text">
                    Email ({userCurrent.email})
                  </Form.Label>
                  <Form.Control
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={userCurrent.email}
                    name="email"
                    type="email"
                    className="form-container "
                    required
                  />
                </Form.Group>

                <Form.Group
                  aria-required
                  className="mb-3"
                  controlId="formNewBirthDate"
                >
                  <Form.Label className="green-text">
                    Data di nascita ({birthDate})
                  </Form.Label>
                  <Form.Control
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    name="birthDate"
                    type="date"
                    className="form-container "
                    required
                  />
                </Form.Group>

                <button
                  onClick={() => setShowAlert(true)}
                  type="submit"
                  className="btn-vip rounded-1 mt-2"
                >
                  Modifica dati
                </button>
              </div>
            </Form>
            <hr className="divisori" />
            <Accordion className="accordion my-2">
              <Accordion.Item eventKey="0" className=" bg-transparent">
                <Accordion.Header>
                  <h5 className="m-0 accordion-header ">
                    Aggiungi o visualizza la tua carta di credito
                  </h5>
                </Accordion.Header>{" "}
                <Accordion.Body className="accordion-body">
                  <Form onSubmit={fetchCreditCard}>
                    <Form.Group className="mb-3" controlId="formCardNumber">
                      <Form.Label className="green-text">
                        Numero della carta di credito
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="form-container"
                        required
                        value={formDataCard.cardNumber}
                        onChange={handleInputChange}
                        name="cardNumber"
                      />
                    </Form.Group>
                    <Row>
                      <Col xs={"12"} sm={"6"}>
                        <Form.Group
                          className="mb-3"
                          controlId="formExpirationDate"
                        >
                          <Form.Label className="green-text">
                            Data di scadenza
                          </Form.Label>
                          <Form.Control
                            type="date"
                            className="form-container"
                            value={formDataCard.expirationDate}
                            onChange={handleInputChange}
                            name="expirationDate"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formCVV">
                          <Form.Label className="green-text">CVV</Form.Label>
                          <Form.Control
                            type="number"
                            className="form-container"
                            value={formDataCard.cvv}
                            onChange={handleInputChange}
                            name="cvv"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={"12"} sm={"6"}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                          <Form.Label className="green-text">Nome</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-container"
                            value={formDataCard.name}
                            onChange={handleInputChange}
                            name="name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formLastName">
                          <Form.Label className="green-text">
                            Cognome
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="form-container"
                            value={formDataCard.surname}
                            onChange={handleInputChange}
                            name="surname"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <button type="submit" className="mt-3 btn-vip rounded-1">
                      Aggiungi carta di credito
                    </button>
                  </Form>

                  <hr className="divisori" />
                  <h4>Le tue carte di credito</h4>
                  <Row xs={1} md={2} className="g-4 py-4">
                    {creditCards &&
                      creditCards.length > 0 &&
                      creditCards.map((creditCard, index) => {
                        const expirationDate =
                          creditCard.expirationDate.substring(0, 10); // Estrarre solo l'anno, il mese e il giorno
                        return (
                          <Col
                            xs={"12"}
                            sm={"6"}
                            md={"6"}
                            lg={"4"}
                            xl={"3"}
                            key={index}
                            className=""
                          >
                            {creditCard && (
                              <Card className="position-relative form-container bg-card-container">
                                <button
                                  className="btn-modal position-absolute bg-transparent rounded-pill"
                                  onClick={() => {
                                    handleEditCard(creditCard.id);
                                  }}
                                >
                                  ✏️
                                </button>
                                <Card.Body className="card-body px-1">
                                  <Image fluid className="bg-card" />

                                  <Card.Title>
                                    {creditCard.cardNumber}
                                  </Card.Title>
                                  <Card.Text>
                                    Data di scadenza: {expirationDate}
                                  </Card.Text>
                                  <Card.Text>
                                    Nome del titolare: {creditCard.name}{" "}
                                    {creditCard.surname}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            )}
                          </Col>
                        );
                      })}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <Modal
        className="pt-5"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica la tua carta di credito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitCard}>
            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label className="orange-text">
                Numero della carta di credito
              </Form.Label>
              <Form.Control
                className="hero-container"
                type="number"
                value={formDataEditCard.cardNumber}
                placeholder={creditCardObj.cardNumber}
                onChange={handleInputChange}
                required
                name="cardNumber"
              />
            </Form.Group>
            <Row className="d-flex">
              <Col xs={"12"} sm={"6"} className="d-flex">
                <Form.Group className="mb-3" controlId="formExpirationDate">
                  <Form.Label className="orange-text">
                    Data di scadenza"
                  </Form.Label>
                  <Form.Label className="orange-text">
                    {expirationDate}"
                  </Form.Label>

                  <Form.Control
                    className="hero-container"
                    type="date"
                    name="expirationDate"
                    value={formDataEditCard.expirationDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formCVV">
                  <Form.Label className="orange-text">CVV</Form.Label>
                  <Form.Control
                    className="hero-container"
                    type="number"
                    name="cvv"
                    placeholder={creditCardObj.cvv}
                    value={formDataEditCard.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label className="orange-text">Nome</Form.Label>
                  <Form.Control
                    className="hero-container"
                    type="text"
                    name="name"
                    value={formDataEditCard.name}
                    placeholder={creditCardObj.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label className="orange-text">Cognome</Form.Label>
                  <Form.Control
                    className="hero-container"
                    type="text"
                    name="surname"
                    value={formDataEditCard.surname}
                    placeholder={creditCardObj.surname}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="btn-vip border-black rounded-1"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Annulla
          </button>
          <button
            className="btn-vip border-black rounded-1"
            type="submit"
            variant="primary"
            onClick={() => handleSubmitCard(selectedCardIdToDelete)}
          >
            Salva
          </button>

          <button
            className="btn-vip border-danger rounded-1"
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="pt-5 ps-1 confirm-modal"
        show={showAlert}
        onHide={() => setShowAlert(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Vuoi modificare i dati sensibili del tuo profilo?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Dovrai effettuare di nuovo il login</Modal.Body>
        <Modal.Footer>
          <button
            className="btn-vip border-black rounded-1"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Back
          </button>
          <button
            className="btn-vip border-black rounded-1"
            type="submit"
            variant="primary"
            onClick={handleConfirm}
          >
            Save and Logout
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="pt-5 ps-1 confirm-modal"
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Vuoi eliminare veramente la tua carta di credito?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            className="btn-vip border-black rounded-1"
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Back
          </button>
          <button
            className="btn-vip border-black rounded-1"
            type="submit"
            variant="primary"
            onClick={() => handleDelete(selectedCardIdToDelete)}
          >
            Save and Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileSettings;
