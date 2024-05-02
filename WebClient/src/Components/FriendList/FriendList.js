import "./friendList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const FriendList = ({ user }) => {
  const [friendList, setFriendList] = useState([]);
  //   let list = fetchFriends(activeUser.token, activeUser.username);
  //   setFriendList(list);

  const history = useHistory();


  function handleClick({ user }) {
    history.push(`/User/${user.username}`, (user = { user }));
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
