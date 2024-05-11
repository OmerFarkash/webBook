import "./reqList.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as Accept } from "./Icons/check.svg";
import { ReactComponent as Reject } from "./Icons/x.svg";
import {
  acceptFriendReq,
  deleteFriendReq,
  fetchFriendReqs,
  fetchUser,
} from "../../API/userApi";
import UserContext from "../../UserContext";
import ProfileContext from "../../ProfileContext";

const ReqList = () => {
  const activeUser = useContext(UserContext);
  const { setActiveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reqList, setReqList] = useState([]);
  const { setProfileUser } = useContext(ProfileContext);

  useEffect(() => {
    async function fetchData() {
      let list = await fetchFriendReqs(activeUser.activeUser);
      setReqList(JSON.parse(list));
    }
    fetchData();

    if (reqList.length > 0) {
      setIsLoading(false);
    }
  }, [reqList.length]);

  const FriendReq = ({ username }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
      async function fetchData() {
        let reqUser = await fetchUser(activeUser.activeUser.token, username);
        setUser(reqUser);
      }
      fetchData();
    }, [reqList.length, activeUser.activeUser.friends]);

    const updateActiveUser = async () => {
      const updated = await fetchUser(
        activeUser.activeUser.token,
        activeUser.activeUser.username
      );
      setActiveUser({
        name: updated.name,
        username: updated.username,
        profilePic: updated.profilePic,
        token: updated.androidToken,
        friends: updated.friends,
        posts: updated.posts,
        friendRequestsSent: updated.friendRequestsSent,
      });
    }

    const acceptReq = async () => {
      await acceptFriendReq(activeUser.activeUser, username);
      updateActiveUser();
      alert("Friend added");
    };

    const rejectReq = async () => {
      await deleteFriendReq(activeUser.activeUser, username);
      updateActiveUser();
      alert("Request Deleted");
    };

    const handleProfile = async () => {
      setProfileUser(user);
      navigate("/User");
    };

    return (
      <div className="FriendReq">
        <div className="container">
          <div className="user" onClick={handleProfile}>
            <img src={user.profilePic} alt="" />
            <span className="name">{user.name}</span>
          </div>
          <div className="options">
            <button onClick={acceptReq}>
              <Accept />
            </button>
            <button onClick={rejectReq}>
              <Reject />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ReqList">
      <div className="container">
        {!isLoading &&
          reqList.map((username) => <FriendReq username={username} />)}
      </div>
    </div>
  );
};
export default ReqList;
