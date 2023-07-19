import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Social = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchText !== "") {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/username/${searchText}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const searchedUser = response.data.content;
          setSuggestedUsers(searchedUser);
        } else {
          setSuggestedUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchText, currentPage, token]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search users"
      />
      <ul>
        {suggestedUsers &&
          suggestedUsers.map((user) => (
            <li key={user.idUser}>{user.username}</li>
          ))}
      </ul>
    </div>
  );
};

export default Social;
