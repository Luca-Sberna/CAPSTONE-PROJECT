import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import comingSoon from "../../assets/imgs/coming-soon.png";

const News = () => {
  return (
    <Container className="news-container overflow-hidden bg-elements rounded-1 p-2 text-link">
      <h3>News</h3>
      <hr className="divisori position-relative" />
      <Image
        className=" position-absolute top-0 right-0"
        src={comingSoon}
        alt="img"
        width={170}
      />
      <Row className="custom-dropdown">
        <Col>
          <h5 className="bg-transparent title-news">Titolo notizia 1</h5>
          <p className="bg-transparent">Contenuto notizia 1</p>
        </Col>
      </Row>

      <Row className="custom-dropdown">
        <Col>
          <h5 className="bg-transparent title-news">Titolo notizia 2</h5>
          <p className="bg-transparent">Contenuto notizia 2</p>
        </Col>
      </Row>
      {/* Altre notizie */}
    </Container>
  );
};

export default News;
