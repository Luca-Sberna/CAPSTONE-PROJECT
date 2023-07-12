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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setCurrentUserId,
  setCurrentUser,
  logout,
  setSelectedCard,
  setCreditCard,
} from "../redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router";
import { async } from "q";

const ProfileSettings = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const selectedCard = useSelector((state) => state.user.selectedCard);

  const currentUser = useSelector((state) => state.user.currentUser); //username
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const [formDataCard, setFormDataCard] = useState({
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
        dispatch(setCreditCard());
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
        `${process.env.REACT_APP_API_URL}/creditCards/user/${currentUserId}`, // Sostituisci con l'URL corretto dell'API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const dataGetAll = await response.json();
      if (response.ok) {
        setCreditCards(dataGetAll.content); // Salva le carte di credito nello stato
      } else {
        alert(dataGetAll.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeleteCreditCard = async (creditCardId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/creditCards/${creditCardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const dataDelete = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert(dataDelete.message);
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
  const handleConfirm = () => {
    setShowAlert(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      // esegui la richiesta PUT per aggiornare i dati dell'utente
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
        // se la richiesta PUT ha esito positivo, esegui le richieste GET per ottenere i dati aggiornati dell'utente e del profilo utente
        fetchCurrentUser();
        fetchCurrentUserProfile();
        handleLogout();
      } else {
        // gestisci l'errore della richiesta PUT qui
        console.log(putData.error);
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
    fetchAllCreditCards(currentUserId);
  }, [currentUserId]);

  return (
    <>
      <Container fluid className=" bg-home py-5 px-3 px-sm-4 px-md-5">
        <Row className="pb-5  ">
          <Col className="hero-container bg-elements rounded-1 text-link p-2 ">
            <h2>Profile Settings</h2>
            <hr className="divisori" />
            <Form onSubmit={(event) => event.preventDefault()} className="">
              <div className="px-3">
                <h3>Modifica i tuoi dati</h3>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    value={formData.username || currentUser}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    className="form-container mb-3"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    className="form-container "
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>Nuova password</Form.Label>
                  <Form.Control
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    className="form-container "
                    required
                  />
                </Form.Group>

                <Form.Group
                  aria-required
                  className="mb-3"
                  controlId="formNewBirthDate"
                >
                  <Form.Label>Nuova data di nascita</Form.Label>
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
                    Aggiungi una carta di credito
                  </h5>
                </Accordion.Header>{" "}
                <Accordion.Body className="accordion-body">
                  <Form onSubmit={fetchCreditCard}>
                    <Form.Group className="mb-3" controlId="formCardNumber">
                      <Form.Label>Numero della carta di credito</Form.Label>
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
                          <Form.Label>Data di scadenza</Form.Label>
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
                          <Form.Label>CVV</Form.Label>
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
                          <Form.Label>Nome</Form.Label>
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
                          <Form.Label>Cognome</Form.Label>
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
                    {creditCards.length > 0 &&
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
                                    dispatch(setSelectedCard());
                                    setShowModal(true);
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica la tua carta di credito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label>Numero della carta di credito</Form.Label>
              <Form.Control
                type="number"
                value={formDataCard.cardNumber}
                onChange={handleInputChange}
                required
                name="cardNumber"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formExpirationDate">
                  <Form.Label>Data di scadenza</Form.Label>
                  <Form.Control
                    type="date"
                    name="expirationDate"
                    value={formDataCard.expirationDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="number"
                    name="cvv"
                    value={formDataCard.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo nome"
                    name="name"
                    value={formDataCard.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo cognome"
                    name="surname"
                    value={formDataCard.surname}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button type="submit" variant="primary">
            Salva
          </Button>
          <Button
            variant="danger"
            onClick={() => fetchDeleteCreditCard(creditCards.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="" show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Vuoi modificare i dati sensibili del tuo profilo?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Dovrai effettuare di nuovo il login</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowModal(false)}>
            Back
          </button>
          <button type="submit" variant="primary" onClick={handleConfirm}>
            Save and Logout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileSettings;
