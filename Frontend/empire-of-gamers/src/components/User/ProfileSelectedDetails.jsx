import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setUserProfileSelected } from "../../redux/slices/userSlice";

const ProfileSelectedDetails = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Stato di accesso dell'utente
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { idUser } = useParams();
  const selectedUserProfile = useSelector(
    (state) => state.user.userProfileSelected,
  );
  const userSelected = useSelector((state) => state.user.userSelected);

  const isVip = useSelector((state) => state.user.isVip);
  const isVipIdUser = isVip[0]?.user?.idUser;
  const isVipExpirationDate = isVip.endDate;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/userProfile/user/${userSelected.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const selectedUserProfileData = response.data.content;
        dispatch(setUserProfileSelected(selectedUserProfileData));
        console.log(selectedUserProfileData);
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn && idUser) {
      fetchSelectedUserProfile();
    }
  }, [dispatch, isLoggedIn, token, idUser]);
  // Aggiungi una condizione di rendering condizionale
  if (!selectedUserProfile || !isVip) {
    return null;
  }
  return (
    <Container fluid className="bg-home px-0 py-5 ">
      <Container
        data-aos="zoom-in-down"
        className="rounded-1 hero-container rounded-5 px-5 pb-3   background-image position-relative"
      >
        <Image
          className="img-cover position-absolute rounded-5"
          src={selectedUserProfile.imgBackground}
          alt="img-bg"
        />

        <Row className="my-4 ">
          <Col
            md={3}
            lg={2}
            className="d-none d-md-flex  justify-content-center align-items-center position-relative background-img-profile  hero-container bg-elements rounded-5 me-4"
          >
            <Image
              alt="img-profile"
              src={selectedUserProfile.imgProfile}
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
              src={selectedUserProfile.imgProfile}
              width={60}
              height={60}
              className="img-cover-mobile position-absolute rounded-circle  d-md-none img-border"
              roundedCircle
            />
            <div className="d-flex justify-content-between align-items-center pt-2">
              <h2 className="m-0">{userSelected.username}</h2>
              {isVipIdUser && isVipIdUser === userSelected.idUser && (
                <span>👑</span>
              )}
            </div>
            <hr className="divisori" />
            <p>Name : {selectedUserProfile.name}</p>
            <p>Surname : {selectedUserProfile.surname}</p>
            <p>Nationality : {selectedUserProfile.nationality}</p>
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

      <Row
        data-aos="zoom-in-up"
        className="hero-container rounded-4 bg-elements text-link p-3 m-3  gap-5"
      >
        <h3>Favourite Games</h3>
        <Col xs={6} md={4} lg={2} className="">
          <div className="game-card-fav position-relative">
            <img
              width={130}
              src={""} // Utilizza game.image invece di favGames.image
              alt={""} // Utilizza game.name invece di favGames.name
              className="game-img-fav"
            />
            <span className="position-absolute img-review start-0 fs-4 bg-danger rounded-circle">
              🗑️
            </span>
            <div className="game-title">{""}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileSelectedDetails;
