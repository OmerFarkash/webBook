import "./navBar.css";
import { ReactComponent as SearchIcon } from "./Icons/search.svg";

const NavBar = ({ profilePic, userName }) => {
  return (
    <div className="navBar">
      <div className="container">
        <div className="left">
          <p>WEB BOOK</p>
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="right">
          <div className="user">
            <img src={profilePic} alt="" />
            <p>{userName}User Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
