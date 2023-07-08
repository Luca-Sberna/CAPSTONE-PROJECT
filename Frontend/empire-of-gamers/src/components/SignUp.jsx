import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
    name: "",
    surname: "",
    nationality: "",
    profileImage: "",
    backgroundImage: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="hero-container rounded-1 bg-elements p-2 mt-5">
      <Row className="justify-content-center text-link">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div>
            <h2>Registrazione</h2>
            <hr className="divisori" />

            <Form onSubmit={handleSignupSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBirthDate">
                <Form.Label>Data di nascita:</Form.Label>
                <Form.Control
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formSurname">
                <Form.Label>Cognome:</Form.Label>
                <Form.Control
                  name="surname"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formNationality">
                <Form.Label>Nazionalità:</Form.Label>
                <Form.Control
                  name="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formProfileImage">
                <Form.Label>Immagine del Profilo:</Form.Label>
                <Form.Control
                  name="profileImage"
                  type="file"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBackgroundImage">
                <Form.Label>Immagine di sfondo del Profilo:</Form.Label>
                <Form.Control
                  name="backgroundImage"
                  type="file"
                  value={formData.backgroundImage}
                  onChange={handleInputChange}
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
