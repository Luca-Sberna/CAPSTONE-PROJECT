import React from "react";
import { Container, Image } from "react-bootstrap";
import hero from "../assets/imgs/hero1.png";

const Hero = () => {
  return (
    <Container
      fluid
      className="hero-container overflow-hidden  bg-elements rounded-1 p-2 text-link "
    >
      <Image alt="hero-img" src={hero} width={250} className="" />
    </Container>
  );
};

export default Hero;
