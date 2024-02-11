import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from "../../UserContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  const protectedRoute = () => {
    // if (user === null) {
    //   navigate("/Login");
    // }
    return;
  };

  console.log(user);
  return (
    <div className="Home" onLoad={protectedRoute}>
      <NavBar user={user} />
      <LeftBar />
      <Feed user={user} />
    </div>
  );
};

export default Home;
