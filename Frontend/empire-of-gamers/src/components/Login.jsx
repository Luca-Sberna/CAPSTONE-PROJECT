import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Esegui l'accesso con l'email e la password inserite
    // Implementa qui la logica per verificare le credenziali e gestire l'accesso
    console.log("Email:", email);
    console.log("Password:", password);
    // Ripristina i campi di input
    setEmail("");
    setPassword("");
  };

  return (
    <Container className="hero-container rounded-1 bg-elements p-2 mt-5">
      <Row className=" justify-content-center text-link">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2>Login</h2>
          <hr className="divisori" />
          <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
