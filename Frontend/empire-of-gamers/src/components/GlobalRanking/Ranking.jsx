import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../Nav/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setRanking } from "../../redux/slices/userSlice";

const Ranking = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const ranking = useSelector((state) => state.user.ranking);

  useEffect(() => {
    const getAllScore = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ranking?page=0&size=10&sortBy=score`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const ranking = response.data.content;
        ranking.sort((a, b) => b.score - a.score);
        console.log(ranking);
        dispatch(setRanking(ranking));
      } catch (error) {
        console.log(error);
      }
    };

    getAllScore();
  }, []);

  return (
    <Container fluid className="px-xs-2 px-md-0 pt-5">
      <Container className="hero-container bg-elements  rounded-1 p-3 text-link ">
        <h3>Ranking</h3>
        <hr className="divisori" />
        <Row>
          <Col xs={3}>
            <h5>Pos.</h5>
          </Col>
          <Col xs={6}>
            <h5>User</h5>
          </Col>
          <Col xs={3}>
            <h5>Score</h5>
          </Col>
        </Row>
        {ranking &&
          ranking.map((score, index) => (
            <Row key={score.id}>
              <Col>{index + 1}</Col>{" "}
              {/* Mostra la posizione in base all'indice */}
              <Col xs={6}>{score.user?.username}</Col>
              <Col xs={3}>{score.score}</Col>
            </Row>
          ))}
      </Container>
    </Container>
  );
};

export default Ranking;
