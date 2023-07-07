import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const News = () => {
  return (
    <Container className="news-container overflow-hidden bg-elements rounded-1 p-2 text-link">
      <h3>News</h3>
      <hr className="divisori" />
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
