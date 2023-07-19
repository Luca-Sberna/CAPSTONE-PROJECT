import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Social = () => {
  const [searchText, setSearchText] = useState("");
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

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

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, token]);

  return (
    <Container fluid className="">
      <Row className="p-3">
        <Col className="hero-container bg-elements rounded-1">
          <h4 className="orange-text p-2 m-0">Utenti</h4>
          <ul className="list-unstyled ps-2">
            {users &&
              users.map((user) => (
                <li
                  key={user.idUser}
                  className="d-flex justify-content-between py-1"
                >
                  <Link
                    className="text-decoration-none text-friend"
                    to={`/profile/${user.idUser}`}
                  >
                    {user.username}
                  </Link>
                  <span className="btn-friend">➕🫂</span>
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
        </Col>
        <Col xs={"9"}></Col>
      </Row>
    </Container>
  );
};

export default Social;
