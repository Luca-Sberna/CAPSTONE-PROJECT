import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Row, Col, Container } from "react-bootstrap";
import Friend from "./Friend";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <>
      <Container
        fluid
        className="p-0 bg-home d-flex flex-column min-vh-100 overflow-hidden"
      >
        <div fluid className="flex-grow-1 position-relative home-container">
          <HomeContent />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
