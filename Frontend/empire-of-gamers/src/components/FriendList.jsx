import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import avatar from "../assets/imgs/avatar.png";
import { Link } from "react-router-dom";

const FriendList = () => {
  const onlineImg = <span className=" bg-transparent">🟢</span>;
  const offlineImg = <span className=" bg-transparent">🔴</span>;
  const friendList = [
    {
      id: 1,
      username: "username11111111111111111111111111111",
      isOnline: true,
    },
    {
      id: 2,
      username: "username2",
      isOnline: false,
    },
    {
      id: 3,
      username: "username3",
      isOnline: true,
    },
    {
      id: 4,
      username: "username4",
      isOnline: true,
    },
    // Aggiungi altri amici alla lista
  ];

  return (
    <div className="friend-list-container">
      {friendList.map((friend) => (
        <Row
          className="friend-list d-flex align-items-center px-1 py-3 bg-transparent"
          key={friend.id}
        >
          <Col xs={12} className="custom-dropdown">
            <Row className="align-items-center">
              <Col xs={2} className="p-0 py-2 ms-1">
                {" "}
                <Link to={"/profile/:id"} className="p-0 text-decoration-none">
                  <Image
                    fluid
                    className="profile-image rounded-circle ms-2"
                    src={avatar}
                    alt="profile-img"
                  />
                </Link>
              </Col>
              <Col className="bg-transparent pe-0 text-truncate custom-dropdown-friends">
                <span className="friend-content-element mb-2">
                  {friend.username.length > 11
                    ? friend.username.substring(0, 11) + "..."
                    : friend.username}
                </span>
              </Col>

              <Row className="px-0 bg-transparent">
                <Col className="bg-transparent d-flex justify-content-end px-0">
                  <span
                    className={`friend-status bg-transparent  ${
                      friend.isOnline ? "online" : "offline"
                    }`}
                  >
                    {friend.isOnline ? onlineImg : offlineImg}
                  </span>
                  <span className="friend-list-icon bg-transparent">🗑️</span>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default FriendList;
