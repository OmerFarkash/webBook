import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from '../../UserContext.js';
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);
  // user has the user object - apply what you need from it
  console.log(user);
  return (
    <div className="Home">
      <NavBar {...user} />
      <LeftBar />
       <Feed {...user} /> 
    </div>
  );
};

export default Home;
