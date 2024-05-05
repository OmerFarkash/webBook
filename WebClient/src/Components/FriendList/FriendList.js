import "./friendList.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFriends } from "../../API/userApi";

const FriendList = ({ activeUser, user }) => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      async function fetchData() {
        return await fetchFriends(activeUser.token, user.username);
      }
      setFriendList(fetchData());
      if (friendList != null) {
        setIsLoading(false);
      }
    }, []);


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
        {!isLoading && friendList.map((user) => 
          <Friend user={user} />
        )}
      </div>
    </div>
  );
};

export default FriendList;
