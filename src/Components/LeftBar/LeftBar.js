import "./leftBar.css";
import { ReactComponent as Profile } from "./Icons/profile.svg";
import { ReactComponent as Home } from "./Icons/home.svg";
import { ReactComponent as Friends } from "./Icons/friends.svg";
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
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <div className="item">
          <Home /> Home
        </div>
        <Link style={{textDecoration: 'none'}} to="/">
          <div className="item">
            <span>Log out</span></div>
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;
