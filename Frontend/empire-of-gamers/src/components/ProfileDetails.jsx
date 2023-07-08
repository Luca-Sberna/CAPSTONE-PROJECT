import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProfileDetails = () => {
  return (
    <Container className="rounded-1 hero-container rounded-5 px-5 pb-4 mt-5 background-image position-relative">
      <Image
        className="img-cover position-absolute rounded-5"
        src="https://via.placeholder.com/500"
        alt="img-bg"
      />
      <Row className="my-4 ">
        <Col
          md={2}
          className="d-none d-md-flex justify-content-center align-items-center position-relative background-img-profile  hero-container bg-elements rounded-5 me-4"
        >
          <Image
            alt="img-profile"
            src="https://via.placeholder.com/150"
            className="img-cover-2 position-absolute rounded-5"
          />
        </Col>
        <Col
          xs={12}
          md={8}
          className=" hero-container bg-elements position-relative rounded-1 text-link"
        >
          <Image
            alt="img-profile"
            src="https://via.placeholder.com/150"
            width={60}
            height={60}
            className="img-cover-mobile position-absolute rounded-circle d-md-none img-border"
            roundedCircle
          />
          <h2>Nome Utente</h2>
          <p>Breve descrizione dell'utente</p>
          <Button variant="primary">Segui</Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className=" hero-container bg-elements rounded-1 text-link">
          <h3>Informazioni</h3>
          <p>Ulteriori informazioni sull'utente</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDetails;
