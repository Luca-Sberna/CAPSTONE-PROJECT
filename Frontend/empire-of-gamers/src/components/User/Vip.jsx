import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setIsVip } from "../../redux/slices/userSlice";
import $ from "jquery";

const Vip = () => {
  const [showModal, setShowModal] = useState(false);
  const [isNotVip, setIsNotVip] = useState(false);
  const [creditCardsExist, setCreditCardsExist] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const idUser = userCurrent.idUser;
  const navigate = useNavigate();
  const isVip = useSelector((state) => state.user.isVip);
  const isVipIdUser = isVip && isVip.length > 0 ? isVip[0].user.idUser : null;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    $(".special-text-link").on("mouseenter", function () {
      var colors = getComputedStyle(document.documentElement)
        .getPropertyValue("--random-color")
        .split(", ");
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      $(this).css("color", randomColor);
    });

    $(".special-text-link").on("mouseleave", function () {
      $(this).css("color", ""); // Ripristina il colore originale
    });

    const fetchCreditCards = async () => {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        });
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/creditCards/user/${idUser}`,
          {
            headers: headers,
          },
        );
        const data = await response.json();
        const creditCardsExist = data.content.length > 0;
        setCreditCardsExist(creditCardsExist);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVipStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/vipUser/user/${idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 404) {
          setIsNotVip(true);
        } else {
          setIsNotVip(false);
          const data = await response.json();
          const isVip = data.content; // Verifica se la risposta contiene dati per determinare se l'utente è un VIP
          dispatch(setIsVip(isVip));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVipStatus();
    fetchCreditCards();
  }, []);

  const handleBecomeVip = async () => {
    if (creditCardsExist) {
      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        });
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/vipUser`,
          {
            method: "POST",
            headers: headers,
          },
        );
        const data = await response.json();
        const isVip = data;
        dispatch(setIsVip(isVip));
        navigate(`/`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate(`/profile-settings/${idUser}`);
    }
  };

  return (
    <>
      <Container fluid className="pb-5 bg-home-ranking">
        <Row className="gap-4 pt-5 px-2 ps-md-4 pe-md-1">
          <Col
            data-aos="zoom-in-up"
            xs={"12"}
            md={"7"}
            className="hero-container bg-elements h-75 p-2 rounded-1"
          >
            <h1 className="text-link pb-2">Empire Vip Premium</h1>
            <p className=" shadow-vip rounded-4 p-3 mx-3 text-link">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem
              sed sint odio inventore tenetur excepturi rem fugit quas quo
              reiciendis ad, ut ipsam error quos sapiente accusamus quaerat
              dicta! Fugit iusto ducimus ea deleniti omnis dolor, error fuga
              quis similique est amet unde iste aspernatur voluptates vitae at
              consequuntur ad magni voluptatibus maiores natus quidem quia!
              Laborum, iste officia. In, neque fugit! Esse accusantium
              distinctio dignissimos natus neque illum similique architecto et,
              eos
            </p>
            <h2 className="text-link py-2">
              Come effettuare una donazione per ottenere il Vip👑
            </h2>
            <p className=" shadow-vip rounded-4 p-3 mx-3 text-link">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem
              sed sint odio inventore tenetur excepturi rem fugit quas quo
              reiciendis ad, ut ipsam error quos sapiente accusamus quaerat
              dicta! Fugit iusto ducimus ea deleniti omnis dolor, error fuga
              quis similique est amet unde iste aspernatur voluptates vitae at
              consequuntur ad magni voluptatibus maiores natus quidem quia!
              Laborum, iste officia. In, neque fugit! Esse accusantium
              distinctio
            </p>
            <Col className="d-flex justify-content-center py-4">
              {isNotVip ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-vip  rounded-3 fs-4"
                >
                  Entra nell'impero!
                </button>
              ) : (
                <p className="text-link special-text-link">
                  Fai già parte dell'impero, oppure non sei loggato!
                </p>
              )}
            </Col>
          </Col>
          <Col
            data-aos="zoom-in-left"
            xs={"12"}
            md={"4"}
            className="hero-container  bg-elements mb-5 p-2 h-75 rounded-1"
          >
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

              <li>👑 Possibilità di diventare Admin</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Modal
        className="pt-5 confirm-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          Vuoi far parte anche tu dei Vip dell'Impero?
        </Modal.Header>
        <Modal.Body className="orange-text">
          Se non hai carte di credito associate sarai indirizzato nella sezione
          apposita
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-vip rounded-1 border-black"
            onClick={handleBecomeVip}
          >
            Diventa Vip!
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Vip;
