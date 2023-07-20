import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriend,
  removeFriend,
  setUserSelected,
  setUsers,
} from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import $ from "jquery";

const Social = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const friendsList = useSelector((state) => state.user.friendsList); // Ottieni la lista di amici dallo state
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            size: 10,
          },
        },
      );

      const { content, totalPages } = response.data;
      dispatch(setUsers(content));
      setLastPage(totalPages - 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchUsers(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchUsers(currentPage - 1);
    }
  };

  const handleAddFriend = (friend) => {
    dispatch(addFriend(friend)); // Aggiungi l'utente alla lista di amici utilizzando l'azione "addFriend"
  };

  const handleRemoveFriend = (user) => {
    dispatch(removeFriend(user)); // Rimuovi l'utente dalla lista di amici utilizzando l'azione "removeFriend"
  };

  const handleUserSelected = (user) => {
    dispatch(setUserSelected(user)); // Imposta lo userSelected con l'utente cliccato
  };

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
    fetchUsers(currentPage);
  }, [currentPage, token]);

  return (
    <Container fluid className="">
      <Row className="p-3">
        <Col
          data-aos="flip-left"
          className="hero-container bg-elements rounded-1"
        >
          <h4 className="special-text-link p-2 m-0">Utenti</h4>
          {isLoggedIn ? (
            <>
              <ul className="list-unstyled ps-2">
                {users &&
                  users.map((user) => (
                    <li
                      key={user.idUser}
                      className="d-flex justify-content-between align-items-center py-1"
                    >
                      <Link
                        className="text-decoration-none text-friend"
                        onClick={() => handleUserSelected(user)}
                        to={`/profile-selected/${user.idUser}`}
                      >
                        {user.username}
                      </Link>
                      {Array.isArray(friendsList) &&
                      friendsList.some(
                        (friend) => friend.idUser === user.idUser,
                      ) ? (
                        <span
                          className="btn-friend"
                          onClick={() => handleRemoveFriend(user)}
                        >
                          ❌
                        </span>
                      ) : (
                        <span
                          className="btn-friend"
                          onClick={() => handleAddFriend(user)}
                        >
                          ➕🫂
                        </span>
                      )}
                    </li>
                  ))}
              </ul>

              <hr className="divisori m-0" />
              <div className="d-flex justify-content-between py-2">
                <button
                  className="btn-vip"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  Previous Page
                </button>
                <button
                  className="btn-vip"
                  onClick={handleNextPage}
                  disabled={currentPage === lastPage}
                >
                  Next Page
                </button>
              </div>
            </>
          ) : (
            <div className="text-center special-text-link">
              Loggati per visualizzare gli utenti
            </div>
          )}
        </Col>
        <Col xs={"9"}></Col>
      </Row>
    </Container>
  );
};

export default Social;
