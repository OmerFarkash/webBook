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
          <span>
            <Home /> Home{" "}
          </span>
        </div>
        <div className="item">
          <Friends /> Friends
        </div>
        <Link to="/Login">
          <div className="item">Log out</div>
        </Link>
      </div>
    </div>
  );
};

export default LeftBar;
