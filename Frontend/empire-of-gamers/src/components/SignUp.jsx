import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken } from "../redux/slices/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      // L'utente ha selezionato un file
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Il file è stato letto con successo
        const base64String = reader.result;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // L'utente ha modificato un campo di input normale
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
    <Container fluid className=" py-5">
      <Row className="justify-content-center text-link ">
        <Col xs={11} className="px-0">
          <div className="hero-container rounded-1 bg-elements px-3">
            <h2 className="pt-2">Registrazione</h2>

            <hr className="divisori" />

            <Form onSubmit={handleSignupSubmit}>
              <Row className="align-items-center">
                <Col xs={"6"}>
                  <Form.Group controlId="formUsername" className=" ">
                    <Form.Label className="green-text">Username:</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-container"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label className="green-text">Email:</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-container"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={"6"}>
                  <Form.Group controlId="formPassword" className="">
                    <Form.Label className="green-text">Password:</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-container"
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBirthDate"
                    className="text-link mt-3"
                  >
                    <Form.Label className="green-text">
                      Date of Birth:
                    </Form.Label>
                    <Form.Control
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="form-container"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center my-4 align-items-center ">
                <button type="submit" className="btn-vip rounded-1 ">
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
