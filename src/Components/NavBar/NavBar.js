import "./navBar.css";
import { ReactComponent as SearchIcon } from "./Icons/search.svg";

const NavBar = ({ profilePic, userName }) => {
  return (
    <div className="navBar">
      <div className="container">
        <div className="left">
          <span>Web Book.</span>
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="right">
          <div className="user">
            <img src={profilePic} alt="" />
            <span>{userName}User Name</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
