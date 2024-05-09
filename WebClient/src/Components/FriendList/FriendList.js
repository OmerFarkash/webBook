import "./friendList.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchFriends, fetchUser } from "../../API/userApi";
import ProfileContext from "../../ProfileContext";

const FriendList = ({ activeUser, user }) => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setProfileUser } = useContext(ProfileContext);

  useEffect(() => {
    async function fetchData() {
      const list = await fetchFriends(activeUser.token, user.username);
      setFriendList(list);
    }
    fetchData();
    if (friendList.length > 0) {
      setIsLoading(false);
    }
  }, []);

  const handleProfile = async ({ username }) => {
    const friend = await fetchUser(activeUser.token, username);
    setProfileUser(friend);
    navigate("/User");
  };

  const Friend = ({ username }) => {
    return (
      <div className="Friend">
        <div className="container">
          <img src={user.profilePic} />
          <span className="name" onClick={handleProfile({ username })}>
            {user.name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="FriendList">
      <div className="container">
        {!isLoading &&
          friendList.map((username) => <Friend username={username} />)}
      </div>
    </div>
  );
};

export default FriendList;
