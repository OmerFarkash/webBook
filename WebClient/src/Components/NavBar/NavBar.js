import "./navBar.css";
import { ReactComponent as SearchIcon } from "./Icons/search.svg";
import { useContext } from "react";
import UserContext from "../../UserContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const activeUser = useContext(UserContext);
  const user = activeUser.activeUser;
  const profilePic = user.profilePic;
  const name = user.name;

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
          {activeUser && (
            <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/User/${user.username}`,
              user: { user },
            }}
          >
            <div className="user">
              <img src={profilePic} alt="User Profile" />
              <p>{name}</p>
            </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
