import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Esegui la registrazione con i dati inseriti
    // Implementa qui la logica per gestire la registrazione
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Data di nascita:", dateOfBirth);
    console.log("Nome:", firstName);
    console.log("Cognome:", lastName);
    console.log("Nazionalità:", nationality);
    // Ripristina i campi di input
    setUsername("");
    setEmail("");
    setPassword("");
    setDateOfBirth("");
    setFirstName("");
    setLastName("");
    setNationality("");
  };

  return (
    <Container className="hero-container rounded-1 bg-elements p-2 mt-5">
      <Row className="justify-content-center text-link">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div>
            <h2>Registrazione</h2>
            <hr className="divisori" />

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Data di nascita:</Form.Label>
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formFirstName">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Cognome:</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Form.Group>

              <Form.Group controlId="formNationality">
                <Form.Label>Nazionalità:</Form.Label>
                <Form.Control
                  type="text"
                  value={nationality}
                  onChange={handleNationalityChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Registrati
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
