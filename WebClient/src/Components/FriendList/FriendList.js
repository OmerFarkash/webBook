import "./friendList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchFriends } from "../../API/userApi";

const FriendList = ({ activeUser, user }) => {
  const navigate = useNavigate();

  const [friendList, setFriendList] = useState([]);
    let list = fetchFriends(activeUser.token, user.username);
    setFriendList(list);

  function handleClick({ user }) {
    navigate(`/User/${user.username}`, { user: user });
  }

  const Friend = ({ user }) => {
    return (
      <div className="Friend">
        <div className="container">
          <img src="{user.profilePic}" />
          <span className="name" onClick={handleClick({ user })}>
            user.name
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="FriendList">
      <div className="container">
        <Friend />
        <Friend />
        <Friend />
        {friendList.map((user) => (
          <Friend user={user} />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
