import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <Container
      fluid
      className="px-0 pt-2 align-items-center d-flex  justify-content-center pt-5"
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper hero-container rounded-5  text-center "
      >
        <SwiperSlide className="d-flex align-items-center justify-content-center ">
          <p>
            Ciao a tutti! Sono un appassionato di tecnologia e informatica da
            sempre.
            <br /> Ho sempre avuto una grande curiosità per il mondo digitale e
            per le infinite possibilità che la tecnologia offre. <br /> Dopo
            aver lavorato come cuoco per 6 anni, ho deciso di intraprendere una
            nuova strada e seguire la mia passione per la programmazione.
          </p>
        </SwiperSlide>
        <SwiperSlide className="d-flex align-items-center justify-content-center px-2">
          <p>
            Da allora, ho fatto il mio percorso di studi in{" "}
            <span className="special-text-link">Epicode</span> e mi sono
            dedicato anima e cuore al mondo dello sviluppo software. Sono
            orgoglioso di poter mostrare il mio primo progetto Full Stack!.
            <br />
            Amo esplorare nuove tecnologie e imparare sempre cose nuove. <br />{" "}
            La programmazione mi affascina perché mi permette di dare vita alle
            mie idee e di creare soluzioni innovative.
          </p>
        </SwiperSlide>
        <SwiperSlide className="d-flex align-items-center justify-content-center">
          {" "}
          <p>
            Nel corso del mio progetto ho utilizzato queste tecnologie :
            <ul className="list-unstyled pt-3">
              <li className="green-text">React</li>
              <li className="green-text">Redux & slice</li>
              <li className="green-text"> Bootstrap e React-Bootstrap</li>
              <li className="green-text">Java e Spring</li>
              <li className="green-text">
                Spring Data JPA & Spring Security Web
              </li>
              <li className="green-text">Bcrypt & Converter</li>
              <li className="green-text"> JSON Web Token (JWT)</li>
              <li className="green-text">PostgreSQL</li>
              <li className="green-text">Aos Scroll Animation</li>
              <li className="green-text">Swiper</li>
              <li className="green-text">ChessJs</li>
            </ul>
          </p>
        </SwiperSlide>
        <SwiperSlide className="d-flex align-items-center justify-content-center px-2">
          <p>
            Se volete contattarmi o collegarvi con me, siete i benvenuti! Ecco i
            miei contatti:
            <ul className="list-unstyled pt-3">
              <li className="text-primary">
                <Link
                  target="_blank"
                  to={
                    "https://www.linkedin.com/in/luca-sberna-full-stack-developer/"
                  }
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  className="orange-text"
                  href="mailto:sberna.luca.ibiza@gmail.com"
                >
                  Email
                </a>
              </li>
              <li>
                <Link
                  target="_blank"
                  className="text-black"
                  to={"https://github.com/Luca-Sberna"}
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </p>
        </SwiperSlide>
        <SwiperSlide className="d-flex align-items-center justify-content-center px-2">
          <p>
            Grazie per aver visitato il mio primo progetto Full Stack
            <br /> Spero che questa breve panoramica vi abbia dato un'idea di
            chi sono e di ciò in cui credo. <br />
            Non vedo l'ora di connettermi con altre persone appassionate di
            tecnologia,
            <br /> scambiarci conoscenze e di collaborare su progetti
            interessanti.
          </p>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default AboutUs;
