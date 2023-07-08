import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Accordion,
  Card,
  Modal,
} from "react-bootstrap";

const ProfileSettings = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gestisci qui l'invio dei dati inseriti dall'utente
  };
  const creditCards = [
    {
      cardNumber: "**** **** **** 1234",
      expirationDate: "01/23",
      cardholderName: "Mario Rossi",
    },
    {
      cardNumber: "**** **** **** 5678",
      expirationDate: "02/24",
      cardholderName: "Mario Rossi",
    },
  ];
  return (
    <>
      <Container fluid className="mt-5">
        <Row className="pb-5 bg-home px-5">
          <Col className="hero-container bg-elements rounded-1 text-link p-2 ">
            <h2>Profile Settings</h2>
            <hr className="divisori" />
            <Form onSubmit={handleSubmit}>
              <h3>Modifica i tuoi dati</h3>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci la tua email"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Salva le modifiche
              </Button>
              <Form.Group className="mb-3" controlId="formOldPassword">
                <Form.Label>Vecchia password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci la tua vecchia password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Nuova password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci la tua nuova password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Conferma password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Conferma la tua password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Salva le modifiche
              </Button>
              <hr className="divisori" />
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Aggiungi una carta di credito
                  </Accordion.Header>{" "}
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="formCardNumber">
                      <Form.Label>Numero della carta di credito</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci il numero della tua carta di credito"
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="formExpirationDate"
                        >
                          <Form.Label>Data di scadenza</Form.Label>
                          <Form.Control type="text" placeholder="MM/AA" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formCVV">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Inserisci il CVV"
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
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="formLastName">
                          <Form.Label>Cognome</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Inserisci il tuo cognome"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Salva le modifiche
                    </Button>

                    <hr className="divisori" />
                    <h4>Le tue carte di credito</h4>
                    <Row xs={1} md={2} className="g-4">
                      {creditCards.map((creditCard, index) => (
                        <Col key={index}>
                          <Card className="shadow position-relative">
                            <button
                              className="btn-modal position-absolute   bg-transparent rounded-pill "
                              onClick={() => {
                                setShowModal(true);
                              }}
                            >
                              ✏️
                            </button>
                            <Card.Body>
                              <Card.Title>{creditCard.cardNumber}</Card.Title>
                              <Card.Text>
                                Data di scadenza: {creditCard.expirationDate}
                              </Card.Text>
                              <Card.Text>
                                Nome del titolare: {creditCard.cardholderName}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form>
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
                type="text"
                placeholder="Inserisci il numero della tua carta di credito"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formExpirationDate">
                  <Form.Label>Data di scadenza</Form.Label>
                  <Form.Control type="text" placeholder="MM/AA" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il CVV" />
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
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo cognome"
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileSettings;
