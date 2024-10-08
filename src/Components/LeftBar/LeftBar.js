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

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="item">
          <Profile /> Profile
        </div>
        <div className="item">
          <Home /> Home
        </div>
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
        <Link style={{ textDecoration: "none" }} to="/">
          <div className="item">
            <Logout /> Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;
