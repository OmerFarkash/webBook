import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({activeUser, setActiveUser}) => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <LeftBar activeUser={activeUser} setActiveUser={setActiveUser} />
      <Feed activeUser={activeUser} />
      <NavBar activeUser={activeUser} />
    </div>
  );
};

export default Home;
