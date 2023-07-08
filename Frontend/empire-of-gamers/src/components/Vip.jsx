import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Vip = () => {
  return (
    <Container fluid className="pb-5 bg-home h-100">
      <Row className="gap-4 pt-5 px-5">
        <Col className="hero-container bg-elements h-75 p-2 rounded-1">
          <h1 className="text-link pb-2">Empire Vip Premium</h1>
          <p className=" shadow-vip rounded-4 p-3 mx-3 text-link">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem
            sed sint odio inventore tenetur excepturi rem fugit quas quo
            reiciendis ad, ut ipsam error quos sapiente accusamus quaerat dicta!
            Fugit iusto ducimus ea deleniti omnis dolor, error fuga quis
            similique est amet unde iste aspernatur voluptates vitae at
            consequuntur ad magni voluptatibus maiores natus quidem quia!
            Laborum, iste officia. In, neque fugit! Esse accusantium distinctio
            dignissimos natus neque illum similique architecto et, eos
          </p>
          <h2 className="text-link py-2">
            Come effettuare una donazione per ottenere il Vip👑
          </h2>
          <p className=" shadow-vip rounded-4 p-3 mx-3 text-link">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem
            sed sint odio inventore tenetur excepturi rem fugit quas quo
            reiciendis ad, ut ipsam error quos sapiente accusamus quaerat dicta!
            Fugit iusto ducimus ea deleniti omnis dolor, error fuga quis
            similique est amet unde iste aspernatur voluptates vitae at
            consequuntur ad magni voluptatibus maiores natus quidem quia!
            Laborum, iste officia. In, neque fugit! Esse accusantium distinctio
          </p>
          <Col className="d-flex justify-content-center py-4">
            <button className="btn-vip  rounded-3 fs-4">Iscriviti!</button>
          </Col>
        </Col>
        <Col xs={"4"} className="hero-container bg-elements p-2 h-75 rounded-1">
          <h3 className="text-link pb-2">Vantaggi</h3>
          <ul className=" shadow-vip rounded-4 py-3 px-2 mx-2 list-unstyled text-link">
            <li>👑 Tempo illimitato per giocare </li>
            <hr className="divisori" />
            <li>👑 Avrai la possibilità di provare in anteprima le beta</li>
            <hr className="divisori" />

            <li>👑 ⬅️ Immagine di identificazione</li>
            <hr className="divisori" />

            <li>👑 Personalizzazione del profilo su richiesta</li>
            <hr className="divisori" />

            <li>👑 La possibilità di diventare Admin</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Vip;
