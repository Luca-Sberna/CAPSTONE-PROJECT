import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { isLoggedIn, setToken } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
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
        dispatch(setToken(data.accessToken));
        dispatch(isLoggedIn(true));
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      data-aos="flip-up"
      className="hero-container rounded-1 bg-elements p-2 mt-5"
    >
      <Row className=" justify-content-center text-link">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2>Login</h2>
          <hr className="divisori" />
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formEmail">
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

            <Form.Group controlId="formPassword" className="py-3">
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

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn-vip rounded-1">
                Login
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
