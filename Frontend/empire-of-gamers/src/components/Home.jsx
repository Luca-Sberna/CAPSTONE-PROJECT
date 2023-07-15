import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Row, Col, Container } from "react-bootstrap";
import Friend from "./Friend";
import HomeContent from "./HomeContent";
import { setIsVip } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.user.token);
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVipStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/vipUser/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        const isVip = data.content; // Verifica se la risposta contiene dati per determinare se l'utente è un VIP
        dispatch(setIsVip(isVip));
      } catch (error) {
        console.log(error);
      }
    };

    fetchVipStatus();
  }, [userId, token, dispatch]);

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
