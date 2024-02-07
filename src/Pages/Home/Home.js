import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";


const Home = () => {

  return (
    <div className="Home">
      <NavBar />
      <LeftBar />
       <Feed /> 
    </div>
  );
};

export default Home;
