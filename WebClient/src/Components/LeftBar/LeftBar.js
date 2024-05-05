import "./leftBar.css";
import { ReactComponent as Profile } from "./Icons/profile.svg";
import { ReactComponent as Home } from "./Icons/home.svg";
import { ReactComponent as Friends } from "./Icons/friends.svg";
import { ReactComponent as Groups } from "./Icons/groups.svg";
import { ReactComponent as Memories } from "./Icons/memories.svg";
import { ReactComponent as Saved } from "./Icons/saved.svg";
import { ReactComponent as Videos } from "./Icons/videos.svg";
import { ReactComponent as Events } from "./Icons/events.svg";
import { ReactComponent as Messenger } from "./Icons/messenger.svg";
import { ReactComponent as Market } from "./Icons/marketPlace.svg";
import { ReactComponent as Games } from "./Icons/games.svg";
import { ReactComponent as Logout } from "./Icons/logOut.svg";
import { Link } from "react-router-dom";
import { defaultUser } from "../../API/userApi";
import { useContext } from "react";
import UserContext from "../../UserContext.js";
import { useNavigate } from "react-router-dom";


const LeftBar = () => {
  const activeUser = useContext(UserContext);
  const { setActiveUser } = useContext(UserContext);
  const user = activeUser.activeUser;
  const username = user.username;
  const navigate = useNavigate();

  
  const handleLogout = () => {
    setActiveUser(defaultUser);
    navigate('/');
  };

  return (
    <div className="leftBar">
      <div className="container">
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/User/${username}`,
            user: { user },
          }}
        >
          <div className="item">
            <Profile /> Profile
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/">
          <div className="item">
            <Home /> Home
          </div>
        </Link>
        <div className="item">
          <Friends /> Friends
        </div>
        <div className="item">
          <Groups /> Groups
        </div>
        <div className="item">
          <Memories /> Memories
        </div>
        <div className="item">
          <Saved /> Saved
        </div>
        <div className="item">
          <Videos /> Videos
        </div>
        <div className="item">
          <Events /> Events
        </div>
        <div className="item">
          <Market /> MarketPlace
        </div>
        <div className="item">
          <Messenger /> Messenger
        </div>
        <div className="item">
          <Games /> Games
        </div>
        <div className="item" onClick={handleLogout}>
          <Logout /> Logout
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
