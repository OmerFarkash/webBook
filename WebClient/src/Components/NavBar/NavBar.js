import "./navBar.css";
import { ReactComponent as SearchIcon } from "./Icons/search.svg";

const NavBar = ({ activeUser }) => {
  const profilePic = activeUser?.profilePic;
  const name = activeUser?.name;

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
          {user && (
            <div className="user">
              <img src={profilePic} alt="User Profile" />
              <p>{name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
