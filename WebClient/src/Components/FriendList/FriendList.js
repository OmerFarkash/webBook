import "./friendList.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchFriends, fetchUser } from "../../API/userApi";
import ProfileContext from "../../ProfileContext.js";

const FriendList = ({ activeUser }) => {
  const profileUser = useContext(ProfileContext);
  const user = profileUser.profileUser;
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState(user.friends);
  const [isLoading, setIsLoading] = useState(true);
  const { setProfileUser } = useContext(ProfileContext);

  useEffect(() => {
    if (
      activeUser.friends.includes(user.username) ||
      activeUser.username === user.username
    ) {
      async function fetchData() {
        const list = await fetchFriends(activeUser.token, user.username);
        setFriendList(JSON.parse(list));
      }
      fetchData();
      if (friendList.length > 0) {
        setIsLoading(false);
      }
    }
  }, [friendList.length, user.username]);

  const Friend = ({ username }) => {
    const [friend, setFriend] = useState({});
    useEffect(() => {
      async function fetchData() {
        let friend = await fetchUser(activeUser.token, username);
        setFriend(friend);
      }
      fetchData();
    }, [friendList.length]);

    const handleProfile = async () => {
      setProfileUser(friend);
      navigate("/User");
    };

    return (
      <div className="Friend">
        <div className="container">
          <img src={friend.profilePic} />
          <span className="name" onClick={handleProfile}>
            {friend.name}
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
