import React, { useState } from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";

const ProfileDetails = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container className="rounded-1 hero-container rounded-5 px-5 pb-3 mt-5  background-image position-relative">
        <Image
          className="img-cover position-absolute rounded-5"
          src="https://via.placeholder.com/500"
          alt="img-bg"
        />
        <button
          className="btn-modal position-absolute   bg-transparent rounded-pill "
          onClick={() => setShowModal(true)}
        >
          ✏️
        </button>
        <Row className="my-4 ">
          <Col
            md={3}
            lg={2}
            className="d-none d-md-flex  justify-content-center align-items-center position-relative background-img-profile  hero-container bg-elements rounded-5 me-4"
          >
            <Image
              alt="img-profile"
              src="https://via.placeholder.com/150"
              className="img-cover-2  position-absolute rounded-5 "
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
              className="img-cover-mobile position-absolute rounded-circle  d-md-none img-border"
              roundedCircle
            />
            <div className="d-flex justify-content-between align-items-center">
              <h2>Username</h2>
              <span>👑</span>
            </div>
            <hr className="divisori" />
            <p>Nome</p>
            <p>Cognome</p>
            <p>Nazionalità</p>
            <div className="d-flex justify-content-end align-items-center">
              <button
                variant="primary"
                className="bg-transparent btn-vip rounded-1 fs-5 py-0 px-3 mb-3"
              >
                ➕🫂
              </button>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col className=" hero-container bg-elements rounded-1 text-link">
            <h3>Informazioni</h3>
            <p>Ulteriori informazioni sull'utente</p>
          </Col>
        </Row>
      </Container>
      <Modal className="" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                Immagine del profilo
              </label>
              <input type="file" className="form-control" id="profileImage" />
            </div>
            <div className="mb-3">
              <label htmlFor="backgroundImage" className="form-label">
                Immagine di sfondo
              </label>
              <input
                type="file"
                className="form-control"
                id="backgroundImage"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Nome
              </label>
              <input type="text" className="form-control" id="firstName" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Cognome
              </label>
              <input type="text" className="form-control" id="lastName" />
            </div>
            <div className="mb-3">
              <label htmlFor="nationality" className="form-label">
                Nazionalità
              </label>
              <input type="text" className="form-control" id="nationality" />
            </div>
            <div className="mb-3">
              <label htmlFor="information" className="form-label">
                Informazioni
              </label>
              <textarea className="form-control" id="information"></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button type="submit" variant="primary">
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileDetails;
