import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIdUserProfile } from "../redux/slices/userSlice";
import axios from "axios";

const ProfileDetails = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const idUserProfile = useSelector((state) => state.user.idUserProfile);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nationality: "",
    imgProfile: "",
    imgBackground: "",
  });
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const navigate = useNavigate();
  const handleModalInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleModalCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/userProfile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setIsRequestSuccessful(true);
        navigate("/profile/:id");
        setShowCreateModal(false);
      } else {
        setIsRequestSuccessful(false);
        console.log(data.error);
      }
    } catch (error) {
      setIsRequestSuccessful(false);
      console.log("Errore:", error);
      alert(
        "Si è verificato un errore durante la richiesta. Riprova più tardi.",
      );
    }
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    try {
      const putResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/userProfile/${idUserProfile}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const putData = await putResponse.json();
      if (putResponse.ok) {
        navigate("/profile/:id");
        setShowModal(false);
      } else {
        console.log(putData.error);
      }
    } catch (error) {
      console.log("Errore:", error);
      alert(
        "Si è verificato un errore durante la richiesta. Riprova più tardi.",
      );
    }
  };

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userProfile/user/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const currentUserProfile = response.data.content[0];
        setUserProfile(currentUserProfile);
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUserProfile();
    }
  }, [dispatch, isLoggedIn, token, currentUserId]);

  return (
    <Container fluid className="bg-home px-0 py-5 ">
      <Container className="rounded-1 hero-container rounded-5 px-5 pb-3   background-image position-relative">
        <Image
          className="img-cover position-absolute rounded-5"
          src={userProfile.imgBackground}
          alt="img-bg"
        />
        {isRequestSuccessful && (
          <button
            className="btn-modal position-absolute   bg-transparent rounded-pill "
            onClick={() => setShowModal(true)}
          >
            ✏️
          </button>
        )}

        {!isRequestSuccessful && (
          <button
            className="btn-modal-2 position-absolute    rounded-pill "
            onClick={() => setShowCreateModal(true)}
          >
            ➕
          </button>
        )}

        <Row className="my-4 ">
          <Col
            md={3}
            lg={2}
            className="d-none d-md-flex  justify-content-center align-items-center position-relative background-img-profile  hero-container bg-elements rounded-5 me-4"
          >
            <Image
              alt="img-profile"
              src={userProfile.imgProfile}
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
              src={userProfile.imgProfile}
              width={60}
              height={60}
              className="img-cover-mobile position-absolute rounded-circle  d-md-none img-border"
              roundedCircle
            />
            <div className="d-flex justify-content-between align-items-center pt-2">
              <h2 className="m-0">{currentUser}</h2>
              <span>👑</span>
            </div>
            <hr className="divisori" />
            <p>Name : {userProfile.name}</p>
            <p>Surname : {userProfile.surname}</p>
            <p>Nationality : {userProfile.nationality}</p>
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

      <Col className="hero-container rounded-4 bg-elements text-link p-3 m-3 mx-4">
        <h3 className="mb-3">Favourite Games</h3>
        <Col xs={6} md={4} lg={3} className="">
          <div className="game-card pb-3">
            {" "}
            <Link to={"/game/:id"} className="p-0 text-decoration-none">
              <img
                width={100}
                src="https://via.placeholder.com/150"
                alt={"game-img"}
                className="game-img"
              />
              <div className="game-title">{"Game Name"}</div>
            </Link>
          </div>
        </Col>
      </Col>

      <Modal className="" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo profilo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmit}>
          <Modal.Body>
            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label className="form-label">
                Profile Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgProfile}
                onChange={handleModalInputChange}
                type="text"
                className="form-control"
                name="imgProfile"
              />
            </Form.Group>

            <Form.Group controlId="formBackgroundImage" className="mb-3">
              <Form.Label className="form-label">
                Background Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgBackground}
                onChange={handleModalInputChange}
                type="text"
                className="form-control"
                name="imgBackground"
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                type="text"
                className="form-control"
                onChange={handleModalInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurname" className="mb-3">
              <Form.Label className="form-label">Surname</Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.surname}
                name="surname"
                type="text"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formNationality" className="mb-3">
              <Form.Label className="form-label">Nationality</Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.nationality}
                name="nationality"
                type="text"
                className="form-control"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={() => setShowModal(false)}>
              Back
            </button>
            <button type="submit" variant="primary">
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        className=""
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crea il tuo profilo iniziale</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalCreateSubmit}>
          <Modal.Body>
            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label className="form-label">
                Profile Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgProfile}
                onChange={handleModalInputChange}
                type="text"
                className="form-control"
                name="imgProfile"
              />
            </Form.Group>

            <Form.Group controlId="formBackgroundImage" className="mb-3">
              <Form.Label className="form-label">
                Background Image (URL)
              </Form.Label>
              <Form.Control
                value={formData.imgBackground}
                onChange={handleModalInputChange}
                type="text"
                className="form-control"
                name="imgBackground"
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                type="text"
                className="form-control"
                onChange={handleModalInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurname" className="mb-3">
              <Form.Label className="form-label">Surname</Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.surname}
                name="surname"
                type="text"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="formNationality" className="mb-3">
              <Form.Label className="form-label">Nationality</Form.Label>
              <Form.Control
                onChange={handleModalInputChange}
                value={formData.nationality}
                name="nationality"
                type="text"
                className="form-control"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Back
            </button>
            <button type="submit" variant="primary">
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProfileDetails;
