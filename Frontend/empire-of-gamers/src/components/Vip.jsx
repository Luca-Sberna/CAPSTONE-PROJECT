import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setIsVip } from "../redux/slices/userSlice";

const Vip = () => {
  const [showModal, setShowModal] = useState(false);
  const [creditCardsExist, setCreditCardsExist] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const idUser = userCurrent.idUser;
  const navigate = useNavigate();

  useEffect(() => {
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
      <Container fluid className="pb-5 bg-home">
        <Row className="gap-4 pt-5 px-2 ps-md-4 pe-md-1">
          <Col
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
              <button
                onClick={setShowModal}
                className="btn-vip  rounded-3 fs-4"
              >
                Entra nell'impero!
              </button>
            </Col>
          </Col>
          <Col
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          Vuoi far parte anche tu dei Vip dell'Impero?
        </Modal.Header>
        <Modal.Body>
          Se non hai carte di credito associate sarai indirizzato nella sezione
          apposita
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-vip" onClick={handleBecomeVip}>
            Diventa Vip!
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Vip;
