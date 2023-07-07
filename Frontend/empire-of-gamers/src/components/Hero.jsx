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
      <h1>Empire of Gamers</h1>
      <p>Entra anche tu nell'impero dei giochi retro!</p>
      <p>Benvenuto nell'impero che premia i tuoi punti e abilità.</p>
    </Container>
  );
};

export default Hero;
