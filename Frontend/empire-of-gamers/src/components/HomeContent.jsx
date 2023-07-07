import React, { useState } from "react";
import Game from "./Game";
import News from "./News";
import Hero from "./Hero";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import img from "../assets/imgs/logo-7.png";
import img1 from "../assets/imgs/img-bg.png";
import img2 from "../assets/imgs/img-game.png";
import img3 from "../assets/imgs/studio.png";
import img4 from "../assets/imgs/ladder.png";
import img5 from "../assets/imgs/news.png";
import Ranking from "./Ranking";
import star from "../assets/imgs/star.png";
import filtro from "../assets/imgs/filtro.png";

const HomeContent = () => {
  const [isSectionVisible, setSectionVisible] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarHover = (starIndex) => {
    setSelectedStars(starIndex);
  };

  const handleStarLeave = () => {
    setSelectedStars(0);
  };

  const toggleSection = () => {
    setSectionVisible(!isSectionVisible);
  };
  return (
    <Container fluid className=" pt-5  px-1 position-relative">
      {/* hero section */}
      <Row className="d-flex pb-3 pb-5 justify-content-center">
        <Col md={"12"} xxl={"8"} className="">
          <Image
            fluid
            className="img-hero position-absolute   "
            src={img3}
            alt="img"
            width={55}
          />
          <Hero />
        </Col>
      </Row>

      {/* componente dei filtri per tablet in su */}
      <Row className="d-none d-md-flex ">
        <Col md={"3"}></Col>
        <Col md={"5"} className="mb-1 position-relative">
          <Image
            className="img-filters-2 position-absolute  "
            src={img1}
            alt="img"
            width={120}
          />
          <div className="hero-container overflow-hidden bg-elements rounded-1 p-1 text-link d-flex align-items-center">
            <Row className="justify-content-start d-flex align-items-center">
              <Col xs="auto">
                <button
                  className="btn-filter rounded-2 px-3 py-0"
                  onClick={toggleSection}
                >
                  <Image fluid width={25} src={filtro} alt="img-filtro" />
                </button>
              </Col>
              {isSectionVisible && (
                <Col
                  xs="auto"
                  className="img-star-rates align-items-center d-flex p-0"
                >
                  <span className="pe-1">Find by ratings:</span>
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Image
                      key={starIndex}
                      src={star}
                      width={21}
                      className={`star ${
                        starIndex <= selectedStars ? "selected-star" : ""
                      }`}
                      onMouseEnter={() => handleStarHover(starIndex)}
                      onMouseLeave={handleStarLeave}
                    />
                  ))}
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>

      {/* Componente news del sito */}
      <Row className="game-container-size pb-5">
        <Col md={"3"} className="pb-5 pb-md-0 position-relative">
          <Image
            className="img-news position-absolute   "
            src={img5}
            alt="img"
            width={85}
          />
          <News />
        </Col>

        {/* componente dei filtri per mobile */}
        <Col className="ms-3 pb-md-0 d-md-none hero-container h-50 bg-elements rounded-1 text-link position-relative px-0">
          <Image
            className="img-filters position-absolute"
            src={img1}
            alt="img"
            width={85}
          />
          <div className="overflow-hidden rounded-1 pt-1 text-link">
            <Row className="justify-content-center">
              <Col xs="auto" className="px-4">
                <button
                  className="btn-filter rounded-4 px-1 py-1"
                  onClick={toggleSection}
                >
                  <Image fluid width={30} src={filtro} alt="img-filtro" />
                </button>
              </Col>
            </Row>
            {isSectionVisible && (
              <>
                <Row className="d-flex align-items-center justify-content-center mt-3">
                  <Col xs="auto" className="img-star-rates flex-grow-2">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <Image
                        key={starIndex}
                        src={star}
                        width={12}
                        className={`star ${
                          starIndex <= selectedStars ? "selected-star" : ""
                        }`}
                        onMouseEnter={() => handleStarHover(starIndex)}
                        onMouseLeave={handleStarLeave}
                      />
                    ))}
                  </Col>
                </Row>
              </>
            )}
            <hr className="pb-3 divisori " />
          </div>
        </Col>

        {/* Componente dei giochi del sito disponibili */}
        <Col xs={"9"} xxl={"6"} className="position-relative ">
          <Image fluid className="img-game  " src={img2} alt="img" width={70} />
          <Game />
        </Col>

        <Col className="d-none d-xxl-flex  rounded-1 p-2 text-link me-3 position-relative h-50">
          <Image
            className="img-ranking position-absolute  "
            src={img4}
            alt="img"
            width={80}
          />
          <Ranking />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeContent;
