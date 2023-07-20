import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import avatar from "../../assets/imgs/avatar.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFriend } from "../../redux/slices/userSlice";

const FriendList = () => {
  const onlineImg = <span className=" bg-transparent">🟢</span>;
  const offlineImg = <span className=" bg-transparent">🔴</span>;
  const friendList = useSelector((state) => state.user.friendsList);
  const onlineText = "green-text"; // Aggiungi il nome della classe per il testo online
  const offlineText = "orange-text"; // Aggiungi il nome della classe per il testo offline
  const dispatch = useDispatch();

  const handleRemoveFriend = (user) => {
    dispatch(removeFriend(user)); // Rimuovi l'utente dalla lista di amici utilizzando l'azione "removeFriend"
  };
  return (
    <div className="friend-list-container">
      {friendList &&
        friendList.map((friend) => (
          <Row
            className="friend-list d-flex align-items-center px-2 py-3 bg-transparent "
            key={friend.idUser}
          >
            <Col
              className={`${friend.isOnline ? onlineText : offlineText}`} // Applica la classe corretta in base allo stato online/offline
            >
              {friend.username}
            </Col>{" "}
            <Col className="bg-transparent d-flex justify-content-end px-0">
              <span
                className={`friend-status bg-transparent  ${
                  friend.isOnline ? "online" : "offline"
                }`}
              >
                {friend.isOnline ? onlineImg : offlineImg}
              </span>
              <span
                onClick={() => handleRemoveFriend(friend)}
                className="friend-list-icon bg-transparent"
              >
                🗑️
              </span>
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default FriendList;
